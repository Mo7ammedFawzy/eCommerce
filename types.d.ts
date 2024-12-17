export interface ListItem {
 icon?: string,
 title?: string,
 text?: string,
 img?: string,
 id?: number
}

export interface HeaderAction extends Omit<HeaderLink, 'query'> {
 icon: string,
 hasChip?: boolean,
 color?: 'orange' | 'blue',
 mobile?: boolean,
 isMenu?: boolean,
 isPopover?: boolean
}

export interface HeaderLink {
 title: string,
 route: string,
 category?: string
}


export interface SemiCard {
 title: string,
 subTitle?: string,
 text: string,
 btns: Btns[],
 img: string,
 name: string,
}

export interface Btns {
 path: string,
 title: string
}

export interface ProfileLink extends ListItem {
 hasSwitch?: boolean,
 path?: string,
 label?: string,
 slot?: string,
 disabled?: boolean

}



export interface Category {
 img?: string,
 title: string,
 radioTitle?: string
}

export interface ProductCard extends ListItem {
 img?: string | number,
 rating: number,
 colors: string[],
 price: number,
 discount: number
}


export interface ServiceCard extends ListItem {
 icon: string
}

export interface FooterLink {
 icon: string,
 link?: string,
 color?: string
}


export interface API_Product {
 id: number,
 title: string,
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

export interface MainHeader {
 title: string,
 text?: string
}

export interface PageHeader extends MainHeader {
 path: string
}

export interface Query {
 limit?: number,
 category?: string
}




export interface ICart {
 product: API_Product,
 quantity: number
}

export interface ICountry {
 name: Name
}

export interface Name {
 common: string;
 official: string;
 nativeName: { [key: string]: NativeName };
}

export interface NativeName {
 official: string;
 common: string;
}


export interface ICustomer {
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

export interface IOrder {
 id: string,
 customer: ICustomer,
 items: ICart[],
 total: number | string,
 state: "pending" | 'confirmed' | 'shippd' | 'delivered' | 'canceled',
 paymentMethod: 'cash_on_delivery' | 'paypal' | 'credit_card',
 createdAt: Date
}

export type UI_Colors = "blue" | 'orange' | 'red' | 'green' | 'lime' | 'purple' | 'primary'

export type State_Badge = { [key in IOrder['state']]: UI_Colors }


export type Customer_Info = { [key in keyof ICustomer]: string }