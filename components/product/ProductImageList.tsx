import React, { useContext } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { Skeleton } from "@material-ui/lab";
import { ProductContext } from "pages/products/[handle]";

SwiperCore.use([Navigation]);

const ProductImageList: React.FC = () => {
  const { product, imageId, setImageId } = useContext(ProductContext);

  const initialImageIdx: number = product?.images.findIndex(
    (prd) => prd.id === imageId
  );

  const changeImage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const id: string = e.currentTarget.getAttribute("data-id");
    setImageId(id);
  };

  const generateImageChild = (
    id: string,
    src: string,
    isCurrentImage: boolean,
    borderClass: string
  ): JSX.Element => {
    return (
      <figure
        className={"cursor-pointer m-0" + (isCurrentImage ? borderClass : "")}
        key={id}
      >
        <a onClick={changeImage} data-id={id}>
          <Image priority src={src} height={400} width={400} />
        </a>
      </figure>
    );
  };

  const generateImageList = (
    product,
    imageId,
    useSwiper: boolean
  ): JSX.Element[] => {
    const imageList = product.images.map((image) => {
      const { id, src } = image;
      const isCurrentImage = id === imageId;
      const borderClass = " " + "border-2 border-gray-800";
      return useSwiper ? (
        <SwiperSlide key={id}>
          {generateImageChild(id, src, isCurrentImage, borderClass)}
        </SwiperSlide>
      ) : (
        generateImageChild(id, src, isCurrentImage, borderClass)
      );
    });
    return imageList;
  };

  return (
    <>
      {product ? (
        <>
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4">
            {generateImageList(product, imageId, false)}
          </div>

          <div className="md:hidden">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              navigation={true}
              initialSlide={initialImageIdx}
            >
              {generateImageList(product, imageId, true)}
            </Swiper>
          </div>
        </>
      ) : (
        <div className="mt-1 grid gap-1 grid-cols-4">
          {Array.from(new Array(4)).map((_, idx) => (
            <div
              className="h-0 skelton-container overflow-hidden relative"
              style={{ paddingTop: "100%" }}
              key={idx}
            >
              <Skeleton
                variant="rect"
                className="h-full w-full top-0 left-0 absolute"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductImageList;
