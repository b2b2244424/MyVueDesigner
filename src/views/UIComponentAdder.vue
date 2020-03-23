<template>
  <el-container>
    <el-form
      style="width:100%;"
      label-width="100"
      label-position="left"
      ref="dataForm"
      :model="item"
    >
      <el-row>
        <el-col :gutter="10" :span="5">
          <el-form-item label="组件名称" style="margin-left:10px;width:100%;">
            <el-input
              v-model="item.componentName"
              size="mini"
              autocomplete="off"
              required
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :gutter="10" :span="5">
          <el-form-item label="标签名称" style="margin-left:10px;width:100%;">
            <el-input
              v-model="item.tagName"
              size="mini"
              autocomplete="off"
              required
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :gutter="10" :span="5">
          <el-form-item label="库名称">
            <el-select v-model="item.libName" size="mini" required>
              <el-option
                v-for="lib in libs"
                :value="lib.value"
                :key="lib.value"
                :label="lib.text"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :gutter="10" :span="5">
          <el-form-item label="子类别">
            <el-select v-model="item.categoryName" required size="mini">
              <el-option
                v-for="category in categories"
                :value="category.value"
                :key="category.value"
                :label="category.text"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :gutter="10" :span="4">
          <el-button @click="generateCode" size="mini">生成组件代码</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :gutter="10" :span="6">
          <el-form-item label="属性名称">
            <el-input
              v-model="property.name"
              size="mini"
              autocomplete="off"
              required
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :gutter="10" :span="6">
          <el-form-item label="属性类型">
            <el-select
              v-model="property.type"
              required
              size="mini"
              @change="typeChanged"
            >
              <el-option
                v-for="type in types"
                :value="type.value"
                :key="type.value"
                :label="type.text"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :gutter="10" :span="6">
          <el-form-item label="默认值">
            <el-input
              v-model="property.defaultValue"
              size="mini"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :gutter="10" :span="6">
          <el-button @click.native.prevent="addProperty" size="mini"
            >添加属性</el-button
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            :key="tableKey"
            :data="item.properties"
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column label="属性名称" min-width="80px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="属性类型" min-width="80px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="默认值" min-width="80px" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.defaultValue }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              min-width="100"
              class-name="fixed-width"
            >
              <el-button
                type="danger"
                size="mini"
                @click="confirmDelete(row)"
                >{{ "删除" }}</el-button
              >
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row></el-row>
    </el-form>
  </el-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import ComponentSchema from "../types/ComponentSchema";
import ComponentAdderInfo from "../types/ComponentAdderinfo";
import ComponentPropertyInfo from "../types/ComponentPropertyInfo";
import { Form } from "element-ui";
import componentAdderConfigs from "../configs/componentAdderConfigs";
import FileUtils from "../utils/local/FileUtils";
@Component({})
export default class UIComponentAdder extends Vue {
  private item: ComponentAdderInfo = new ComponentAdderInfo();
  private libs: { text: string; value: string }[] = [
    {
      text: "HTML组件",
      value: "common"
    },
    {
      text: "element组件",
      value: "element"
    }
  ];
  private categories: { text: string; value: string }[] = [
    {
      text: "元素",
      value: "elements"
    },
    {
      text: "容器",
      value: "layout"
    }
  ];
  private types: { text: string; value: string }[] = [
    {
      text: "string",
      value: "string"
    },
    {
      text: "boolean",
      value: "boolean"
    },
    {
      text: "number",
      value: "number"
    }
  ];
  private property: ComponentPropertyInfo = new ComponentPropertyInfo();

  private typeChanged() {
    switch (this.property.type) {
      case "string":
        this.property.defaultValue = "";
        break;
      case "number":
        this.property.defaultValue = "0";
        break;
      case "boolean":
        this.property.defaultValue = "false";
        break;
    }
  }

  private addProperty() {
    (this.$refs.dataForm as Form).validate(async valid => {
      if (valid) {
        if (this.property.name === "") {
          this.$message({
            type: "error",
            message: "请输入合法的属性名"
          });
          return;
        }
        let result: any = this.item.properties.find(
          (e: ComponentPropertyInfo) => {
            return e.name === this.property.name;
          }
        );
        if (result) {
          this.$message({
            type: "error",
            message: "属性名重复"
          });
          return;
        } else {
          this.item.properties.push(this.property);
          this.property = new ComponentPropertyInfo();
        }
      }
    });
  }

