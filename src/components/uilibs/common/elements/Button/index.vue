<template>
  <button
    :id="id1"
    :style="css1"
    @mousedown="innerMouseDown($event, id1, $el)"
    @mouseup="innerMouseUp"
    @click="clickEvent"
  >
    {{ customData1 && customData1.text ? customData1.text : "" }}
  </button>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import ComponentPropertiesMixin from "../../../../../mixins/ComponentPropertiesMixin";
import CommonElementMixins from "../../../../../mixins/CommonElementMixins";
@Component({})
export default class Button extends Mixins(CommonElementMixins) {}
</script>
<style lang="less">
.button {
}
</style>
