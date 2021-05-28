import React from 'react';
import { Drawer } from "@material-ui/core";

type Props = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: any
  checkout: any;
}

const CartDrawer: React.FC<Props> = ({ isDrawerOpen, setIsDrawerOpen, checkout }) => {
  return (
    <Drawer anchor="top" open={isDrawerOpen} onClose={() => {setIsDrawerOpen(false)}}>
      サンプル
    </Drawer>
  )
}

export default CartDrawer;