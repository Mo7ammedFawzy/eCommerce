import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { CSSPlugin } from "gsap/CSSPlugin"
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(CSSPlugin)

export const useGsap = () => {

 /**@constant */
 const duration = .55;
 // const ease = "power4.inOut";
 const ease = "expo.inOut";
 const defaults = { duration, ease }


 /**@ScrollToTopBtn */
 const isScrollToTopBtnShown = ref(false)

 const scrollTopBtn = {
  target: "#scroll-to-top-btn",
  offsetY: 120,
  /**@function */
  __SHOW__: () => {
   gsap.to(scrollTopBtn.target, {
    scale: 1,
    xPercent: 0,
    yPercent: 0,
    ...defaults,
    onComplete() {
     isScrollToTopBtnShown.value = true

    }
   })
  },
  __HIDE__: () => {
   gsap.to(scrollTopBtn.target, {
    scale: 0,
    xPercent: 150,
    yPercent: 150,
    ...defaults,
    onComplete() {
     isScrollToTopBtnShown.value = false
    }
   })
  },
  __TOGGLE__: useDebounceFn(() => {
   if (!window || !document) return;
   window.scrollY >= scrollTopBtn.offsetY ? scrollTopBtn.__SHOW__() : scrollTopBtn.__HIDE__()
  }, 250, { maxWait: 4000 })
 }

 return { scrollTopBtn, isScrollToTopBtnShown }

}