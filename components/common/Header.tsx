import React from "react";
import Link from "next/link";
import SearchDrawer from "components/common/SearchDrawer"
import { bagIcon, banIcon } from "components/common/Icon";



const Header: React.FC = () => (
  <header className="header border-b border-gray--600">
    <div className="header__inner container items-center flex justify-between md:grid md:grid-cols-3 xl:max-w-none xl:px-14">
      <div className="header__logo text-left mt-6 mb-6">
        <Link href="/">
          <a className="font-semibold text-xl text-gray-800 hover:text-opacity-70 tracking-widest">
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
        <button className="ban inline-block md:hidden pl-2 py-2 text-gray-700">{banIcon}</button>
      </div>
    </div>
  </header>
);

export default Header;
