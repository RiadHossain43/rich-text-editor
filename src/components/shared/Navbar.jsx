import React from "react";
export const Navbar = ({ darkTheme, setDarkTheme }) => {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 dark:text-gray-200 p-5 flex flex-wrap sm:justify-between justify-center items-center border-b dark:border-gray-700 border-gray-200">
      <div className="flex justify-between items-center space-x-5 w-screen">
        <p className="cursor-pointer text-md  font-bold text-blue-400 py-1 px-2 rounded dark:text-gray-200">
          Rich text editor
        </p>
        <button
          type="button"
          onClick={() => setDarkTheme(!darkTheme)}
          className="text-md rounded-full px-2 py-1 hover:shadow-lg text-sm dark:text-gray-200"
        >
          {darkTheme ? "dark" : "light"}
        </button>
      </div>
    </div>
  );
};
