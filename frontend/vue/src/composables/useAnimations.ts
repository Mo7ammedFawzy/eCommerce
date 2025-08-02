import {gsap} from "gsap"
import {CustomEase} from "gsap/CustomEase"
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import {breakpointsTailwind, useBreakpoints, useEventListener} from "@vueuse/core";
import {useTemplateRef} from "vue";
import TweenVars = gsap.TweenVars;

gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollToPlugin)
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function useAnimations() {

  const tl = gsap.timeline()
  const breakpoints = useBreakpoints({
    ...breakpointsTailwind,
    md: 900
  });
  const loadingScreenDuration = 1.2
  const loadingScreenEase = "Expo.easeInOut"
  const loader = "#app-loader"
  const loaderText = loader + ' h1'
  const appHeader = "#app-header";
  const defaultGsapOptions: GSAPTweenVars = {
    duration: .6,
    ease: "hop"
  }
  const landingImg = useTemplateRef<HTMLImageElement>("imgRef")

  function getYValue(): number {
    if (breakpoints.isGreaterOrEqual("md"))
      return -100;
    else
      return 100;
  }

  const registerZoomInImgOnScrollListener = () => {
    const homeLandingSection = useTemplateRef<HTMLElement>("sectionHomeLandingRef")
    useEventListener(window, "scroll", () => {
      const section = homeLandingSection.value
      if (!section)
        return;
      const landingImgValue = landingImg.value;
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

  function showHeader() {
    tl.to(appHeader, {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      ...defaultGsapOptions,
      onComplete() {
        tl.to(appHeader, {
          padding: 0,
          ...defaultGsapOptions
        })
      }
    })
  }

  function hideHeader() {
    tl.to(appHeader, {
      height: 0,
      y: getYValue(),
      pointerEvents: "none",
      ...defaultGsapOptions,
    }, "-=.5")
  }

  const toggleAppHeader = () => {
    if (window.scrollY >= 10)
      showHeader();
    else
      hideHeader();
  }


  function getLoaderCoordinate(): keyof TweenVars {
    if (breakpoints.isGreaterOrEqual("md"))
      return 'top'
    else
      return 'bottom'
  }

  const pageTransitionLeave = (cb: () => void) => {

    tl.set("html", {
      cursor: "wait"
    })


    tl.to(loader, {
      [getLoaderCoordinate()]: 0,
      duration: loadingScreenDuration,
      ease: loadingScreenEase,
      onComplete() {
        cb();
      }
    })
    tl.to(loaderText, {
      opacity: 1,
      y: 0,
      duration: loadingScreenDuration - .7,
      ease: "Power4.easeOut",
      delay: .05,
    }, "=-.4")
  }

  const pageTransitionEnter = () => {
    const landingImg = "[data-animate-landing-img]"
    const onceIn = `[data-animate-once-in]`

    tl.to(loaderText, {
      opacity: 1,
      y: 0,
      duration: loadingScreenDuration - .6,
      ease: "Power3.easeInOut",
    })

    tl.to(loader, {
      [getLoaderCoordinate()]: "-100%",
      duration: loadingScreenDuration,
      ease: loadingScreenEase,
    }) // 1

    tl.to(loaderText, {
      opacity: 0,
      duration: loadingScreenDuration - .9,
      ease: "linear"
    }, "=-1")
    tl.to(landingImg, {
      scale: 1,
      duration: loadingScreenDuration,
      ease: loadingScreenEase,
    }, "=-1.1")
    tl.to(onceIn, {
      y: "0vh",
      opacity: 1,
      duration: 1,
      stagger: .05,
      ease: "Expo.easeOut",
    }, "=-.8")
    toggleAppHeader();

    tl.set("html", {
      cursor: "auto",
    }, "=-.6")

    tl.set(loader, {
      [getLoaderCoordinate()]: "-100%",
      top: 'auto'
    })
    tl.set(loaderText, {
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
    pageTransitionEnter, pageTransitionLeave,
    showHeader, hideHeader,
    GScrollTo
  }
}