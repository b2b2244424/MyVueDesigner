<template>
  <div
    :id="id"
    :style="{width: width + 'px', height: height + 'px', backgroundColor: backgroundColor,
            border: border, position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
  >{{ content }}</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class DivComponent extends Vue {
  public id: string = new Date().getTime() + "";
  public width: number = 300;
  public height: number = 300;
  public backgroundColor: string = "#eee";
  public border: string = "";
  public content: string = "";

  public position: string = "absolute";
  public display: string = "block";
  public top: number = -5000;
  public left: number = -5000;
  public zIndex: string = "1";
  public uniqueId(index: number) {
    this.id = this.define().id + new Date().getTime() + index;
    return this.id;
  }

  /**
   * 组件基础定义
   */
  public define() {
    return {
      name: "矩形块",
      id: "DivComponent",
      icon: "el-icon-goods"
    };
  }
}
</script>
