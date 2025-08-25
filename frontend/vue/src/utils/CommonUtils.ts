import {isRef, unref, watch} from "vue";
import {useRoute} from "vue-router";
import {MaybeRefOrGetter} from "@vueuse/core";
import ObjectChecker from "@/utils/ObjectChecker.ts";

export default class CommonUtils {
  static images = import.meta.glob('@/assets/imgs/**/*', {eager: true, import: 'default'});

  static getImgUrl(imgPath?: string): string | undefined {
    if (!imgPath)
      return;
    const base = "/src/assets/imgs";
    const image = this.images[base + imgPath];
    if (ObjectChecker.isString(image))
      return image;
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