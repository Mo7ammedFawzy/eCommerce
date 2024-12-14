import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import type { TUscrollto } from "~/types";
gsap.registerPlugin(ScrollToPlugin)

export default (scrollTo: string | number = 0) => {
 if (!gsap || typeof window == undefined || !document) return;
 let target;
 if (typeof scrollTo === 'string') {
  target = document.querySelector(scrollTo) as HTMLElement
  target = target.offsetTop
 } else {
  target = scrollTo // number
 }
 // we got target as a number
 if (window.scrollY === target) return;
 console.log('scroll')
 gsap.to(window, { duration: 1, ease: "power4.inOut", scrollTo: { offsetY: scrollTo ? 80 : 0, y: scrollTo } })
}