import {gsap} from "gsap"
import {CustomEase} from "gsap/CustomEase"
import {SplitText} from "gsap/SplitText";
import {ScrollToPlugin} from "gsap/ScrollToPlugin"
import {useDebounceFn, useEventBus, useEventListener} from "@vueuse/core";
import {onMounted, ref, useTemplateRef, watch} from "vue";
import {useRoute} from "vue-router";
import {RouterNames} from "@/router/routerNames.ts";
import {landingImgLoadKey} from "@/utils/constants";
import TweenVars = gsap.TweenVars;

gsap.registerPlugin(CustomEase)
gsap.registerPlugin(ScrollToPlugin)
gsap.registerPlugin(SplitText)
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function useAnimations() {

  const tl = gsap.timeline()
  const route = useRoute();
  const pageHasLoaded = ref(false);
  const landingImageHasLoaded = ref(false);
  const animateHasStarted = ref(false)

  const baseDuration = 1.2
  const baseEase = "power3.inOut"
  const smoothEase = "hop"

  const appLoader = "#app-loader"
  const appHeader = "#app-header";
  const landingImg = "[data-animate-landing-img]"
  const onceInAnimate = "[data-animate-once-in]"
  const appLoaderWrapper = "[data-app-loader-wrapper]";
  const appLoaderInner = "[data-app-loader-inner]";

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

  const initElementsPositions = () => {
    tl.set("html", {
      cursor: "wait"
    })
    if (route.name === RouterNames.HOME)
      tl.set(appHeader, {
        paddingBlock: 4 * 4 + "px"
      })
    tl.set(onceInAnimate, {
      y: "50vh",
      opacity: 0.5
    })
    tl.set(landingImg, {
      scale: 1.8
    })
  }

  const pageTransitionEnter = () => {
    animateHasStarted.value = true;
    initElementsPositions();
    tl.to(appLoaderInner, {
      y: 0,
      opacity: 1,
      duration: baseDuration / 2,
      ease: "back.inOut",
      delay: 1
    })
    tl.to(appLoader, {
      top: "-100%",
      duration: baseDuration,
      ease: baseEase
    })
    tl.to(landingImg, {
      scale: 1,
      duration: baseDuration,
      ease: baseEase
    }, "<")
    tl.to(onceInAnimate, {
      y: "0vh",
      opacity: 1,
      duration: baseDuration,
      ease: baseEase,
      stagger: 0.01
    }, "<")
    tl.to(appLoaderWrapper, {
      bottom: "-100%",
      duration: baseDuration,
      ease: baseEase
    }, "<")
    tl.to(appLoaderInner, {
      opacity: 0,
      duration: baseDuration - 0.1,
      ease: smoothEase
    }, "<")
    tl.to(appHeader, {
      y: 0,
      padding: 0,
      duration: baseDuration,
      ease: smoothEase
    })
    tl.to(landingImg, {
      scale: 1.098,
      duration: baseDuration,
      ease: smoothEase,
    }, "<")
    tl.set("html", {
      cursor: "auto",
    })
  }
  const startPageAnimation = () => {
    const bus = useEventBus(landingImgLoadKey);
    bus.on(() => {
      landingImageHasLoaded.value = true;
    })
    onMounted(() => {
      pageHasLoaded.value = true;
      setTimeout(() => {
        if (animateHasStarted.value)
          return;
        console.log('animate from timeout')
        pageTransitionEnter();
      }, 3500)
    });
    watch([pageHasLoaded, landingImageHasLoaded], () => {
      if (pageHasLoaded.value && landingImageHasLoaded.value && !animateHasStarted.value)
        pageTransitionEnter();
    })
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
    }, 350))
  })
}