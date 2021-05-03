type Props = {
  total: number
};

const FilterToolbar = ({ total }) => {
  return (
    <div className="filter-toolbar border-t border-b border-gray--600 h-14">
      <div className="filter-toolbar__sort container flex items-center">
        <div
          className="text-left text-xs text-gray-600"
          style={{ flex: "1 1 33%", lineHeight: "3.5rem" }}
        >
          並び替え
        </div>
        <div
          className="filter-toolbar__total flex-initial text-xs text-gray-600"
          style={{ lineHeight: "3.5rem" }}
        >
          {String(total)}個の商品
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;