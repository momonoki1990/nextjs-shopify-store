import React from "react";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Product } from "lib/graphql/product/getProductsByTitle";

const useStyles = makeStyles({
  flexSm: {
    flex: "0 0 4rem",
    marginRight: "1rem",
  },
  flexMd: {
    flex: "0 0 6rem",
    marginRight: "1.5rem",
  },
});

type Props = {
  product: Product;
};

export const SearchItemRow: React.FC<Props> = ({ product }) => {
  const classes = useStyles();
  const isOverMd = useMediaQuery("(min-width:768px)");
  const priceVaries = !(product.priceMax === product.priceMin);

  return (
    <div>
      <a
        href={`/products/${product.handle}`}
        className="flex font-semibold items-center justify-center mb-5 text-sm md:text-base text-gray-700"
      >
        <div className="flex items-center justify-center">
          <figure className={isOverMd ? classes.flexMd : classes.flexSm}>
            <Image
              src={product.images[0].originalSrc}
              height={150}
              width={150}
            />
          </figure>
          <div>{product.title}</div>
        </div>
        <div className="ml-4 md:ml-6 w-1/5 whitespace-nowrap">
          ¥{product.priceMin.toLocaleString("ja-JP")}
          {priceVaries && "から"}
        </div>
      </a>
    </div>
  );
};
