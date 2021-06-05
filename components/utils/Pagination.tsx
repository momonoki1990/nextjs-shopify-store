import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  currentPage: number;
  totalPage: number;
};

const disabled = `border border-gray-400 inline-block px-5 py-2 rounded-sm text-gray-400`;
const active = `border border-gray-900 hover:border-opacity-70 inline-block rounded-sm text-gray-700 hover:text-opacity-70`;

const Paginateion: React.FC<Props> = ({ currentPage, totalPage }) => {
  const router = useRouter();
  const previousPage: string = `${router.pathname}/?page=${currentPage - 1}`;
  const nextPage: string = `${router.pathname}/?page=${currentPage + 1}`;

  return (
    <ul className="pagination text-center">
      {currentPage === 1 ? (
        <li className={`pagination__prev--disabled ${disabled}`}>←</li>
      ) : (
        <li className={`pagination__prev--active ${active}`}>
          <Link href={previousPage}>
            <a className="block px-5 py-2">←</a>
          </Link>
        </li>
      )}{" "}
      <li className="pagination__number inline-block px-6 text-sm text-gray-700">
        ページ : {currentPage} / {totalPage}{" "}
      </li>
      {currentPage === totalPage ? (
        <li className={`pagination__next--disabled ${disabled}`}>→</li>
      ) : (
        <li className={`pagination__next--active ${active}`}>
          <Link href={nextPage}>
            <a className="block px-5 py-2">→</a>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Paginateion;
