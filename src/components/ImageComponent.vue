<template>
  <img
    :id="id"
    :src="src"
    :title="title"
    :alt="alt"
    :style="{width: width + 'px', height: height + 'px',
            position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class ImageComponent extends Vue {
  public id: string = new Date().getTime() + "";
  public src: string =
    "http://www.chengxuunion.com/resources/images/common/logo.png";
  public title: string = "";
  public alt: string = "图片";
  public width: number = 266;
  public height: number = 50;

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
      name: "图片",
      id: "ImageComponent",
      icon: "el-icon-picture"
    };
  }
}
</script>
