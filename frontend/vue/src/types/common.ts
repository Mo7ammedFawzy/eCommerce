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

export interface NativeName {
  official: string;
  common: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: NativeName };
  }
}

export interface Customer {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  address: string,
  townCity: string,
  state: string,
  zip: string,
  country: string
}

export interface Order {
  id: string,
  customer: Customer,
  items: Cart[],
  total: number | string,
  state: "pending" | 'confirmed' | 'shippd' | 'delivered' | 'canceled',
  paymentMethod: 'cash_on_delivery' | 'paypal' | 'credit_card',
  createdAt: Date | string
}

export type UIColors = "blue" | 'orange' | 'red' | 'green' | 'lime' | 'purple' | 'primary'

export type BadgeState = { [key in Order['state']]: UIColors }

export interface Login {
  email?: string,
  password?: string,
  username?: string
}

export interface LoginError {
  name: string,
  data: { error: string },
  message: string,
  status: number,
  statusCode: number
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role,
  firstName?: string,
  lastName?: string
}

export type Role = "Admin" | "User";


export interface LoginCredentials {
  email: string,
  password: string
}