  private confirmDelete(item: ComponentPropertyInfo) {
    this.$confirm("此操作将删除该属性, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.deleteProperty(item);
      })
      .catch(() => {});
  }

  private deleteProperty(property: ComponentPropertyInfo) {
    const index = this.item.properties.indexOf(property);
    this.item.properties.splice(index, 1);
  }

  private generateCode() {
    let path: string = componentAdderConfigs.path;
    let componentDir = `${path}/${this.item.libName}/${this.item.categoryName}/${this.item.componentName}`;
    FileUtils.mkdirsSync(componentDir);

    //创建css.json
    let css: { [key: string]: any } = {
      width: "100px",
      height: "100px"
    };
    FileUtils.writeFile(componentDir + "/css.json", JSON.stringify(css));

    //创建data.json
    let data: { [key: string]: any } = {};
    this.item.properties.forEach((e: ComponentPropertyInfo) => {
      switch (e.type) {
        case "string":
          data[e.name] = e.defaultValue;
          break;
        case "boolean":
          data[e.name] = Boolean(e.defaultValue);
          break;
        case "number":
          data[e.name] = Number(e.defaultValue);
          break;
      }
    });
    FileUtils.writeFile(componentDir + "/data.json", JSON.stringify(data));

    //创建schema.ts
    let propertyTemplate: string = "";
    this.item.properties.forEach((e: ComponentPropertyInfo) => {
      let format: string = "";
      switch (e.type) {
        case "string":
          format = "text";
          break;
        case "number":
          format = "number";
          break;
        case "boolean":
          format = "select";
          break;
      }

      propertyTemplate =
        propertyTemplate + e.name + ":{\r\n" + "description:" + "'" + "',\r\n";
      console.dir(propertyTemplate);
      propertyTemplate = propertyTemplate + "type:" + "'" + e.type + "',\r\n";
      console.dir(propertyTemplate);
      propertyTemplate = propertyTemplate + "format:" + "'" + format + "',\r\n";
      console.dir(propertyTemplate);
      let temp: string = e.type === "boolean" ? "enum: booleanList," : "";
      propertyTemplate = propertyTemplate + temp + "},\r\n";
      console.dir(propertyTemplate);
    });
    console.dir(propertyTemplate);
    let template: string = `
import ComponentSchema from '../../../../../types/ComponentSchema';
import booleanList from '../../../../../configs/booleanList';
const schema:ComponentSchema = {
  title: '${this.item.componentName}',
  type: 'object',
  properties: {
      ${propertyTemplate}
  },
};
export default schema;`;
    FileUtils.writeFile(componentDir + "/schema.ts", template);

    //创建index.vue
    let vueCode: string = this.createIndexVue();
    FileUtils.writeFile(componentDir + "/index.vue", vueCode);

    //创建generator.ts
    let generatorCode: string = this.createGeneratorTs();
    FileUtils.writeFile(componentDir + "/generator.ts", generatorCode);
  }

  private createGeneratorTs() {
    let template: string = `
import DragData from "../../../../../types/DragData";
import RegexUtils from "./../../../../../utils/RegexUtils";
import { IGenerator } from "../../../../../types/IGenerator";
function generatePropertyString(dragData: DragData) {
  let result: string = "";
  for (var key in dragData.defaultData) {
    let value: any = dragData.defaultData[key];
    if (!value) continue;
    if (typeof value === "number") {
      if (value === -1) {
        continue;
      } else {
        result = result + " " + key + "=" + '"' + value + '"';
      }
    } else if (typeof value === "string") {
      if (value === "") {
        continue;
      } else {
        result = result + " " + key + "=" + '"' + value + '"';
      }
    } else if (typeof value === "boolean") {
      if (!value) {
        continue;
      } else {
        result = result + " " + key;
      }
    }
  }
  return result;
}
export default function generate(
  dragData: DragData,
  type: string,
  generators: { [key: string]: IGenerator }
) {
  let result: string = "";
    let inner: string = dragData.defaultData["text"];
    let propertyString: string = generatePropertyString(dragData);

    let css: string = "";
    for (var cssKey in dragData.css) {
      css =
        css +
        RegexUtils.camelCaseToHyphens(cssKey) +
        ":" +
        dragData.css[cssKey] +
        ";";
    }
    result =
      "<${this.item.tagName} style=" +
      '"' +
      css +
      '"' +
      " " +
      propertyString +
      "></${this.item.tagName}>";
  return result;
}
    `;
    return template;
  }

  private createIndexVue(): any {
    let template: string = ``;
    template = template + "<template>\r\n";
    template = template + "<" + this.item.tagName + "\r\n";
    template = template + ':id="id"' + "\r\n";
    template = template + ':style="css"' + "\r\n";
    template =
      template + '@mousedown="innerMouseDown($event, id, $el)"' + "\r\n";
    template = template + '@mouseup="innerMouseUp"' + "\r\n";
    template = template + '@click="clickEvent"' + "\r\n";
    this.item.properties.forEach((e: ComponentPropertyInfo) => {
      template =
        template + ":" + e.name + "=" + "customData." + e.name + "\r\n";
    });
    template = template + ">\r\n";
    template = template + "<\/" + this.item.tagName + ">\r\n";
    template = template + "<\/template>\r\n";

    template = template + '<script lang="ts">\r\n';
    template =
      template +
      'import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";\r\n';
    template =
      template +
      'import ComponentPropertiesMixin from "../../../../../mixins/ComponentPropertiesMixin";\r\n';
    template =
      template +
      'import CommonElementMixins from "../../../../../mixins/CommonElementMixins";\r\n';
    template = template + "@Component({})\r\n";
    template =
      template +
      "export default class Span extends Mixins(CommonElementMixins) {}\r\n";
    template = template + "<\/script>\r\n";
    template = template + '<style lang="less">\r\n';
    template = template + "<\/style>\r\n";
    return template;
  }
}
</script>
<style scoped>
.flex_box_horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
