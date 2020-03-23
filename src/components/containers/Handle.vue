<template>
  <div
    class="handle"
    :class="[
      `handle-${direction}`,
      {
        collapse: !visiable
      }
    ]"
    :style="style"
    ref="handle"
  >
    <span class="handle-bar" @click="handleEvent"
      ><i class="el-icon-arrow-left"></i
    ></span>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Handle extends Vue {
  @Prop({ default: true })
  public visible: boolean = true;
  @Prop({ default: "left" })
  public direction: string = "left";
  @Prop({ default: 45 })
  public offset: number = 45;

  public style: any = {};

  @Watch("visible")
  visibleChanged() {
    this.repaint();
  }

  public handleEvent() {
    this.$emit("update:visible", !this.visible);
  }

  public repaint() {
    const offset: number = this.visible
      ? 0
      : this.offset - (this.$refs.handle as any).offsetWidth;
    if (this.direction === "left") {
      this.style = {
        marginLeft: `${offset}px`,
        transition: "margin-left 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
      };
    } else if (this.direction === "right") {
      this.style = {
        marginRight: `${offset}px`,
        transition: "margin-right 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
      };
    }
  }
  mounted() {
    this.$nextTick(() => {
      this.repaint();
    });
  }
}
</script>

<style lang="less">
@import "~styles/variables";

.handle {
  position: relative;
  &-bar {
    position: absolute;
    top: 50%;
    z-index: 10;
    width: 12px;
    height: 50px;
    line-height: 50px;
    color: #bbdaef;
    background: #2c6a95;
    margin-top: -25px;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    transition: left 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }
  &-left {
    // margin-right: 12px;
    .handle-bar {
      right: -11px;
    }
  }
  &-right {
    // margin-left: 12px;
    .handle-bar {
      left: -11px;
      transform: rotate(180deg);
    }
  }
  &-left.collapse .handle-bar i {
    transform: rotate(180deg);
  }
  &-right.collapse .handle-bar i {
    transform: rotate(180deg);
  }
}
</style>
