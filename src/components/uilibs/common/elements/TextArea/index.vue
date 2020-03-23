<template>
  <textarea
    :id="id"
    :style="css"
    @mousedown="innerMouseDown($event, id, $el)"
    @mouseup="innerMouseUp"
    @click="clickEvent"
    :autofocus="customData.autofocus"
    :cols="customData.cols"
    :disabled="customData.disabled"
    :maxlength="customData.maxlength"
    :name="customData.name"
    :placeholder="customData.placeholder"
    :readonly="customData.readonly"
    :required="customData.required"
    :rows="customData.rows"
    :wrap="customData.wrap"
  >
  </textarea>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import ComponentPropertiesMixin from "../../../../../mixins/ComponentPropertiesMixin";
import CommonElementMixins from "../../../../../mixins/CommonElementMixins";
@Component({})
export default class TextArea extends Mixins(CommonElementMixins) {}
</script>
<style lang="less">
.button {
}
</style>
