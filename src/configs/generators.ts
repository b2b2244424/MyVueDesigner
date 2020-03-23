import ComponentConfig from "../types/ComponentConfig";
import configs from "./componentConfigs";
import ComponentCategoryInfo from "../types/ComponentCategoryInfo";
import ComponentInfo from "../types/ComponentInfo";
import { IGenerator } from "../types/IGenerator";
import GeneratorWrapper from "../types/GeneratorWrapper";
const generators: { [key: string]: IGenerator } = {};
configs.forEach((e: ComponentConfig) => {
  e.categories.forEach((e1: ComponentCategoryInfo) => {
    e1.components.forEach((e2: ComponentInfo) => {
      let key: string = `../components/uilibs/${e.name}/${e1.name}/${e2.name}/generator.ts`;
      let temp: Function = require(`../components/uilibs/${e.name}/${e1.name}/${e2.name}/generator.ts`)
        .default;
      let gw: GeneratorWrapper = new GeneratorWrapper(temp);
      generators[key] = gw;
    });
  });
});

export default generators;
