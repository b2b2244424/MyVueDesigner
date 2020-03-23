<template>
  <div
    :id="id1"
    @mousedown="innerMouseDown($event, id, $el)"
    @mouseup="innerMouseUp"
    @dragover="onDragOver"
    @drop="onDrop"
    :style="css1"
    @click="clickEvent"
  >
    <template v-for="(item, index) in components">
      <component
        :is="loadComponent(item.libName, item.categoryName, item.componentName)"
        :id="item.id"
        :css="item.css"
        :customData="item.defaultData"
        :components="item.children"
        :mouseDown="emptyMouseDown"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import ComponentLoader from "../../../../../mixins/ComponentLoader";
import CommonContainerMixins from "../../../../../mixins/CommonContainerMixins";
import DragData from "../../../../../types/DragData";
import LocalEventInfo from "../../../../../types/LocalEventInfo";
import BusEvents from "../../../../../events/BusEvents";
import ComponentType from "../../../../../types/ComponentType";
@Component
export default class Div extends Mixins(
  CommonContainerMixins,
  ComponentLoader
) {
  public onDragOver(event: any) {
    console.log("Div.onDragOver");
  }

  public onDrop(event: any) {
    event.stopPropagation();
    console.log("Div.onDrop");
    let dragData: DragData = JSON.parse(event.dataTransfer.getData("Text"));
    (this as any).$eventBus.$emit(BusEvents.COMPONENT_ADDED, this.id, dragData);
    // setTimeout(() => {
    //   this.refreshChildren();
    // }, 20);
  }
}
</script>
<style scoped></style>
