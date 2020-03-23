export default class LocalStorageUtils {
  static setValue<T>(key: string, t: T): void {
    let temp: string = JSON.stringify(t);
    // console.group("setValue");
    // console.log("key:" + key + ";value:" + temp);
    // console.groupEnd();
    window.localStorage.setItem(key, temp);
  }

  static getValue<T>(key: string): T | null {
    let temp: string | null = window.localStorage.getItem(key);
    let value: string = "";
    if (typeof temp === "undefined" || temp === null) {
      value = "{}";
    } else {
      value = temp;
    }
    let item: T | null;
    try {
      item = JSON.parse(value);
    } catch (err) {
      item = null;
    }

    return item;
  }

  static getValue2<T>(key: string, defaultValue: T): T | null {
    let temp: string | null = window.localStorage.getItem(key);
    let value: string = "";
    if (typeof temp === "undefined" || temp === null) {
      value = "";
    } else {
      value = temp;
    }
    // console.log("getValue:" + value);
    let item: T | null;
    try {
      item = JSON.parse(value);
    } catch (err) {
      item = defaultValue;
    }

    return item;
  }

  static remove<T>(key: string): void {
    window.localStorage.removeItem(key);
  }

  static setString(key: string, t: string) {
    window.localStorage.setItem(key, t);
  }

  static getString(key: string) {
    return window.localStorage.getItem(key);
  }
}
