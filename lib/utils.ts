import { GetServerSidePropsContext } from "next";

// クエリストリングから取得したページに応じて配列を切り出して、配列とページ情報を返す関数
export const paginate = (
  context: GetServerSidePropsContext,
  target: any[],
  perPage: number
): (number | {}) [] => {
  const currentPage: number = Number(context.query?.page) || 1;
  const totalPage: number =
    target.length % perPage === 0
      ? target.length / perPage
      : Math.floor(target.length / perPage) + 1;
  const paginatedTarget = target.slice((currentPage - 1) * perPage, currentPage * perPage);
  return [paginatedTarget, currentPage, totalPage];
};