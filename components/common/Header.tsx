import React from "react";
import Link from "next/link";
import { Collapse } from "@material-ui/core";
import SearchDrawer from "components/common/SearchDrawer";
import { bagIcon, menuIcon } from "components/common/Icon";

const Header: React.FC = () => {
  const [opened, setOpened] = React.useState(false);

  const toggleAccordion = () => {
    setOpened((prev) => !prev);
  };

  return (
    <header className="header border-b border-gray-200">
      <div className="header__inner container items-center flex justify-between md:grid md:grid-cols-3 xl:max-w-none xl:px-14">
        <div className="header__logo text-left mt-3 md:mt-6 mb-3 md:mb-6 ">
          <Link href="/">
            <a className="font-semibold text-lg md:text-xl text-gray-800 hover:text-opacity-70 tracking-widest">
              SAMPLE-KUMA-STORE1
            </a>
          </Link>
        </div>

        <nav className="header__links hidden md:block text-center">
          <ul>
            <li className="inline-block px-4">
              <Link href="/">
                <a className="text-gray-700 hover:text-opacity-70 hover:underline">
                  ホーム
                </a>
              </Link>
            </li>
            <li className="inline-block">
              <Link href="/collections/all">
                <a className="text-gray-700 hover:text-opacity-70 hover:underline">
                  カタログ
                </a>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header__icons flex items-center justify-end">
          <SearchDrawer />

          <Link href="/cart">
            <a className="bag inline-block p-2 text-gray-700">{bagIcon}</a>
          </Link>

          <button
            className="inline-block md:hidden p-2"
            onClick={toggleAccordion}
          >
            {menuIcon}
          </button>
        </div>
      </div>

      <Collapse className="md:hidden" in={opened}>
        <ul className="">
          <li className="border-t border-gray-200">
            <Link href="/">
              <a
                className="block mx-auto px-8 py-4 text-gray-700 hover:text-opacity-70 hover:underline"
                style={{ maxWidth: "640px" }}
              >
                ホーム
              </a>
            </Link>
          </li>
          <li className="border-t border-gray-200">
            <Link href="/collections/all">
              <a
                className="block mx-auto px-8 py-4 text-gray-700 hover:text-opacity-70 hover:underline"
                style={{ maxWidth: "640px" }}
              >
                カタログ
              </a>
            </Link>
          </li>
        </ul>
      </Collapse>
    </header>
  );
};

export default Header;
