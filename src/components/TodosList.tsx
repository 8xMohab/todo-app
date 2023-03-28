import React, { useState } from "react";
import { TodoType } from "../App";
import Controls from "./Controls";
import Todo from "./Todo";
// dnd
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  closestCorners,
  useSensor,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
type Props = {
  todoList: Array<TodoType>;
  setTodoList: React.Dispatch<React.SetStateAction<any>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const TodosList = ({ todoList, setTodoList, filter, setFilter }: Props) => {
  let filteredList: TodoType[] = [];
  const activeList: TodoType[] = todoList.filter(
    (todo) => todo.completed === false
  );
  switch (filter) {
    case "active":
      filteredList = activeList;
      break;
    case "completed":
      filteredList = todoList.filter((todo) => todo.completed === true);
      break;
    default:
      filteredList = todoList;
      break;
  }
  const clearComplete = () => {
    setTodoList(todoList.filter((td) => td.completed === false));
    localStorage.setItem(
      "todos",
      JSON.stringify(todoList.filter((td) => td.completed === false))
    );
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeIndex = todoList.findIndex((td) => td.id === active.id);
      const overIndex = todoList.findIndex((td) => td.id === over?.id);
      setTodoList(arrayMove(todoList, activeIndex, overIndex));
      localStorage.setItem(
        "todos",
        JSON.stringify(arrayMove(todoList, activeIndex, overIndex))
      );
    }
  };
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 0.5,
      tolerance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  return (
    <div className="light-shadow dark:dark-shadow">
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className="rounded-t-lg">
          <SortableContext
            items={filteredList}
            strategy={verticalListSortingStrategy}
          >
            {filteredList.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                setTodoList={setTodoList}
                todoList={todoList}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
      <div
        className={`flex items-center justify-between bg-veryLightGray dark:bg-veryDarkDesaturatedBlue p-4 transition-all duration-500 rounded-b-lg mb-4 ${
          filteredList.length === 0 ? "rounded-t-lg" : ""
        }`}
      >
        <p className="text-darkGrayishBlue dark:text-darkGrayishBlue">
          {activeList.length} items left
        </p>
        <div className="hidden lg:block">
          <Controls filter={filter} setFilter={setFilter} />
        </div>
        <p
          onClick={clearComplete}
          className="text-darkGrayishBlue lg:hover:text-veryDarkGrayishBlue dark:text-darkGrayishBlue cursor-pointer lg:dark:hover:text-lightGrayishBlueHover"
        >
          Clear Completed
        </p>
      </div>
    </div>
  );
};

export default TodosList;
