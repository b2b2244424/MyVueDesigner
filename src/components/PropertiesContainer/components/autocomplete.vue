<template>
  <el-autocomplete
    v-model="currentValue"
    :readonly="readonly"
    size="mini"
    placeholder="请输入内容"
    :fetch-suggestions="querySearch"
  ></el-autocomplete>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import ComponentMixins from "../../../mixins/ComponentMixins";
export default class Autocomplete extends Mixins(ComponentMixins) {
  public schemaEnum: any[] = [];

  public querySearch(queryString: string, cb: any) {
    const results = queryString
      ? this.schemaEnum.filter(this.createFilter(queryString))
      : this.schemaEnum;
    // 调用 callback 返回建议列表的数据
    cb(results);
  }

  public createFilter(queryString: string) {
    return (option: any) =>
      option.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
  }

  public init() {
    this.schemaEnum = this.schema.enum;
  }

  created() {
    this.init();
  }
}
</script>
