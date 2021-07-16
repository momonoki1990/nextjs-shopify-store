import React from "react";

type Props = {
  visibility: string;
};

const MenuList: React.FC<Props> = ({ visibility }) => {
  return (
    <nav className={`md:text-center ${visibility}`}>
      <ul>
        <li className="border-t md:border-t-0 border-gray-200 md:inline-block">
          <a href="/">
            <a
              className="block mx-auto px-8 md:px-4 py-4 text-gray-700 hover:text-opacity-70 hover:underline"
              style={{ maxWidth: "640px" }}
            >
              Home
            </a>
          </a>
        </li>
        {["all", "apple", "watch"].map((title) => (
          <li className="border-t md:border-t-0 border-gray-20 md:inline-block">
            <a href={`/collections/${title}`}>
              <a
                className="block mx-auto px-8 md:px-4 py-4 text-gray-700 hover:text-opacity-70 hover:underline"
                style={{ maxWidth: "640px" }}
              >
                {title[0].toUpperCase() + title.slice(1)}
              </a>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuList;
