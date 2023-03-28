import React from "react";
import { TodoType } from "../App";
import CompleteIcon from "./CompleteIcon";
// dnd
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type Props = {
  todo: TodoType;
  todoList: TodoType[];
  setTodoList: React.Dispatch<React.SetStateAction<any>>;
};

const Todo = ({ todo, setTodoList, todoList }: Props) => {
  // dnd
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  // ----------

  const deleteTask = () => {
    setTodoList(todoList.filter((todos) => todos.id !== todo.id));
    localStorage.setItem(
      "todos",
      JSON.stringify(todoList.filter((todos) => todos.id !== todo.id))
    );
  };
  
  const completeTask = () => {
    setTodoList(
      todoList.map((td) =>
        td.id === todo.id ? { ...td, completed: !td.completed } : td
      )
    );
    localStorage.setItem(
      "todos",
      JSON.stringify(
        todoList.map((td) =>
          td.id === todo.id ? { ...td, completed: !td.completed } : td
        )
      )
    );
  };
  return (
    <div
      className="flex items-center justify-between bg-veryLightGray dark:bg-veryDarkDesaturatedBlue p-4 first:rounded-t-lg border-b-[2px] border-veryLightGrayishBlue dark:border-veryDarkGrayishBlue transition-all duration-500"
      style={style}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
    >
      <div className="relative z-10" onClick={completeTask}>
        <CompleteIcon isComplete={todo.completed} />
      </div>
      <p
        className={`flex-1 transition-all duration-500 ml-3 ${
          todo.completed
            ? "text-veryLightGrayishBlue dark:text-veryDarkGrayishBlue line-through decoration-lightGrayishBlue dark:decoration-darkGrayishBlue"
            : "text-veryDarkGrayishBlue dark:text-veryLightGray"
        } hover:cursor-pointer`}
      >
        {todo.task}
      </p>
      <div className="flex justify-end" onClick={deleteTask}>
        <div className="w-4 h-4 bg-[url('/icon-cross.svg')] bg-no-repeat bg-contain bg-center"></div>
      </div>
    </div>
  );
};

export default Todo;
