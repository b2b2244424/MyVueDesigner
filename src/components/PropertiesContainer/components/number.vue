<template>
  <input
    class="properties-number"
    type="number"
    :readonly="readonly"
    v-model="currentValue"
  />
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue, Watch } from "vue-property-decorator";
import ComponentMixins from "../../../mixins/ComponentMixins";
@Component({
  components: {}
})
export default class PropertiesNumber extends Mixins(ComponentMixins) {
  get minimum() {
    return this.schema.minimum || 0;
  }

  @Watch("constraint")
  onConstraintChanged() {
    this.init();
  }

  public init() {
    this.$nextTick(() => {
      const { $el, schema, constraint } = this;
      let { minimum } = this;
      let { maximum } = schema;
      if (constraint) {
        if (constraint.min > minimum) minimum = constraint.min;
        if (!maximum) maximum = constraint.max;
        if (maximum && constraint.max < maximum) maximum = constraint.max;
      }
      $el.setAttribute("min", minimum);
      if (maximum) $el.setAttribute("max", maximum);
    });
  }

  mounted() {
    this.init();
  }
}
</script>

<style lang="less">
.properties-number {
  min-width: 30px;
  height: 23px;
  // background: #545454;
  border: 1px #2e2e2e solid;
  // color: #fff;
  line-height: 23px;
  padding: 0 5px;
}
</style>
