<template>
  <div
    :id="id"
    :style="{
      position: position,
      display: display,
      top: top + 'px',
      left: left + 'px',
      zIndex: zIndex
    }"
  >
    <el-tag v-for="tag in tags" :key="tag.name" :type="tag.type">{{
      tag.name
    }}</el-tag>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class ImageComponent extends Vue {
  public id: string = new Date().getTime() + "";
  public tags: any = [
    { name: "标签一", type: "" },
    { name: "标签二", type: "success" },
    { name: "标签三", type: "info" },
    { name: "标签四", type: "warning" },
    { name: "标签五", type: "danger" }
  ];
  public position: string = "absolute";
  public display: string = "block";
  public top: number = -5000;
  public left: number = -5000;
  public zIndex: string = 1 + "";
  /**
   *  生成唯一性ID
   */
  public uniqueId(index: number) {
    this.id = this.define().id + new Date().getTime() + index;
    return this.id;
  }

  /**
   * 组件基础定义
   */
  public define() {
    return {
      name: "标签",
      id: "TagComponent",
      icon: "el-icon-tickets"
    };
  }
}
</script>
