<template>
  <div
    class="properties-cssunit f f-ai-c f-fw-w"
    :class="{ pointerEvents: schema && schema.readonly }"
  >
    <span
      class="properties-cssunit-title f-fs-0"
      v-if="title && title !== ''"
      >{{ title }}</span
    >
    <div class="properties-cssunit-line f-fb-percent-100 f">
      <input
        class="properties-cssunit-input"
        type="number"
        v-model="cssunit.value"
        size="mini"
        controls-position="right"
        :placeholder="placeholder"
        :min="schema.minimum"
        :max="schema.maximum"
        @input="val => change2('value', val)"
      />
      <el-select
        class="properties-cssunit-unit f-fs-0"
        v-model="cssunit.unit"
        size="mini"
        @change="val => change2('unit', val)"
        v-if="hasEnum"
      >
        <el-option
          v-for="item in schema.enum"
          :value="item.value"
          :key="item.value"
          :label="item.text"
        />
      </el-select>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue, Watch } from "vue-property-decorator";
import ComponentMixins from "../../../mixins/ComponentMixins";
@Component({
  components: {}
})
export default class Cssunit extends Mixins(ComponentMixins) {
  get hasEnum() {
    return !!this.schema.enum;
  }

  public cssunit: { [key: string]: any } = {
    value: 0,
    unit: "px"
  };

  @Watch("title", { deep: true, immediate: true })
  onTitleChanged() {
    // console.log("title:" + this.title);
  }

  @Watch("value", { deep: true, immediate: true })
  onValueChanged() {
    this.cssunit = {
      value: 0,
      unit: "px"
    };
    if (this.value) {
      const currentValue: string = this.value + "";
      this.cssunit.value = Number(currentValue.replace(/[a-z|A-Z|%]+$/gi, ""));
      if (this.hasEnum)
        this.cssunit.unit = currentValue.replace(/[-+]?[0-9]*\.?[0-9]+/gi, "");
    }
  }

  public change2(key: string, val: any) {
    console.log("cssunit change2,key:" + key + ";val:" + val);
    this.$emit(
      "change",
      this.hasEnum
        ? `${this.cssunit.value}${this.cssunit.unit}`
        : `${this.cssunit.value}`
    );
  }
}
</script>

<style lang="less">
@import "../../../styles/variables";

.properties-cssunit {
  &-title {
    height: 25px;
    line-height: 1;
  }
  &-line {
    border: 1px solid @primary-border-color;
    border-radius: 3px;
    overflow: hidden;
  }
  &-input {
    width: auto;
    border-color: transparent;
    border-radius: 0;
  }
  &-unit {
    width: 45px;
    &.el-select {
      .el-input {
        &__suffix {
          right: 0;
          transform: scale(0.8);
        }
      }
    }
  }
}
</style>
