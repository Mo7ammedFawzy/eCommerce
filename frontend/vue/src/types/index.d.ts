import {DropdownMenuItem} from "@nuxt/ui";
import {Categories} from "@/utils/constants";

//TODO:: make module

export interface Base {
  label: string,
  icon?: string
}

export interface ListItem extends Base {
  subtitle?: string,
  img?: string,
  id?: number
}


export type Route = `/${string}`

export interface Rating {
  rate: number,
  count: number
}

export interface IProductCard {
  // Required
  category: string;
  description: string;
  id: number;
  images: string[];
  price: number;
  rating?: Rating;
  title: string;

  // Optional
  colors?: string[];
  createdAt?: string;
  discount?: number;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface ServiceCard extends ListItem {
  icon: string
}

export interface FooterLink extends Omit<Base, "label"> {
  link?: string,
  color?: string,
  icon: string
}

export interface ProfileMenuLink extends DropdownMenuItem {

}

export type CategoryType = `${Categories}` //typeof Categories[keyof typeof Categories];

export interface ProductParams {
  limit?: number,
  category?: string,
  search?: string
}

export interface Cart {
  product: IProductCard,
  quantity: number
}

export interface CartActions {
  pushToCart(product: IProductCard): void,

  addToCart(product: IProductCard): void,

  decreaseQuantity(product: IProductCard): void,

  increaseQuantity(product: IProductCard): void,

  deleteProductFromCart(product: IProductCard): void,

  clearCart(): void
}

export interface CartGetters {
  getProductQuantity(state): number,

  getCartLength(state): number,

  isCartEmpty(state): boolean,

  getTotalPrice(state): number,

  getTotalPriceAfterShipping(state): number
}