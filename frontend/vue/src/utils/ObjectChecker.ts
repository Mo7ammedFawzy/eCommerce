export default class ObjectChecker {

  constructor(public obj: any) {
    this.obj = obj;
  }

  // TODO:: check chaining
  static check(o: any) {
    return new ObjectChecker(o);
  }

  public static isString(o: any): o is string {
    return typeof o === "string";
  }

  static isNumber(o: any): o is number {
    return typeof o === "number";
  }

  static isNotEmptyOrNull<T>(o: T | null | undefined): o is T {
    if (o == null)
      return false;
    else if (!o)
      return false;
    else if (this.isString(o) && !o.length)
      return false
    return true;
  }

  static isEmptyObject(o: object) {
    if (!o)
      return true
    else
      return Object.keys(o).length === 0;
  }

  static isLastElement(element: any, array: any[]) {
    return array[array.length - 1] === element;
  }


}