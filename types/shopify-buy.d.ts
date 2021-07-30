import "shopify-buy";
import { Product, ProductVariant } from "shopify-buy";

declare module "shopify-buy" {
  export interface Product {
    handle: string;
  }

  export interface ProductVariant {
    product: Product;
    selectedOptions: SelectedOption[];
  }

  export interface SelectedOption {
    name: string;
    value: string;
  }

  export interface Cart {
    webUrl: string;
  }

  export interface LineItem {
    handle: string;
    variant: ProductVariant;
  }
}
