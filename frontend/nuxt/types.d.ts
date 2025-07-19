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
  route: string,
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

export interface ProfileLink extends ListItem {
  hasSwitch?: boolean,
  path?: string,
  slot?: string,
  disabled?: boolean

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

export interface Product extends Base {
  id: number,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: Rating,
  colors?: string[],
  discount?: number
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
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
