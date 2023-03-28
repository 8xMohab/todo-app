import React from "react";

type Props = {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const Controls = ({ filter, setFilter }: Props) => {
  return (
    <div className="flex items-center justify-center">
      {["all", "active", "completed"].map((item) => (
        <p
          key={item}
          className={`${
            filter === item ? "text-brightBlue" : "text-darkGrayishBlue"
          } lg:hover:text-veryDarkGrayishBlue mr-4 capitalize last:mr-0 font-bold cursor-pointer lg:dark:hover:text-lightGrayishBlueHover`}
          onClick={() => {
            setFilter(item);
          }}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default Controls;
