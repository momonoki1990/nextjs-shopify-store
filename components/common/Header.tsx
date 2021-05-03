import React from "react";
import Link from "next/link";

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
        <button className="search inline-block px-2 text-gray-700">
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
        </button>
        <Link href="/cart">
          <a className="bag inline-block px-2 text-gray-700">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </a>
        </Link>
        <button className="ban inline-block md:hidden pl-2 text-gray-700">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
);

export default Header;
