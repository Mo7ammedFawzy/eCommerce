export default class CommonUtils {
  static getImgUrl(imgPath: string) {

    const url = `../assets/imgs${imgPath}`;
    const base = import.meta.url;
    return new URL(url, base).href
  }
}