export default class CommonUtils {
  static getImgUrl(dir: string, imgId: string | number, imgType: string = 'png') {

    let url = `../assets/imgs/${dir}/${imgId}.${imgType}`;
    let base = import.meta.url;
    return new URL(url, base).href
  }

  static getPropertyStyle(property: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(property)
      .trim();
  }
}