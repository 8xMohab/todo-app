import React, { useEffect, useState } from "react";
import CompleteIcon from "./CompleteIcon";
import { TodoType } from "../App";
import { nanoid } from "nanoid";
type Props = {
  todoList: Array<TodoType>;
  setTodoList: React.Dispatch<React.SetStateAction<any>>;
};

const Form = ({ todoList, setTodoList }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [todo, setTodo] = useState<TodoType>({
    task: "",
    completed: false,
    id: "",
  });

  // handling the sumbition
  const submitHandle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (todo.task && !todoList.find((item) => item.task === todo.task)) {
      setTodoList([...todoList, todo]);
      localStorage.setItem("todos", JSON.stringify([...todoList, todo]));
      setTodo({ ...todo, task: "" });
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 500);
  };
  
  return (
    <div className="w-full dark:bg-veryDarkDesaturatedBlue bg-veryLightGray rounded-lg transition-all duration-500 mb-4">
      <form
        className="flex w-full p-4 justify-center text-center"
        onSubmit={submitHandle}
      >
        <button type="submit" className="mr-4">
          <div
            className={`${
              submitted ? "bg-gradient-to-br" : ""
            } from-checkBackground to-checkBackgroundTo w-6 h-6 flex items-center justify-center rounded-full relative`}
          >
            <img
              className={`${submitted ? "" : "hidden"}`}
              src="./icon-check.svg"
              alt="check"
            />
            <div
              className={`w-full h-full ring-inset ring-veryLightGrayishBlue dark:ring-veryDarkGrayishBlue ring-1 absolute rounded-full dark:bg-veryDarkDesaturatedBlue bg-veryLightGray ${
                submitted ? "opacity-0" : ""
              } transition-all duration-500`}
            ></div>
          </div>
        </button>
        <input
          value={todo.task}
          onChange={(e) =>
            setTodo({ ...todo, task: e.target.value, id: nanoid() })
          }
          type="text"
          className="flex-1 bg-transparent outline-none placeholder:text-darkGrayishBlue text-veryDarkGrayishBlue dark:text-veryLightGray caret-brightBlue transition-all duration-500"
          placeholder="Create a new todo..."
        />
      </form>
    </div>
  );
};

export default Form;
