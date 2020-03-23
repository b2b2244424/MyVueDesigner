<template>
  <div
    :id="id"
    :style="{position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex}"
  >
    <el-input
      :type="type"
      v-model="input"
      :size="size"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      :style="{width: width + 'px', height: height + 'px'}"
    ></el-input>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({})
export default class InputComponent extends Vue {
  public id: string = new Date().getTime() + "";
  public type: string = "text";
  public input: string = "";
  public size: string = "small";
  public placeholder: string = "请输入";
  public clearable: boolean = false;
  public disabled: boolean = false;
  public width: number = 200;
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
      name: "输入框",
      id: "InputComponent",
      icon: "el-icon-picture"
    };
  }
}
</script>
