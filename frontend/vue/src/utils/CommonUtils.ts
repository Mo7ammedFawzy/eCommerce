import {watch} from "vue";
import {useRoute} from "vue-router";

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

  static deleteEmptyValues(obj: object) {
    if (!obj)
      return;
    for (const key of Object.keys(obj)) {
      if (!obj[key])
        delete obj[key];
    }
  }
}