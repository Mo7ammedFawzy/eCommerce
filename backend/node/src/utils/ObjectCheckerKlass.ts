class ObjectCheckerKlass {

  static getInstance(): ObjectCheckerKlass {
    return new ObjectCheckerKlass();
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

  isAnyNotEmptyOrNull(...list: unknown[]): boolean {
    return !this.isAnyEmptyOrNull(list);
  }

  isAnyEmptyOrNull<T extends unknown>(...list: (T | null | undefined)[]) {
    return list.some(el => this.isEmptyOrNull(el));
  }
}

export const ObjectChecker = ObjectCheckerKlass.getInstance();