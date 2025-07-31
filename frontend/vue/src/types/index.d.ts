import {DropdownMenuItem} from "@nuxt/ui";

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