<template>
  <span
    :id="id"
    :title="title"
    :style="{fontSize: fontSize + 'px', lineHeight: lineHeight + 'px', color: color, width: width + 'px', height: height + 'px',
                position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
  >{{ content }}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class ImageComponent extends Vue {
  public id: string = new Date().getTime() + "";
  public title: string = "文本";
  public content: string = "文本";
  public fontSize: number = 14;
  public lineHeight: number = 14;
  public color: string = "#000";
  public width: string = "";
  public height: string = "";
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
      name: "文本",
      id: "TextComponent",
      icon: "el-icon-edit-outline"
    };
  }
}
</script>
