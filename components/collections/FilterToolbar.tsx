type Props = {
  total: number
};

const FiltertoolBar = ({ total }) => {
  return (
    <div
      className="filter-toolbar"
      style={{
        height: "3.5rem",
        borderBottom: "1px solid #ebebeb",
        borderTop: "1px solid #ebebeb",
      }}
    >
      <div
        className="container"
        style={{ alignItems: "center", display: "flex" }}
      >
        <div
          style={{ flex: "1 1 33%", lineHeight: "3.5rem", textAlign: "left" }}
        >
          並び替え
        </div>
        <div style={{ lineHeight: "3.5rem", flex: "0 1 auto" }}>{String(total)}個の商品</div>
      </div>
    </div>
  );
};

export default FiltertoolBar;