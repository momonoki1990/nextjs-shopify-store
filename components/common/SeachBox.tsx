import React, { useRef } from "react";
import { searchIcon } from "components/utils/Icon";

export const SearchBox: React.FC = () => {
  const formEl = useRef<HTMLFormElement | null>(null);

  const onClickHandler = (event) => {
    event.preventDefault();
    const form = formEl.current;
    const formData = new FormData(form);
    const text = formData.get("q");
    form.action = `/search?${text}`;
    form.submit();
  };

  return (
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
  );
};
