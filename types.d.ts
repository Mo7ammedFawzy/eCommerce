export interface ListItem {
 icon?: string,
 title: string,
 text?: string
}

export interface HeaderAction extends Omit<HeaderLink, 'query'> {
 icon: string,
 hasChip?: boolean,
 color?: 'orange' | 'blue',
 mobile?: boolean,
}

export interface HeaderLink {
 title: string,
 route: string,
 category?: string
}

export interface SemiCard extends ListItem {
 btns?: Btns[],
 img: string,
 subTitle?: string,
 bg?: string,
 shape_bg?: string,
 class_color?: string,
 isBlue?: boolean,
}

export interface Btns {
 path: string,
 title: string,
 color: string, style?: string
}

export interface ProfileLink extends ListItem {
 hasSwitch?: boolean,
 path?: string

}



export interface Category {
 img: string,
 title: string
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

