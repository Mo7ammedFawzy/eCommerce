class ObjectCheckerKlass {
  private static _instance: ObjectCheckerKlass;

  static getInstance(): ObjectCheckerKlass {
    if (!this._instance)
      this._instance = new ObjectCheckerKlass();
    return this._instance;
  }

  isNotEmptyOrNull<T>(o: T | null | undefined): o is T {
    return !this.isEmptyOrNull(o);
  }

  isEmptyOrNull<T>(o: T | null | undefined):o is (null | undefined) {
    return this.isEmpty(o) || this.isNull(o);
  }

  isEmpty(o: unknown): boolean {
    if (Array.isArray(o) || typeof o === "string")
      return o.length === 0
    else if (o && typeof o == "object")
      return Object.keys(o).length === 0
    else
      return false;
  }

  isNotNull<T>(o: T | null | undefined): o is NonNullable<T> {
    return o !== null && o !== undefined;
  }

  isNull(o: unknown): o is null | undefined {
    return !this.isNotNull(o);
  }
}

export const ObjectChecker = ObjectCheckerKlass.getInstance();