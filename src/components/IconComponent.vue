<template>
  <i
    :id="id"
    :class="iconClass"
    :style="{position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
  >{{content}}</i>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class IconComponent extends Vue {
  public id: string = new Date().getTime() + "";
  public iconClass: string = "el-icon-success";
  public content: string = "";
  public position: string = "absolute";
  public display: string = "block";
  public top: number = -5000;
  public left: number = -5000;
  public zIndex: string = "1";
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
      name: "图标",
      id: "IconComponent",
      icon: "el-icon-success"
    };
  }
}
</script>
