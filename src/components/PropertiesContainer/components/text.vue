<template>
  <input
    class="properties-text"
    type="text"
    :readonly="readonly"
    v-model="currentValue"
  />
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import ComponentMixins from "../../../mixins/ComponentMixins";
@Component({
  components: {}
})
export default class PropertiesText extends Mixins(ComponentMixins) {}
</script>

<style lang="less">
.properties-text {
  min-width: 30px;
  height: 23px;
  // background: #545454;
  border: 1px #2e2e2e solid;
  // color: #fff;
  line-height: 23px;
  padding: 0 5px;
}
</style>
