<template>
  <div style="position:relative;width:100%;height:100%;box-sizing:border-box;">
    <h2 style="position:absolute;display:block;top:44px;left:43px;">H2</h2>
    <a
      style="position:absolute;display:block;top:217px;left:136px;"
      target="_self"
      >链接</a
    >
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Mixins,
  Watch,
  Emit,
  Inject,
  Provide,
  Model
} from "vue-property-decorator";
@Component({
  components: {}
})
export default class Index extends Vue {}
</script>

<style scoped></style>
