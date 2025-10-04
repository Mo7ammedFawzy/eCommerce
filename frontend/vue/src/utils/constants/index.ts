import {FooterLink} from "@/types/common.ts";
import {EventBusKey} from "@vueuse/core";
import type {InjectionKey, Ref} from "vue";

const NODE_URL = "https://e-commerce-node-backend.vercel.app/api"
const SPRING_LOCAL_URL = "http://localhost:8081/api/v1"
const NODE_LOCAL_URL = "http://localhost:5000/api"
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