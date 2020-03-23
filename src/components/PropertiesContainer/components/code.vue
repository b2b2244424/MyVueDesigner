<template>
  <div class="code">
    <!-- codemirror -->
    <codemirror v-model="code" :options="cmOption"></codemirror>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import ComponentMixins from "../../../mixins/ComponentMixins";
import { codemirror } from "vue-codemirror";

import "codemirror/lib/codemirror.css";
// language
import "codemirror/mode/css/css.js";
// theme css
import "codemirror/theme/darcula.css";
// require active-line.js
import "codemirror/addon/selection/active-line.js";
@Component({
  components: {
    codemirror
  }
})
export default class Code extends Mixins(ComponentMixins) {
  public cmOption: any = {
    tabSize: 2,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: "text/css",
    theme: "darcula"
  };

  get code() {
    return this.value;
  }

  set code(val: any) {
    this.$emit("update:value", val);
  }
}
</script>
<style lang="less">
.code {
  min-height: 100px;
  text-align: left;
}
</style>
