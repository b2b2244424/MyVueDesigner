import ComponentProperty from './ComponentProperty';
export default class ComponentSchema {
  public title: string = "";
  public type: string = '';
  public properties:{[key:string]:ComponentProperty} = {};
}
