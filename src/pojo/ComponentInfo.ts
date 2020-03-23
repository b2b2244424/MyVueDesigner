import AttributeInfo from './AttributeInfo';
export default interface ComponentInfo {
  componentName: string;
  componentCode: string;
  componentAttrs: AttributeInfo[];
  components: ComponentInfo[];
}
