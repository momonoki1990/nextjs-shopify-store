import React from "react";

const Footer: React.FC = () => {
  const onClickHandler = () => {
    alert("Sorry, newsletter subscription feature is not implemented");
  };
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-14">
      <div className="footer__upper container md:grid md:grid-cols-2">
        <div className="links mb-12 md:mb-0 px-4 md:px-0">
          <div className="font-semibold">クイックリンク</div>
          <ul>
            <li className="py-4">
              <a
                href="/search"
                className="hover:text-opacity-70 text-gray-800 hover:underline"
              >
                検索
              </a>
            </li>
          </ul>
        </div>
        <div className="newsletter mb-12 md:mb-0 px-4 md:px-0">
          <div className="font-semibold mb-4">ニュースレター</div>
          <div className="flex flex-wrap">
            <input
              className="border border-gray-200 px-4 py-3 rounded-sm text-sm"
              type="text"
              placeholder="メールアドレス"
              style={{ flex: "9999 0 15rem" }}
            />
            <button
              className="bg-gray-700 flex-grow inline-block px-4 py-3 text-sm text-white"
              onClick={onClickHandler}
            >
              登録する
            </button>
          </div>
        </div>
      </div>
      <hr className="mt-14 md:mt-24 mb-7 md:mb-5" />
      <div className="footer__bottom container md:text-right text-center">
        <div className="inline-block text-xs text-gray-800 tracking-tight">
          &copy; 2021, sample-kuma-store1 Powered by Shopify
        </div>
      </div>
    </footer>
  );
};

export default Footer;
