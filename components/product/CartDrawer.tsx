import React, { useContext } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { Drawer } from "@material-ui/core";
import { ProductContext } from "pages/products/[handle]";
import { closeIcon } from "components/utils/Icon";

type Props = {
  isOpen: boolean;
  setIsOpen: any;
  checkout: any;
}



const CartDrawer: React.FC<Props> = ({ isOpen, setIsOpen, checkout }) => {
  console.log('CartDrawerのなか')

  const closeDrawer = () => {
    setIsOpen(false)
  }

  const { product, imageId, variant } = useContext(ProductContext);
  const selectedImage = product.images.find((image) => image.id === imageId);

  const { lineItems } = checkout;
  const reducer = (accumulator, currentValue) => {
    accumulator += currentValue.quantity;
    return accumulator;
  }
  const totalQuqntity = lineItems?.reduce(reducer, 0);

  return (
    <Drawer classes={{ paper: "border border-gray-400 left-auto w-full md:w-96" }} anchor="top" open={isOpen} onClose={closeDrawer}>
      <div className="cart-drawer__container px-6 pb-6">
        <div className="cart-drawer__header border-b border-gray-200 flex justify-between py-2">
          <div className="text-sm text-gray-700">カートに追加済み</div>
          <div className="text-gray-700">
            <a className="cursor-pointer" onClick={closeDrawer}>{closeIcon}</a>
          </div>
        </div>
        <div className="cart-drawer__content flex mt-4">
          <figure className="cart-drawer__image mr-4" style={{ flexBasis: "15%" }}>
            <Image
              src={selectedImage.src}
              height={200}
              width={200}
            ></Image>
          </figure>
          <div className="cart-drawer__info flex-1">
            <div className="cart-drawer__product-title font-bold">{product.title}</div>
            <div className="cart-drawer__option mt-2">
              {(variant ? variant : product.variants[0]).selectedOptions.map(opt => {
                return (
                  <div className="text-sm"><span>{opt.name}:</span><span>{opt.value}</span></div>
                )
              })}
            </div>
          </div>
          <div className="cart-drawer__quantity ml-4 text-gray-600 text-right text-sm" style={{flexBasis: "20%" }}>
            数量: 1
          </div>
        </div>
        <div className="cart-drawer__cart-link mt-4">
          <a className="border border-gray-900 font-semibold inline-block text-gray-700 rounded-sm px-4 py-3 text-center text-sm w-full" href="/cart">
            カートを見る（{String(totalQuqntity)}）
            </a>
        </div>
        <div className="cart-drawer__continue mt-4 text-center">
          <a className="border-b border-gray-400 cursor-pointer text-gray-600 text-sm" onClick={closeDrawer}>買い物を続ける</a>
        </div>
      </div>
    </Drawer>
  )
}

export default CartDrawer;