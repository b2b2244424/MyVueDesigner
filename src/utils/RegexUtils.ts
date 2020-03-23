export default class RegexUtils {
  public static camelCaseToHyphens(str: string) {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
}
