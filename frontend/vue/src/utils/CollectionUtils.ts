import ObjectChecker from "@/utils/ObjectChecker.ts";

export default class CollectionUtils {

  static deleteEmptyValues(obj: Record<string, any>) {
    for (const key of Object.keys(obj)) {
      if (ObjectChecker.isEmptyOrNullish(obj[key]))
        delete obj[key];
    }
  }

  static findInArray<T>(el: T, array: T[]): T | undefined {
    return array.find(elInArray => elInArray === el);
  }

  static findInArrayWithKey<T extends Record<string, any>>(el: any, array: T[], key: string): T | undefined {
    return array.find(obj => {
      if (obj[key] === el)
        return obj[key] === el
      else
        return false
    });
  }

  static removeFromArrayWithKey<T>(toDelete: T, array: any[], key: string): void {
    const indexOfDeleted = array.findIndex((item) => item[key] === toDelete);
    array.splice(indexOfDeleted, 1);
  }
}