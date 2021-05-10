import React from "react";
import Image from "next/image";
import { Product } from "shopify-buy";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import SwiperCore, {
  Navigation
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation]);

type Props = {
  product: Product;
  imageId: string;
};

const ProductImageList: React.FC<Props> = ({ product, imageId }) => {
  return (
    <>
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4">
        {product.images.map((image) => (
          <figure className="m-0" key={image.id}>
            <Image priority src={image.src} height={400} width={400} />
          </figure>
        ))}
      </div>
      <div className="md:hidden">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSwiper={(swiper) => console.log(swiper)}
          navigation={true}
        >
          {product.images.map((image) => (
            <SwiperSlide key={image.id}>
              <figure className="m-0" key={image.id}>
                <Image priority src={image.src} height={400} width={400} />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProductImageList;
