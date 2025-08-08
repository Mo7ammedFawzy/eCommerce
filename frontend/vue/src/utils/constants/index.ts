import {FooterLink} from "@/types";

export const BASE_URL = "http://localhost:8081/api/v1";//"https://api.escuelajs.co/api/v1/"

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