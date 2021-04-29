import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  currentPage: number
  totalPage: number
}

const Paginateion: React.FC<Props> = ({ currentPage, totalPage }) => {
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const router = useRouter();

  return (
    <div>
      {currentPage === 1 ? (
        <span style={{ color: "gray" }}>←</span>
      ) : (
        <Link href={`${router.pathname}?page=${previousPage}`}>
          <a>←</a>
        </Link>
      )}
      {currentPage} / {totalPage}
      {currentPage === totalPage ? (
        <span style={{ color: "gray" }}>→</span>
      ) : (
        <Link href={`${router.pathname}?page=${nextPage}`}>
          <a>→</a>
        </Link>
      )}
    </div>
  );
};

export default Paginateion;