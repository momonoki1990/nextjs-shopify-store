import { GetServerSidePropsContext } from "next";

// クエリストリングから取得したページに応じて配列を切り出す関数
export const paginate = (
  context: GetServerSidePropsContext,
  target: any[],
  perPage: number
): any[] => {
  const page: number = Number(context.query?.page) || 1;
  return target.slice((page - 1) * perPage, page * perPage);
};