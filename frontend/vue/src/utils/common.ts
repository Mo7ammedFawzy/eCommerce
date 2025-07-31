export default class CommonUtils {
    static getImgUrl(dir: string, imgId: string | number, imgType: string = 'png') {

        let url = `../assets/imgs/${dir}/${imgId}.${imgType}`;
        let base = import.meta.url;
        let href = new URL(url, base).href;
        return href
    }
}