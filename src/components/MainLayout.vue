<template>
  <section class="main-layout f f-fd-c">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component({})
export default class MainLayout extends Vue {}
</script>
<style lang="less">
@import "~styles/variables";

.main-layout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}
</style>
