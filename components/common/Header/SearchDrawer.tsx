import React, { useRef } from "react";
import { Drawer } from "@material-ui/core";
import { searchIcon, closeIcon } from "components/utils/Icon";

const SearchDrawer = () => {
  const [isOpened, setIsOpened] = React.useState(false);
  const formEl = useRef<HTMLFormElement | null>(null);

  const toggleDrawer =
    (isOpened: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpened(isOpened);
    };

  const onClickHandler = (event) => {
    event.preventDefault();
    const form = formEl.current;
    const formData = new FormData(form);
    const text = formData.get("q");
    form.action = `/search?${text}`;
    form.submit();
  };

  return (
    <>
      <button
        className="search__icon  inline-block p-2 rounded-sm text-gray-700"
        onClick={toggleDrawer(true)}
      >
        {searchIcon}
      </button>
      <Drawer
        className="search__drawer"
        anchor="top"
        open={isOpened}
        onClose={toggleDrawer(false)}
      >
        <div className="search__container container flex justify-center items-center py-4 text-center">
          <div className="search__wrapper flex-grow max-w-screen-md relative">
            <form action="/search" method="get" ref={formEl}>
              <input
                className="inline-block border border-gray-300 pl-4 pr-18 py-2 rounded-sm w-full"
                type="text"
                placeholder="検索する"
                autoFocus
                name="q"
              />
              <button
                className="inline-block absolute p-2 top-1/2 right-0 transform -translate-y-1/2"
                onClick={onClickHandler}
              >
                {searchIcon}
              </button>
            </form>
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
