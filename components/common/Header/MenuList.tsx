import React from "react";
import Link from "next/link";

type Props = {
  visibility: string;
};

const MenuList: React.FC<Props> = ({ visibility }) => {
  return (
    <nav className={`md:text-center ${visibility}`}>
      <ul>
        <li className="border-t border-gray-200 md:border-t-0 md:inline-block">
          <Link href="/" passHref>
            <a
              className="mx-auto py-4 px-8 text-gray-700 block md:px-4 hover:text-opacity-70 hover:underline"
              style={{ maxWidth: "640px" }}
            >
              All
            </a>
          </Link>
        </li>
        {["apple", "watch"].map((title, idx) => (
          <li
            className="border-t border-gray-20 md:border-t-0 md:inline-block"
            key={idx}
          >
            <Link href={`/collections/${title}`} passHref>
              <a
                className="mx-auto py-4 px-8 text-gray-700 block md:px-4 hover:text-opacity-70 hover:underline"
                style={{ maxWidth: "640px" }}
              >
                {title[0].toUpperCase() + title.slice(1)}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuList;
