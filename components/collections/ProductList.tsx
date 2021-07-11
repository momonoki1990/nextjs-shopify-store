import React from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import { Product } from "lib/graphql/collection";
import ProductCard from 'components/collections/ProductCard';


type Props = {
  products: Product[] | null
}

const ProductList: React.FC<Props> = ({ products }) => (
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-9 py-9 md:py-14 md:py-12">
    {(products ? products : Array.from(new Array(8))).map((product, idx) => {
      return product ? (
        <ProductCard product={product} key={idx} />
      ) : (
        <div className="skelton" key={idx}>
          <div
            className="skelton__image-container h-0 overflow-hidden relative"
            style={{ paddingTop: "100%" }}
          >
            <Skeleton
              variant="rect"
              className="absolute h-full left-0 top-0 w-full"
            />
          </div>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      );
    })}
      
  </div>
);

export default ProductList;
