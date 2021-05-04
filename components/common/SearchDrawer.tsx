import React from "react";
import { Button, Drawer } from "@material-ui/core";

const SearchDrawer = () => {
  const [state, setState] = React.useState({ isOpened: false });

  const toggleDrawer = (isOpened: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ isOpened: isOpened });
  };

  const searchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const closeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <>
      <button
        className="search__icon focus:outline-none focus:ring focus:border-red-600 inline-block p-2 text-gray-700"
        onClick={toggleDrawer(true)}
      >
        {searchIcon}
      </button>
      <Drawer
        className="search__drawer"
        anchor="top"
        open={state["isOpened"]}
        onClose={toggleDrawer(false)}
      >
        <div className="search__container container flex justify-center items-center py-4 text-center">
          <div className="search__wrapper flex-grow max-w-screen-md relative">
            <input
              className="inline-block border border-gray-300 pl-4 pr-18 py-2 rounded-sm w-full"
              type="text"
              placeholder="検索する"
              autoFocus
            />
            <span className="inline-block absolute top-1/2 right-3 transform -translate-y-1/2">
              {searchIcon}
            </span>
          </div>
          <button
            className="drawer__close inline-block p-2"
            onClick={toggleDrawer(false)}
          >
            {closeIcon}
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
