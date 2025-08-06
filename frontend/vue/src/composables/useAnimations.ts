import {gsap} from "gsap"
import {CustomEase} from "gsap/CustomEase"
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import {useEventListener} from "@vueuse/core";
import {useTemplateRef} from "vue";
import TweenVars = gsap.TweenVars;

gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollToPlugin)
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function useAnimations() {

  const tl = gsap.timeline()
  const loadingScreenDuration = 1.2
  const loadingScreenEase = "Expo.easeInOut"
  const appLoader = "#app-loader"
  const appLoaderHeader = "[data-app-loader-header]";
  const appHeader = "#app-header";
  const landingImg = "[data-animate-landing-img]"
  const onceIn = `[data-animate-once-in]`

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
      ease: loadingScreenEase,
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

  function setElementPositionsToAnimate() {
    tl.set(onceIn, {
      y: "50vh"
    })
    tl.set(landingImg, {
      scale: 1.8
    })
  }

  //TODO:: if element doesn't exist exclude its animation tl.to
  const pageTransitionEnter = () => {
    setElementPositionsToAnimate();
    tl.to(appLoaderHeader, {
      opacity: 1,
      y: 0,
      duration: loadingScreenDuration - .6,
      ease: "Power3.easeInOut",
    })
    tl.to(appLoader, {
      top: "-100%",
      duration: loadingScreenDuration,
      ease: loadingScreenEase,
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
    tl.to(onceIn, {
      y: "0vh",
      opacity: 1,
      duration: 1,
      stagger: .05,
      ease: "Expo.easeOut",
    }, "-=0.8")
    tl.to(appHeader, {
      y: 0,
      padding: 0,
      duration: 0.8,
      ease: "power4.inOut"
    }, "-=0.5")
    tl.to(landingImg, {
      scale: 1,
      duration: 0.8,
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

  const scrollToTop = (show: boolean = false) => {
    gsap.to('#app-scroll-to-top-btn', {
      scale: show ? 1 : 0,
      duration: .5,
      ease: "Power4.easeInOut"
    })


  }
  const GScrollTo = (target: TweenVars['scrollTo']) => {
    gsap.to(window, {
      scrollTo: target,
      ease: "Power4.easeInOut",
      duration: 1
    })
  }
  return {
    registerZoomInImgOnScrollListener, scrollToTop,
    pageTransitionEnter, pageTransitionLeave, GScrollTo
  }
}