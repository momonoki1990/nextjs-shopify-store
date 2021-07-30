import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { SortBy } from "lib/graphql/collection";

type Props = {
  sortBy: SortBy;
};

const FilterToolbar: React.FC<Props> = ({ sortBy }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    location.search = `?sort_by=${value}`;
  };

  return (
    <div className="filter-toolbar border-t border-b border-gray--600">
      <div className="filter-toolbar__inner container flex h-full items-center">
        <div
          className="filter-toolbar__sort text-left"
          style={{ flex: "1 1 33%", lineHeight: "3.5rem" }}
        >
          <label
            htmlFor="sort-by"
            className="block lg:inline-block mt-2 mr-4 text-xs text-gray-600"
          >
            並び替え
          </label>
          <select
            className="bg-transparent cursor-pointer pr-4 py-2 text-base text-gray-700"
            id="sort-by"
            value={sortBy}
            onChange={handleChange}
          >
            <option value="manual">オススメ</option>
            <option value="best-selling">ベストセラー</option>
            <option value="title-ascending">アルファベット順, A-Z</option>
            <option value="title-descending">アルファベット順, Z-A</option>
            <option value="price-ascending">価格の安い順</option>
            <option value="price-descending">価格の高い順</option>
            <option value="created-ascending">古い商品順</option>
            <option value="created-descending">新着順</option>
          </select>
        </div>
        {/* <div
          className="filter-toolbar__total flex-initial text-xs text-gray-600"
          style={{ lineHeight: "3.5rem" }}
        >
          {String(total)}個の商品
        </div> */}
      </div>
    </div>
  );
};

export default FilterToolbar;
