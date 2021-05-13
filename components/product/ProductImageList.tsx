import React from "react";
import Image from "next/image";
import { Product } from "shopify-buy";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Navigation]);

type Props = {
  product: Product;
  imageId: string;
  setImageId: (myImageId: string) => void;
};

const ProductImageList: React.FC<Props> = ({
  product,
  imageId,
  setImageId,
}) => {
  const initialImageIndex: number = product.images.findIndex(
    ({ id }) => id === imageId
  );
  return (
    <>
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4">
        {product.images.map(({ id, src }) => {
          const isCurrentImage = id === imageId;
          const borderClass = " " + "border-2 border-gray-800";
          return (
            <figure
              className={"m-0" + (isCurrentImage ? borderClass : "")}
              key={id}
            >
              <a onClick={() => setImageId(id as string)}>
                <Image priority src={src} height={400} width={400} />
              </a>
            </figure>
          );
        })}
      </div>

      <div className="md:hidden">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          navigation={true}
          initialSlide={initialImageIndex}
        >
          {product.images.map(({ id, src }) => {
            const isCurrentImage = id === imageId;
            const borderClass = " " + "border-2 border-gray-800";
            return (
              <SwiperSlide key={id}>
                <figure
                  className={"m-0" + (isCurrentImage ? borderClass : "")}
                  key={id}
                >
                  <a onClick={() => setImageId(id as string)}>
                    <Image priority src={src} height={400} width={400} />
                  </a>
                </figure>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default ProductImageList;
