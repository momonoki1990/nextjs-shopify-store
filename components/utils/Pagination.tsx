import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  currentPage: number;
  totalPage: number;
};

const Paginateion: React.FC<Props> = ({ currentPage, totalPage }) => {
  const router = useRouter();
  const previousPage: string = `${router.pathname}/?page=${currentPage - 1}`;
  const nextPage: string = `${router.pathname}/?page=${currentPage + 1}`;

  return (
    <div>
      {currentPage === 1 ? (
        <span style={{ color: "gray" }}>←</span>
      ) : (
        <Link href={previousPage}>
          <a>←</a>
        </Link>
      )}{" "}
      ページ: {currentPage} / {totalPage}{" "}
      {currentPage === totalPage ? (
        <span style={{ color: "gray" }}>→</span>
      ) : (
        <Link href={nextPage}>
          <a>→</a>
        </Link>
      )}
    </div>
  );
};

export default Paginateion;
