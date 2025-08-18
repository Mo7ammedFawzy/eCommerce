import {isRef, unref, watch} from "vue";
import {useRoute} from "vue-router";
import {MaybeRefOrGetter} from "@vueuse/core";

export default class CommonUtils {
  static getImgUrl(imgPath: string) {

    const url = `../assets/imgs${imgPath}`;
    const base = import.meta.url;
    return new URL(url, base).href
  }

  static toSlug(title: string) {
    return title.replaceAll(" ", "-");
  }

  static slugToTitle(slug: string) {
    return slug.split("-").map(word => word[0].toUpperCase() + word.substring(1)).join(" ")
  }

  static onRouteChanged(cb: () => void) {
    const route = useRoute();
    watch(() => route.fullPath, () => {
      cb();
    })
  }

  static unrefs(obj: Record<string, MaybeRefOrGetter<any>>) {
    const objCopy = obj;
    for (const key in objCopy) {
      if (isRef(objCopy[key]))
        objCopy[key] = unref(objCopy[key])
    }
    return objCopy;
  }
}