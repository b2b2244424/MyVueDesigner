import DragData from "../types/DragData";
import generators from "../configs/generators";
import { IGenerator } from "../types/IGenerator";
export default class VueFileGenerator {
  private generateTemplate(e: DragData) {
    let key: string = `../components/uilibs/${e.libName}/${e.categoryName}/${e.componentName}/generator.ts`;
    let type: string = "template";
    let generator: IGenerator = generators[key];
    console.dir(generator);
    let templateString = generator.generate(e, type, generators);
    return `
<template>
  ${templateString}
</template>`;
  }

  private generateCode(e: DragData) {
    return `
<script lang="ts">
import { Component, Prop, Vue, Mixins,Watch,Emit,Inject,Provide,Model } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Index extends Vue {

}
</script>
`;
  }

  private generateStyle(e: DragData) {
    return `
<style scoped>
</style>`;
  }

  public generate(e: DragData) {
    let template: string = this.generateTemplate(e);
    let code: string = this.generateCode(e);
    let style: string = this.generateStyle(e);
    return `
    ${template}
    ${code}
    ${style}
    `;
  }

  public generateHtml(e: DragData) {
    let key: string = `../components/uilibs/${e.libName}/${e.categoryName}/${e.componentName}/generator.ts`;
    let type: string = "html";
    let generator: IGenerator = generators[key];
    console.dir(generator);
    let templateString = generator.generate(e, type, generators);
    let htmlTemplate: string = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>myvuedesigner2</title>
  </head>
  <body>
    ${templateString}
  </body>
</html>
`;
    return htmlTemplate;
  }
}
