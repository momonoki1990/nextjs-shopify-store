import React from "react";

type Props = {
  visibility: string;
};

const MenuList: React.FC<Props> = ({ visibility }) => {
  return (
    <nav className={`md:text-center ${visibility}`}>
      <ul>
        <li className="border-t md:border-t-0 border-gray-200 md:inline-block">
          <a
            href="/"
            className="block mx-auto px-8 md:px-4 py-4 text-gray-700 hover:text-opacity-70 hover:underline"
            style={{ maxWidth: "640px" }}
          >
            Home
          </a>
        </li>
        {["all", "apple", "watch"].map((title, idx) => (
          <li
            className="border-t md:border-t-0 border-gray-20 md:inline-block"
            key={idx}
          >
            <a
              href={`/collections/${title}`}
              className="block mx-auto px-8 md:px-4 py-4 text-gray-700 hover:text-opacity-70 hover:underline"
              style={{ maxWidth: "640px" }}
            >
              {title[0].toUpperCase() + title.slice(1)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuList;
