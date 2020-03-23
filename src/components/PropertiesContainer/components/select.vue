<template>
  <el-select
    class="properties-select"
    v-model="currentValue"
    size="mini"
    filterable
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in schemaEnum"
      :key="item.value"
      :label="item.text"
      :value="item.value"
    ></el-option>
  </el-select>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import ComponentMixins from "../../../mixins/ComponentMixins";
@Component({
  components: {}
})
export default class PropertiesSelected extends Mixins(ComponentMixins) {
  public schemaEnum: any[] = [];
  public unwatch: any = null;

  public formatSchema() {
    let schema: any = this.schema;
    // console.log("schema value:");
    // console.dir(this.schema);
    if (this.properties && this.properties.enum) {
      this.schemaEnum = this.properties.enum;
    } else if (schema.enum) {
      this.schemaEnum = schema.enum;
    } else if (schema.relation) {
      this.unwatch = this.$watch(`properties.${schema.relation}`, val => {
        this.currentValue = "";
        if (val) this.getData(schema, val);
      });
    } else if (schema.url) {
      this.getData(schema, "");
    }
  }

  public async getData(schema: any, id: string) {
    // console.log("async schema get data - 1: ", schema, id);
    await (this as any).$sleep(3000);
    this.schemaEnum = [
      { text: `${id || ""} 上 ${schema.description}`, value: 1 },
      { text: "右", value: 2 },
      { text: "下", value: 3 },
      { text: "左", value: 4 }
    ];
    // console.log("async schema get data - 2: ", schema);
  }
  public init() {
    this.formatSchema();
  }

  created() {
    this.init();
  }

  destroyed() {
    if (this.unwatch) this.unwatch();
  }
}
</script>

<style lang="less">
.properties-select {
}
</style>
