import {DropdownMenuItem} from "@nuxt/ui";
import {Categories} from "@/utils/constants";

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

export interface ProductCard {
  _id: string;
  title: string;
  description?: string;
  price: number;
  category: `${Categories}`;
  rating?: Rating;
  thumbnail: string,
  images: readonly string[];
  stock: number,

  colors?: readonly string[];
  discount?: number;
  createdAt?: string;
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

export interface ProductParams {
  limit?: number,
  category?: CategoryType,
  search?: string,
  page?: number
}

export interface Cart {
  product: ProductCard,
  quantity: number
}

export type CategoryType = `${Categories}`