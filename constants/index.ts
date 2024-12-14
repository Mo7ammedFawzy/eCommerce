import type { Category, FooterLink, HeaderAction, HeaderLink, ProductCard, API_Product, ProfileLink, SemiCard, ServiceCard } from "~/types";
import jsonProducts from "./products.json"
export const API_URL = "https://fakestoreapi.com";
export const API_DELAY = 850
export const MAX_ITEMS = 5
export const DISCOUNT = 40
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
  isPopover: true
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
  isMenu: true

 }
]

export const HEADER_LINKS: HeaderLink[] = [
 {
  title: "home", route: "/",
 },
 // TODO delete-this
 // {
 //  title: "test", route: "/test",
 // },
 { title: "products", route: '/products', },
 { title: "men", route: "/products", category: "men's clothing" },
 { title: "women", route: "/products", category: "women's clothing" },
 { title: "electronics", route: "/products", category: "electronics" }
]

export const ProfileLinks: ProfileLink[] = [
 // 
 {
  icon: "i-circum-dark",
  label: "theme mode",
  hasSwitch: true,

 },
 {
  icon: "iconamoon:home-thin",
  label: 'home',
  path: "/"
 },
 // {
 //  icon: "material-symbols-light:dashboard-outline",
 //  label: "dashboard",
 //  path: "/cart"
 // },
 {
  icon: "line-md:heart",
  label: "wishlist",
  path: "/profile/wishlist"
 },
 // {
 //  icon: "iconamoon:invoice-thin",
 //  label: "invoice",
 //  path: "/"
 // },
 {
  icon: "line-md:person",
  label: "profile",
  path: "/profile/general"
 },
 {
  icon: "material-symbols-light:key-outline",
  label: "change password",
  path: "/profile/change-password"
 },
]

export const HomeItems = {
 landing: {
  firstSection: <SemiCard>{
   title: "top products of the year!",
   text: "It is a long established fact that a reader will be distracted by the readable.",
   img: "slide-1",
   btns: [
    {
     title: 'shop now', path: '/products'
    },
    {
     title: "see all", path: '/products'
    }
   ]
  },
  secondSection: <SemiCard[]>[
   {
    name: "men",
    title: "Men Latest Fashion",
    subTitle: "<span>25%</span> Off on first order",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    img: "men",
    btns: [
     {
      title: "shop now",
      path: "/products?category=men"
     }
    ]
   },
   {
    name: 'women',
    title: "Women Latest Fashion",
    subTitle: "<span>25%</span> Off on first order",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    img: "women",
    btns: [
     {
      title: "shop now",
      path: "/products?category=women",
     }
    ]
   },
  ],
  brandSection: <SemiCard>{
   img: "brand",
   title: "UK Premier Store for Wrist Watches",
   text: "Welcome to our world of horological excellence, featuring timeless, elegant watches from renowned luxury brands worldwide.",
   btns: [
    {
     title: "view more",
     path: "/products"
    }
   ]
  }
 }
}

export const Categories: Category[] = [
 // img path : "/home/categoires/.png"
 {
  title: "electronics",
  radioTitle: "electronics"
 },
 {
  title: "jewelery",
  radioTitle: "jewelery"
  // img: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
 },
 {
  title: "men's clothing",
  radioTitle: "men",
  // img: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
 },
 {
  title: "women's clothing",
  radioTitle: "women",
  // img: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"
 },
 // {
 //  title: "electronics",
 //  img: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
 // },
 // {
 //  title: "jewelery",
 //  img: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
 // },
 // {
 //  title: "men's clothing",
 //  img: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
 // },
 // {
 //  title: "women's clothing",
 //  img: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"
 // },
 // {
 //  img: "shirts",
 //  title: "shirts"
 // },
 // {
 //  img: "pants",
 //  title: "pants"
 // }
 //output
 // [
 //  "electronics",
 //  "jewelery",
 //  "men's clothing",
 //  "women's clothing"
 // ]
]

export const Products: API_Product[] = jsonProducts

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