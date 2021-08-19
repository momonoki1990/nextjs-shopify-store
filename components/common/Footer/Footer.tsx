import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const onClickHandler = () => {
    alert("Sorry, newsletter subscription feature is not implemented");
  };
  return (
    <footer className="border-t bg-gray-50 border-gray-200 pt-12 pb-14">
      <div className="container footer__upper md:grid md:grid-cols-2">
        <div className="mb-12 px-4 links md:mb-0 md:px-0">
          <div className="font-semibold">クイックリンク</div>
          <ul>
            <li className="py-4">
              <Link href="/search" passHref>
                <a className="text-gray-800 hover:text-opacity-70 hover:underline">
                  検索
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-12 px-4 newsletter md:mb-0 md:px-0">
          <div className="font-semibold mb-4">ニュースレター</div>
          <div className="flex flex-wrap">
            <input
              className="border rounded-sm border-gray-200 text-sm py-3 px-4"
              type="text"
              placeholder="メールアドレス"
              style={{ flex: "9999 0 15rem" }}
            />
            <button
              className="flex-grow bg-gray-700 text-sm text-white py-3 px-4 inline-block"
              onClick={onClickHandler}
            >
              登録する
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-14 mb-7 md:mt-24 md:mb-5" />
      <div className="container text-center footer__bottom md:text-right">
        <div className="text-xs tracking-tight text-gray-800 inline-block">
          &copy; 2021, sample-kuma-store1 Powered by Shopify
        </div>
      </div>
    </footer>
  );
};

export default Footer;
