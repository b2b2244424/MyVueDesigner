<template>
  <div class="box-shadow-panel">
    <ul class="f f-fw-w">
      <li class="w-percent-30">
        <el-color-picker
          v-model="boxShadow.color"
          size="small"
          recommend
          @change="val => change3('color', val)"
        />
      </li>
      <li class="w-percent-50">
        <el-switch
          size="small"
          v-model="boxShadow.inset"
          @change="val => change3('inset', val)"
        />（inset）
      </li>
      <li
        class="w-percent-25"
        v-for="(val, index) in boxShadow.vars"
        :key="index"
      >
        <el-input
          type="number"
          v-model="boxShadow.vars[index]"
          size="mini"
          :placeholder="$i18n(`designer.properties.shadow.${index}`)"
          style="width: auto"
          @input="val => change2('vars', val, index)"
        />
        <p style="margin-top: 10px;text-align: center;">
          {{ $i18n(`designer.properties.shadow.${index}`) }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue, Watch } from "vue-property-decorator";
import PanelMixin from "../../../mixins/PanelMixin";
import ComponentLoader2 from "../../../mixins/ComponentLoader2";
@Component({
  components: {}
})
export default class BoxShadowPanel extends Mixins(
  PanelMixin,
  ComponentLoader2
) {
  public boxShadow: { [key: string]: any } = {};

  @Watch("data", { deep: true, immediate: true })
  onDataChanged() {
    // console.log("onDataChanged");
    let boxShadow: any = this.data.boxShadow;
    const vars: number[] = [0, 0, 0, 0];
    if (boxShadow) {
      const inset = /inset/.test(boxShadow);
      const splitVal = boxShadow.replace("inset ", "").split(" ");
      const last = splitVal.length - 1;
      const color = splitVal[last];
      for (let i = 0; i < last; i++) {
        vars[i] = parseInt(splitVal[i], 10);
      }
      this.boxShadow = {
        color: color,
        inset: inset,
        vars: vars
      };
    } else {
      this.boxShadow = {
        color: "#000",
        inset: false,
        vars: vars
      };
    }
  }
  // get boxShadow() {
  //   const { boxShadow } = this.data;
  //   const vars = [0, 0, 0, 0];
  //   if (!boxShadow) {
  //     return {
  //       color: "#000",
  //       inset: false,
  //       vars
  //     };
  //   }
  //   const inset = /inset/.test(boxShadow);
  //   const splitVal = boxShadow.replace("inset ", "").split(" ");
  //   const last = splitVal.length - 1;
  //   const color = splitVal[last];
  //   for (let i = 0; i < last; i++) {
  //     vars[i] = parseInt(splitVal[i], 10);
  //   }
  //   return {
  //     color,
  //     inset,
  //     vars
  //   };
  // }
  public change2(key: string, value: any, index: any) {
    // if (value === "" || value === undefined || value === null) return;
    // const vars = this.boxShadow.vars.slice();
    // let newVal = value;
    // if (key === "vars") {
    //   vars[index] = value;
    //   newVal = vars;
    // }
    // const boxShadow = {
    //   ...this.boxShadow,
    //   [key]: newVal
    // };
    this.$emit(
      "change",
      "boxShadow",
      `${this.boxShadow.inset ? "inset " : ""}${this.boxShadow.vars[0]}px ${
        this.boxShadow.vars[1]
      }px ${this.boxShadow.vars[2]}px ${this.boxShadow.vars[3]}px ${
        this.boxShadow.color
      }`
    );
  }

  public change3(key: string, value: any) {
    this.$emit(
      "change",
      "boxShadow",
      `${this.boxShadow.inset ? "inset " : ""}${this.boxShadow.vars[0]}px ${
        this.boxShadow.vars[1]
      }px ${this.boxShadow.vars[2]}px ${this.boxShadow.vars[3]}px ${
        this.boxShadow.color
      }`
    );
  }
}
</script>
<style lang="less">
.box-shadow-panel {
  > ul {
    > li {
      padding: 4px;
    }
  }
}
</style>
