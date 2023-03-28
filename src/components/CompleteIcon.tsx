import React, { useState } from "react";
type Props = {
  isComplete: boolean;
};

const CompleteIcon = ({ isComplete }: Props) => {
  const [complete, setComplete] = useState(false);
  return (
    <div
      className={`${
        isComplete ? "bg-gradient-to-br" : ""
      } from-checkBackground to-checkBackgroundTo w-6 h-6 flex items-center justify-center rounded-full relative`}
    >
      <img
        className={`${isComplete ? "" : "hidden"}`}
        src="./icon-check.svg"
        alt="check"
      />
      <div
        className={`w-full h-full ring-inset ring-veryLightGrayishBlue dark:ring-veryDarkGrayishBlue ring-1 absolute rounded-full dark:bg-veryDarkDesaturatedBlue bg-veryLightGray ${
          isComplete ? "opacity-0" : ""
        } transition-all duration-500`}
      ></div>
    </div>
  );
};

export default CompleteIcon;
