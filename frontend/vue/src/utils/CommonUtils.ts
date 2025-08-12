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

  static findInArray<T>(el: T, array: T[]): T | undefined {
    return array.find(elInArray => elInArray === el);
  }

  static findInArrayWithKey<T>(el?: any, array: T[], key: string): T | undefined {
    return array.find(obj => obj[key] === el);
  }

  static removeFromArrayWithKey<T>(toDelete: T, array: any[], key: string): void {
    const indexOfDeleted = array.findIndex((item) => item[key] === toDelete);
    array.splice(indexOfDeleted, 1);
  }
}