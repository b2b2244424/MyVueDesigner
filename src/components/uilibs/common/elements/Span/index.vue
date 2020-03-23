<template>
  <span
    :id="id"
    :style="css"
    @mousedown="innerMouseDown($event, id, $el)"
    @mouseup="innerMouseUp"
    @click="clickEvent"
  >
    {{ customData && customData.text ? customData.text : "" }}
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import ComponentPropertiesMixin from "../../../../../mixins/ComponentPropertiesMixin";
import CommonElementMixins from "../../../../../mixins/CommonElementMixins";
@Component({})
export default class Span extends Mixins(CommonElementMixins) {}
</script>
<style lang="less">
.button {
}
</style>
