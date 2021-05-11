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
  currentImageId: string;
  setImageId: (imageId: string) => void;
};

const ProductImageList: React.FC<Props> = ({
  product,
  currentImageId,
  setImageId,
}) => {
  return (
    <>
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4">
        {product.images.map((image) => {
          const imageId = image.id as string;
          const isCurrentImage = imageId === currentImageId;
          const borderClass = " " + "border-2 border-gray-800";
          return (
            <figure
              className={"m-0" + (isCurrentImage ? borderClass : "")}
              key={image.id}
            >
              <a onClick={() => setImageId(imageId)}>
                <Image priority src={image.src} height={400} width={400} />
              </a>
            </figure>
          );
        })}
      </div>

      <div className="md:hidden">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSwiper={(swiper) => console.log(swiper)}
          navigation={true}
        >
          {product.images.map((image) => {
            const imageId = image.id as string;
            const isCurrentImage = imageId === currentImageId;
            const borderClass = " " + "border-2 border-gray-800";
            return (
              <SwiperSlide key={image.id}>
                <figure
                  className={"m-0" + (isCurrentImage ? borderClass : "")}
                  key={image.id}
                >
                  <a onClick={() => setImageId(imageId)}>
                    <Image priority src={image.src} height={400} width={400} />
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
