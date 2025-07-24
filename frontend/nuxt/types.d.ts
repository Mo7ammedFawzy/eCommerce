import type {DropdownItem} from "#ui/types";

export interface Base {
  label?: string
  icon?: string
}

export interface ListItem extends Base {
  subtitle?: string,
  img?: string,
  id?: number
}

export interface HeaderAction extends Omit<HeaderLink, 'query'> {
  hasChip?: boolean,
  color?: 'orange' | 'blue',
  mobile?: boolean,
  isMenu?: boolean,
  isPopover?: boolean
}

export interface HeaderLink extends Base {
  to: string,
  category?: string
}

export interface SemiCard extends Base {
  subTitle?: string,
  description: string,
  btns: Btns[],
  img: string,
  name: string,
}

export interface Btns extends Base {
  path: string,
}

export interface ProfileLink extends ListItem, DropdownItem {
  label: string,
  hasSwitch?: boolean,
  path?: string
}

export interface Category extends Base {
  img?: string,
  radioTitle?: string
}

export interface ServiceCard extends ListItem {
  icon: string
}

export interface FooterLink extends Base {
  link?: string,
  color?: string
}

export type Route = `/${string}`


/*
* below this is my product , now i want to make interface
* for admin when he upload new product
* consider product quantity,sizes,colors,what else do i need
* */
export interface Product {
  // Required
  category: string;
  description: string;
  id: number;
  images: File[];
  price: number;
  rating?: Rating;
  title: string;

  // Optional
  colors?: string[];
  createdAt?: string;
  discount?: number;
  updatedAt?: string;
}

export interface Rating {
  rate: number,
  count: number
}

export interface Cart {
  product: Product,
  quantity: number
}

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: NativeName };
  }
}

export interface NativeName {
  official: string;
  common: string;
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
  role: Role
}

export type Role = "Admin" | "User";


export interface LoginCredentials {
  email: string,
  password: string
}

export interface IUserStore {
  user: User | null,
  token: string | null,
  hasDashboardAccess: boolean,

  // //Getter
  // isLoggedIn: boolean,
  //
  // //Action
  // setUser(user: User): void,
  //
  // setToken(token: string): void,
  //
  // logOut(): void,
  //
  // login(credentials: LoginCredentials): Promise<void>,
  //
  // fetchUserProfile(): Promise<void>

}
export interface AddProduct extends Omit<Product, "id"> {
  quantity: number,
  sizes: ProductSizes[]
}