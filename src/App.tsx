import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import Form from "./components/Form";
import TodosList from "./components/TodosList";
export type TodoType = {
  task: string;
  id: string;
  completed: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<Array<TodoType>>([]);
  const [theme, setTheme] = useState("");
    const [filter, setFilter] = useState("all");

  // setting the theme based on system prefers
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // get todoList from local storage when app renders
  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos !== null) {
      setTodoList([...JSON.parse(localTodos)]);
    }
  }, []);
  
  return (
    <div
      className={`App h-screen flex relative flex-col ${
        theme === "dark" ? "dark" : ""
      } relative`}
    >
      <div className="h-1/3 bg-[url('/bg-mobile-light.jpg')] lg:bg-[url('/bg-desktop-light.jpg')] bg-no-repeat bg-cover dark:bg-[url('/bg-mobile-dark.jpg')] dark:lg:bg-[url('/bg-desktop-dark.jpg')] transition-all duration-500"></div>
      {/* app */}
      <div className="absolute left-1/2 top-[7%] -translate-x-1/2 w-full container">
        {/* nav bar */}
        <div className="flex justify-between mb-10">
          <h1 className="text-veryLightGray text-4xl font-bold tracking-[1rem] uppercase">
            todo
          </h1>
          <div
            className="w-6 h-6 bg-[url('/icon-moon.svg')] dark:bg-[url('/icon-sun.svg')] bg-no-repeat bg-contain bg-center  transition-all duration-500 hover:cursor-pointer"
            onClick={() => {
              if (theme === "light") {
                setTheme("dark");
                localStorage.setItem("theme", "dark");
              } else {
                setTheme("light");
                localStorage.setItem("theme", "light");
              }
            }}
          ></div>
        </div>

        <Form todoList={todoList} setTodoList={setTodoList} />
        <TodosList
          filter={filter}
          setFilter={setFilter}
          setTodoList={setTodoList}
          todoList={todoList}
        />
        <div className="flex w-full justify-center items-center p-4 rounded-lg bg-veryLightGray dark:bg-veryDarkDesaturatedBlue transition-all duration-500 lg:hidden light-shadow dark:dark-shadow">
          <Controls filter={filter} setFilter={setFilter} />
        </div>
        <p className="w-full text-center text-darkGrayishBlue my-20">
          Drag and drop to reorder list
        </p>
      </div>
      <div className="flex-1 bg-veryLightGrayishBlue dark:bg-veryDarkBlue transition-all duration-500"></div>
    </div>
  );
}

export default App;
