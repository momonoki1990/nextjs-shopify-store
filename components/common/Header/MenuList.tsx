import React from "react"
import Link from "next/link";

type Props = {
  visibility: string
}

const MenuList: React.FC<Props> = ({ visibility }) => {
  return (
    <nav className={`md:text-center ${visibility}`}>
      <ul>
        <li className="border-t md:border-t-0 border-gray-200 md:inline-block">
          <Link href="/">
            <a
              className="block mx-auto px-8 md:px-4 py-4 text-gray-700 hover:text-opacity-70 hover:underline"
              style={{ maxWidth: "640px" }}
            >
              ホーム
            </a>
          </Link>
        </li>
        <li className="border-t md:border-t-0 border-gray-20 md:inline-block">
          <Link href="/collections/all">
            <a
              className="block mx-auto px-8 md:px-4 py-4 text-gray-700 hover:text-opacity-70 hover:underline"
              style={{ maxWidth: "640px" }}
            >
              カタログ
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MenuList;
