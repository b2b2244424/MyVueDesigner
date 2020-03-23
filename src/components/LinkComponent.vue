<template>
  <a
    :id="id"
    :href="href"
    :target="target"
    :title="title"
    :style="{fontSize: fontSize + 'px', color: color, textDecoration: textDecoration,
            position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
  >{{ content }}</a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class InputComponent extends Vue {
  public id: string = new Date().getTime() + "";
  public href: string = "http://www.chengxuunion.com";
  public target: string = "_blank";
  public title: string = "编程之道";
  public content: string = "编程之道";

  public fontSize: number = 12;
  public color: string = "#000";
  public textDecoration: string = "underline";
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
  define() {
    return {
      name: "链接",
      id: "LinkComponent",
      icon: "el-icon-goods"
    };
  }
}
</script>
