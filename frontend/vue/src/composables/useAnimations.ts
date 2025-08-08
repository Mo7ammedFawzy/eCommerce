import {gsap} from "gsap"
import {CustomEase} from "gsap/CustomEase"
import {SplitText} from "gsap/SplitText";
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import {CSSPlugin} from "gsap/CSSPlugin"
import {useDebounceFn, useEventListener} from "@vueuse/core";
import {onMounted, useTemplateRef} from "vue";
import {useRoute} from "vue-router";
import {RouterNames} from "@/router/routerNames.ts";
import TweenVars = gsap.TweenVars;

gsap.registerPlugin(CustomEase)
gsap.registerPlugin(CSSPlugin)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(SplitText)
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function useAnimations() {

  const tl = gsap.timeline()
  const route = useRoute();
  const loadingScreenDuration = 1.2
  const loadingScreenEase = "power2.inOut"
  const appLoader = "#app-loader"
  const appLoaderHeader = "[data-app-loader-header]";
  const appHeader = "#app-header";
  const landingImg = "[data-animate-landing-img]"
  const oneTimeAnimate = "[data-animate-one-time]"

  const registerZoomInImgOnScrollListener = () => {
    const landingImgRef = useTemplateRef<HTMLImageElement>("imgRef")
    const homeLandingSection = useTemplateRef<HTMLElement>("sectionHomeLandingRef")
    useEventListener(window, "scroll", () => {
      const section = homeLandingSection.value
      if (!section)
        return;
      const landingImgValue = landingImgRef.value;
      if (!landingImgValue)
        return;
      if (!window.matchMedia("(min-width: 769px)").matches)
        return;
      if (!section.offsetHeight || scrollY >= section.offsetHeight)
        return;
      const scale = 1 + scrollY / 500;
      landingImgValue.style.transform = `scale(${scale})`;
      landingImgValue.style.transformOrigin = 'center';
    })
  }

  const pageTransitionLeave = (cb: () => void) => {

    tl.set("html", {
      cursor: "wait"
    })

    tl.to(appLoader, {
      top: 0,
      duration: loadingScreenDuration,
      ease: 'hop',
      onComplete() {
        cb();
      }
    })
    tl.to(appLoaderHeader, {
      opacity: 1,
      y: 0,
      duration: loadingScreenDuration - .7,
      ease: "Power4.easeOut",
      delay: .05,
    }, "-=0.4")
  }

  const setElementPositionsToAnimate = () => {
    if (route.name === RouterNames.HOME)
      tl.set(appHeader, {
        paddingBlock: 4 * 4 + "px"
      })
    tl.set(oneTimeAnimate, {
      y: "50vh",
      opacity: 0.5
    })
    tl.set(landingImg, {
      scale: 1.8
    })
  }

  const pageTransitionEnter = () => {
    setElementPositionsToAnimate();
    tl.to(appLoaderHeader, {
      opacity: 1,
      y: 0,
      duration: loadingScreenDuration - .6,
      ease: "Power3.easeInOut"
    })
    tl.to(appLoader, {
      top: "-100%",
      duration: loadingScreenDuration,
      ease: "Power3.easeInOut"
    })
    tl.to(appLoaderHeader, {
      opacity: 0,
      duration: loadingScreenDuration - .9,
      ease: "linear"
    }, "-=1")
    tl.to(landingImg, {
      scale: 1.2,
      duration: loadingScreenDuration,
      ease: loadingScreenEase,
    }, "-=1.1")
    tl.to(appHeader, {
      y: 0,
      padding: 0,
      duration: 1,
      ease: "power4.inOut"
    }, ">-0.6")
    tl.to(landingImg, {
      scale: 1,
      duration: 1,
      ease: "power4.inOut"
    }, "<")
    tl.to(oneTimeAnimate, {
      y: "0vh",
      opacity: 1,
      duration: 1,
      ease: "power4.inOut"
    }, "<")

    tl.set("html", {
      cursor: "auto",
    }, "-=0.6")

    tl.set(appLoader, {
      top: "-100%",
    })
    tl.set(appLoaderHeader, {
      opacity: 0,
      y: 0
    })
  }


  const startPageAnimation = () => {
    onMounted(() => pageTransitionLeave(pageTransitionEnter));
  }

  return {
    registerZoomInImgOnScrollListener, startPageAnimation
  }
}
export const GScrollTo = (target: TweenVars['scrollTo']) => {
  gsap.to(window, {
    scrollTo: target,
    ease: "Power4.easeInOut",
    duration: 1
  })
}
export const toggleAppScrollToTopButtonVisibility = () => {
      const appScrollToTopButton = "#app-scroll-to-top-button";
  onMounted(() => {
    useEventListener(window, "scroll", useDebounceFn(() => {
      let canShowButton = false;
      if (window.scrollY > 400)
        canShowButton = true;
      gsap.to(appScrollToTopButton, {
        scale: canShowButton ? 1 : 0,
        duration: .5,
        ease: "Power4.easeInOut"
      })
    }, 500))
  })
}