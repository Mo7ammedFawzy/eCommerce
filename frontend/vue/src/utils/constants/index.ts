import {BadgeState, FooterLink, Order} from "@/types/common.ts";
import {EventBusKey} from "@vueuse/core";
import type {InjectionKey, Ref} from "vue";


export const FAKE_API_URL = "https://fakestoreapi.com/products";
export const BASE_API_URL = "http://localhost:8081/api/v1/"
export const API_AUTH_URL = "https://dummyjson.com/auth";
export const MAX_ITEMS = 5
export const DISCOUNT = 40
export const SHIPPING_TAX = 8
export const API_COUNTRIES_URL = "https://restcountries.com/v3.1/independent?status=true&fields=name"
export const DELAY_TIME = 4000
export const MAX_SEARCH_RESULT = 5
export const PAYMENT_METHODS = ['cash_on_delivery', "credit_card", "paypal"]
export const T_PAYMENT_METHOD: Order['paymentMethod'] = 'cash_on_delivery'
export const REGEX = {
  phoneNumber: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
  zipCode: /^\d{5,9}$/
}
const NODE_URL = "https://e-commerce-node-backend.vercel.app/api"
// const SPRING_LOCAL_URL = "http://localhost:8081/api/v1"
// const NODE_LOCAL_URL = "http://localhost:5000/api"
export const BASE_URL = NODE_URL;

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

export enum SectionIds {
  HomeLanding = "home-landing",
  HomeTopCollections = "home-top-collections"
}

export enum Categories {
  ELECTRONICS = "electronics", BOOKS = "books", CLOTHING = "clothing", HOME = "home", TOYS = "toys"
}

export const landingImgLoadKey: EventBusKey<any> = Symbol();
export const appSearchDialogModelKey = Symbol("appSearchDialogModelKey") as InjectionKey<Ref<boolean>>

export const SHIPPING_TAXES = 12;

export const STATE_BADGES: BadgeState = {
  pending: "warning",
  canceled: "error",
  confirmed: "success",
  delivered: "primary",
  shippd: "info"
}