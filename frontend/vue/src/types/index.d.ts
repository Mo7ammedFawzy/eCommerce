export interface Base {
  label: string
}

export type Route = `/${string}`


export interface Rating {
  rate: number,
  count: number
}

export interface ProductCard {
  id: number,
  label: string,
  price: number,
  description: string,
  category: string,
  imgUrl: string,
  rating: Rating,
  colors?: string[],
  discount?: number
}

export interface IProductCard {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  updatedAt?: string,
  createdAt?: string
}

export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}
