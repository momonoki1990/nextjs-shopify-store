import React, { useContext } from "react";
import Image from "next/image";
import { Drawer } from "@material-ui/core";
import { ProductContext } from "pages/products/[handle]";
import { closeIcon } from "components/utils/Icon";
import { CartState } from "lib/useCart";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartState: CartState;
};

const CartDrawer: React.FC<Props> = ({ isOpen, setIsOpen, cartState }) => {
  const closeDrawer = () => {
    setIsOpen(false);
  };

  const { product, imageId, variant } = useContext(ProductContext);
  const selectedImage = product.images.find((image) => image.id === imageId);

  const reducer = (accumulator, currentValue) => {
    accumulator += currentValue.quantity;
    return accumulator;
  };
  const totalQuqntity = cartState.value?.lineItems.reduce(reducer, 0);

  return (
    <Drawer
      classes={{ paper: "border border-gray-400 left-auto w-full md:w-96" }}
      anchor="top"
      BackdropProps={{ invisible: true }}
      open={isOpen}
      onClose={closeDrawer}
    >
      <div className="px-6 pb-6 cart-drawer__container">
        <div className="border-b flex border-gray-200 py-2 cart-drawer__header justify-between">
          <div className="text-sm text-gray-700">カートに追加済み</div>
          <div className="text-gray-700">
            <a className="cursor-pointer" onClick={closeDrawer}>
              {closeIcon}
            </a>
          </div>
        </div>
        <div className="flex mt-4 cart-drawer__content">
          <figure
            className="mr-4 cart-drawer__image"
            style={{ flexBasis: "15%" }}
          >
            <Image
              src={selectedImage.src}
              height={200}
              width={200}
              alt={"image-" + selectedImage.id.toString()}
            ></Image>
          </figure>
          <div className="flex-1 cart-drawer__info">
            <div className="font-bold cart-drawer__product-title">
              {product.title}
            </div>
            <div className="mt-2 cart-drawer__option">
              {(variant ? variant : product.variants[0]).selectedOptions.map(
                (opt, idx) => (
                  <div className="text-sm" key={idx}>
                    <span>{opt.name}:</span>
                    <span>{opt.value}</span>
                  </div>
                )
              )}
            </div>
          </div>
          <div
            className="text-right text-sm ml-4 text-gray-600 cart-drawer__quantity"
            style={{ flexBasis: "20%" }}
          >
            数量: 1
          </div>
        </div>
        <div className="mt-4 cart-drawer__cart-link">
          <Link href="/cart">
            <a className="border rounded-sm font-semibold border-gray-900 text-center text-sm w-full py-3 px-4 text-gray-700 inline-block">
              カートを見る（{String(totalQuqntity)}）
            </a>
          </Link>
        </div>
        <div className="mt-4 text-center cart-drawer__continue">
          <a
            className="border-b cursor-pointer border-gray-400 text-sm text-gray-600"
            onClick={closeDrawer}
          >
            買い物を続ける
          </a>
        </div>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
