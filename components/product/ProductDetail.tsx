import React, { useContext } from "react";
import sanitizeHtml from "sanitize-html";
import ProductForm from "components/product/ProductForm";
import ProductPrice from "components/product/ProductPrice";
import { ProductContext } from "pages/products/[handle]";

const ProductDetail: React.FC = () => {
  const {
    product: { title, descriptionHtml },
  } = useContext(ProductContext);

  return (
    <>
      <div className="title mb-4">
        <h1 className="font-bold md:font-semibold md:leading-tight text-gray-800 md:text-4xl text-3xl tracking-wide">
          {title}
        </h1>
      </div>
      <div className="price mb-8">
        <ProductPrice />
      </div>
      <div className="form mb-24">
        <ProductForm />
      </div>

      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(descriptionHtml) }}
      />
    </>
  );
};

export default ProductDetail;
