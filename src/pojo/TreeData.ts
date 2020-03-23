export default class TreeData<T> {
  public id: string = '';
  public label: string = '';
  public data!: T;
  public children: TreeData<T>[] = [];
}
