import type { Category, FooterLink, HeaderAction, HeaderLink, ProductCard, ProfileLink, SemiCard, ServiceCard } from "~/types";

export const HEADER_ACTIONS: HeaderAction[] = [
 {
  title: "home",
  route: "/",
  icon: "iconamoon:home-thin",
  mobile: true,
 }
 ,
 {
  title: "search",
  icon: "material-symbols-light:search",
  route: "/search",
 },
 {
  title: "products",
  icon: "my-icon:products", mobile: true, route: "/products",
 },
 {
  title: "cart",
  // icon: "solar:cart-4-line-duotone",
  icon: "my-icon:cart",
  hasChip: true,
  color: "blue", route: "/cart",
 },
 {
  title: "favourite",
  icon: "ph:heart-light",
  hasChip: true,
  color: "orange",
  mobile: false,
  route: "/profile/wishlist",
 },
 {
  title: "user",
  icon: "material-symbols-light:person-outline",
  route: "/profile",
 }
]

export const HEADER_LINKS: HeaderLink[] = [
 {
  title: "home", route: "/",
 },
 { title: "products", route: '/products', },
 { title: "men", route: "/products", category: 'men' },
 { title: "women", route: "/products", category: "women" },
 { title: "kids", route: "/products", category: "kids" }
]

export const ProfileLinks: ProfileLink[] = [
 {
  icon: "i-circum-dark",
  title: "theme mode",
  hasSwitch: true,
 },
 {
  icon: "iconamoon:home-thin",
  title: 'home',
  path: "/"
 },
 {
  icon: "material-symbols-light:dashboard-outline",
  title: "dashboard",
  path: "/cart"
 },
 {
  icon: "line-md:heart",
  title: "wishlist",
  path: "/profile/wishlist"
 },
 {
  icon: "iconamoon:invoice-thin",
  title: "invoice",
  path: "/"
 },
 {
  icon: "line-md:person",
  title: "profile",
  path: "/profile"
 },
 {
  icon: "material-symbols-light:key-outline",
  title: "change password",
  path: "/"
 },
]

export const HomeItems = {
 landing: {
  firstSection: <SemiCard>{
   title: "top products of the year!",
   text: "It is a long established fact that a reader will be distracted by the readable.",
   img: "slide-1",
   class_color: "bg-red-900 dark:!bg-green-600",
   btns: [
    {
     title: 'shop now', path: '/products', color: 'blue', style: 'rgb(0, 126, 252)'
    },
    {
     title: "see all", path: '/products', color: 'orange', style: 'rgb(245, 93, 164)'
    }
   ]
  },
  secondSection: <SemiCard[]>[
   {
    shape_bg: "#007efc",
    bg: "#2e97ff66",
    title: "Men Latest Fashion",
    subTitle: "<span>25%</span> Off on first order",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    img: "men",
    class_color: "bg-red-900",
    isBlue: true,
    btns: [
     {
      title: "shop now",
      path: "/products?category=men",
      color: "blue",
      style: 'rgb(0, 126, 252)'
     }
    ]
   },
   {
    bg: "#f99ec866",
    shape_bg: "#f55da4",
    title: "Women Latest Fashion",
    subTitle: "<span>25%</span> Off on first order",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    img: "women",
    class_color: "bg-red-900",
    btns: [
     {
      title: "shop now",
      path: "/products?category=women",
      color: "red",
      style: 'rgb(245, 93, 164)'
     }
    ]
   },
  ],
  brandSection: <SemiCard>{
   img: "brand",
   title: "UK Premier Store for Wrist Watches",
   text: "Welcome to our world of horological excellence, where timepieces become timeless statements of elegance. Our collection showcases an unparalleled selection of premium watches, curated from renowned luxury brands around the globe.",
   btns: [
    {
     title: "view more",
     path: "/products",
     style: "#26c196"
    }
   ]
  }
 }
}

export const Categories: Category[] = [
 {
  img: "shirts",
  title: "shirts"
 },
 {
  img: "pants",
  title: "pants"
 }
]

export const Products: ProductCard[] = [
 {
  title: "Black Bold Floral Printed Half Sleeve how many years Black Bold Floral Printed Half Sleeve how many years Black Bold Floral Printed Half Sleeve how many years Black Bold Floral Printed Half Sleeve how many years",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow']
 },
 {
  title: "Black Bold Floral Printed Half Sleeve how many years",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow'],
  img: "2",
 },
 {
  title: "Black Bold",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow'],
  img: 3,
 },
 {
  title: "Black Bold Floral Printed Half Sleeve how many years",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow'],
  img: 4
 },
 {
  title: "Black Bold Floral Printed Half Sleeve how many years Black Bold Floral Printed Half Sleeve how many years Black Bold Floral Printed Half Sleeve how many years Black Bold Floral Printed Half Sleeve how many years",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow']
 },
 {
  title: "Black Bold Floral Printed Half Sleeve how many years",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow'],
  img: "2",
 },
 {
  title: "Black Bold",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow'],
  img: 3,
 },
 {
  title: "Black Bold Floral Printed Half Sleeve how many years",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow'],
  img: 4
 },
 {
  title: "Black Bold Floral Printed Half Sleeve how many years Black Bold Floral Printed Half Sleeve how many years Black Bold Floral Printed Half Sleeve how many years Black Bold Floral Printed Half Sleeve how many years",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow']
 },
 {
  title: "Black Bold Floral Printed Half Sleeve how many years",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow'],
  img: "2",
 },
 {
  title: "Black Bold",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow'],
  img: 3,
 },
 {
  title: "Black Bold Floral Printed Half Sleeve how many years",
  price: 34,
  discount: 32,
  rating: 4.5,
  colors: ['black', 'white', 'yellow'],
  img: 4
 },
]


export const Services: ServiceCard[] = [
 {
  icon: "la:shipping-fast",
  title: "free shipping",
  text: "Enjoy free shipping on all orders, providing a convenient and cost-effective way to receive your favorite products at your doorstep."
 },
 { icon: "material-symbols-light:support-agent", title: "support", text: "Our dedicated support team is here to assist you. Reach out to us for any queries or concerns, and experience exceptional customer service." },
 { icon: "fluent-mdl2:repeat-all", title: "Return", text: "Hassle-free returns within a specified period. If you're not satisfied with your purchase, we make the return process simple and convenient for you." },
 { icon: "bx:dollar", title: "Payment", text: "Secure and convenient payment options for a seamless shopping experience. Choose from various payment methods to complete your order." },
]

export const FooterLinks: FooterLink[] = [
 {
  icon: "mdi-facebook",
  color: '#1877f2'
 },
 {
  icon: "mdi-instagram",
  color: '#c32aa3'
 },
 {
  icon: "mdi-linkedin",
  color: '#0a66c2'
 },
 {
  icon: "mdi-youtube",
  color: '#ff0000'
 },
]