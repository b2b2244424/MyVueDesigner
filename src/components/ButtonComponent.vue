<template>
  <el-button
    :id="id"
    :type="type"
    :size="size"
    :round="round"
    :circle="circle"
    :style="{position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
  >{{ content }}</el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class ButtonComponent extends Vue {
  public id: string = new Date().getTime() + "";
  public type: string = "primary";
  public size: string = "small";
  public round: boolean = false;
  public circle: boolean = false;
  public content: string = "主要按钮";

  public position: string = "absolute";
  public display: string = "block";
  public top: number = -5000;
  public left: number = -5000;
  public zIndex: number = 1;

  public uniqueId(index: number) {
    this.id = this.define().id + new Date().getTime() + index;
    return this.id;
  }

  /**
   * 组件基础定义
   */
  public define() {
    return {
      name: "按钮",
      id: "ButtonComponent",
      icon: "el-icon-goods"
    };
  }
}
</script>
