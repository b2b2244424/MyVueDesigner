<template>
  <div
    :id="id"
    :style="{width: width,boxSizing:boxSizing, backgroundColor: backgroundColor,
            border: border, position: position, display: display, top: top + 'px', left: left + 'px', zIndex: zIndex,display:display,flexDirection:flexDirection,flexWrap:flexWrap,'-webkit-flex-wrap':flexWrap,justifyContent:justifyContent,alignItems:alignItems,minHeight:minHeight,minWidth:minWidth,maxWidth:maxWidth,overflow:overflow}"
    class="flex_box_horizontal"
    @dragover="allowDrop"
    @drop="drop"
  >{{ content }}</div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import componentManagement from "./componentManagement";
import HorizontalLayout from "./HorizontalLayout.vue";
@Component
export default class VerticalLayout extends HorizontalLayout {
  mounted() {
    this.flexDirection = "column";
  }

  /**
   * 组件基础定义
   */
  public define() {
    return {
      name: "垂直盒子",
      id: "VerticalLayout",
      icon: "el-icon-goods"
    };
  }
}
</script>
<style scoped>
.flex_box_horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
