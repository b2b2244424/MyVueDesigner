export default class Tools {
  public static objectToMap(obj: any): Map<string, any> {
    let map:Map<string,any>=new Map<string,any>();
    if(obj){
      Object.keys(obj).forEach((key:string)=>{
        map.set(key,obj[key]);
      });
    }
    return map;
  }
}
