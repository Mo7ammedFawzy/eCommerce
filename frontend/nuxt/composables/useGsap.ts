import {gsap} from "gsap"
import {ScrollToPlugin} from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

export const useGsap = () => {

  const duration = .55;
  const ease = "expo.inOut";
  const defaults = {duration, ease}

  const isScrollToTopBtnShown = ref(false)

  const scrollTopBtn = {
    target: "#scroll-to-top-btn",
    offsetY: 120,
    show: () => {
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
    hide: () => {
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
    toggle: useDebounceFn(() => {
      if (!window || !document) return;
      window.scrollY >= scrollTopBtn.offsetY ? scrollTopBtn.show() : scrollTopBtn.hide()
    }, 250, {maxWait: 4000})
  }

  const scrollTo = (scrollTo: string | number = 0) => {
    if (!gsap || typeof window == undefined || !document) return;
    let target;
    if (typeof scrollTo === 'string') {
      target = document.querySelector(scrollTo) as HTMLElement
      target = target.offsetTop
    } else {
      target = scrollTo
    }
    const scrollDiff = 24
    if (window.scrollY - scrollDiff === target) return;
    gsap.to(window, {duration: 1, ease: "power4.inOut", scrollTo: {offsetY: scrollTo ? 80 : 0, y: scrollTo}})
  }

  return {scrollTopBtn, isScrollToTopBtnShown, scrollTo}
}
