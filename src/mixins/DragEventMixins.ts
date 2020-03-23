import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {}
})
export default class DragEventMixins extends Vue {
  public isStage: boolean = false;
  public dragoverBox: any = {
    target: null,
    componentId: "",
    rect: {},
    hint: "这是测试DragOverBox",
    placement: "inside",
    style: {
      // top: "100px",
      // left: "100px",
      // width: "200px",
      // height: "200px",
      // position: "absolute",
      // display: "block"
    }
  };

  public repaintDragoverBox() {
    if (!this.dragoverBox.target) return;
    this.$nextTick(() => {
      const containerRect: DOMRect = this.$el.getBoundingClientRect() as DOMRect;
      const rect = this.dragoverBox.target.getBoundingClientRect();
      const { scrollTop, scrollLeft } = this.$el;
      const top = Math.floor(rect.top - containerRect.top + scrollTop);
      const left = Math.floor(rect.left - containerRect.left + scrollLeft);
      this.dragoverBox.style = {
        display: "block",
        width: `${Math.floor(rect.width)}px`,
        height: `${Math.floor(rect.height)}px`,
        top: `${top}px`,
        left: `${left}px`
      };
    });
  }

  // public ondragover(e: DragEvent) {
  //   e.preventDefault();
  //   if (!this.$el.contains((e as any).target)) {
  //     this.dragoverBox = {
  //       target: null,
  //       componentId: "",
  //       rect: {},
  //       hint: "",
  //       placement: "inside",
  //       style: {}
  //     };
  //     return;
  //   }
  //   const targerNode = (e as any).target.closest(".layout-container");
  //   if (!targerNode) return;

  //   if (this.dragoverBox.target !== targerNode) {
  //     this.dragoverBox.target = targerNode;

  //     this.isStage = targerNode.classList.contains("editor-container-screen");
  //     this.dragoverBox.componentId = this.dragoverBox.target.dataset.componentId;
  //     this.dragoverBox.rect = this.dragoverBox.target.getBoundingClientRect();
  //   }

  //   // 判断点与矩形相交，可设置偏移量，区分同级插入或子级插入以及提示信息
  //   if (this.dragoverBox.target) {
  //     const { componentName } = this.dragoverBox.target.dataset;

  //     const offset = {
  //       x: 0,
  //       y: 15
  //     };

  //     if (
  //       componentName !== "NestedLayoutContainer" &&
  //       componentName !== "PositionLayoutContainer"
  //     ) {
  //       offset.y = this.dragoverBox.rect.height / 2;
  //     }

  //     const point = {
  //       x: e.clientX,
  //       y: e.clientY
  //     };
  //     // up
  //     const rect1 = {
  //       x: this.dragoverBox.rect.x + offset.x,
  //       y: this.dragoverBox.rect.y,
  //       w: this.dragoverBox.rect.width - offset.x * 2,
  //       h: offset.y
  //     };
  //     // down
  //     const rect2 = {
  //       x: this.dragoverBox.rect.x + offset.x,
  //       y: this.dragoverBox.rect.y + this.dragoverBox.rect.height - offset.y,
  //       w: this.dragoverBox.rect.width - offset.x * 2,
  //       h: offset.y
  //     };
  //     // inside
  //     const rect3 = {
  //       x: this.dragoverBox.rect.x + offset.x,
  //       y: this.dragoverBox.rect.y + offset.y,
  //       w: this.dragoverBox.rect.width - offset.x * 2,
  //       h: this.dragoverBox.rect.height - offset.y * 2
  //     };

  //     if (this.pointInRect(point, rect1)) this.dragoverBox.placement = "up";
  //     if (this.pointInRect(point, rect2)) this.dragoverBox.placement = "down";
  //     if (this.pointInRect(point, rect3)) this.dragoverBox.placement = "inside";
  //     if (this.isStage) this.dragoverBox.placement = "inside";
  //     // console.log('pointInRect', point, rect, this.pointInRect(point, rect), e, this.dragoverBox)

  //     this.dragoverBox.hint = `insert ${componentName} ${this.dragoverBox.placement}`;
  //   }
  //   this.repaintDragoverBox();
  // }
  // public pointInRect(
  //   point: { x: number; y: number },
  //   rect: { x: number; y: number; w: number; h: number }
  // ) {
  //   return (
  //     point.x >= rect.x &&
  //     point.y >= rect.y &&
  //     point.x <= rect.x + rect.w &&
  //     point.y <= rect.y + rect.h
  //   );
  // }
  // ondrop(e: any) {
  //   e.preventDefault();
  //   if (this.dragoverBox.componentId) {
  //     const id = this.dragoverBox.componentId;
  //     this.findParentComponentById(id);

  //     let newComponent = null;
  //     let targetComponent = null;

  //     if (this.project.components.id === id) {
  //       targetComponent = this.project.components;
  //     } else {
  //       targetComponent = this.component.children.find(item => item.id === id);
  //     }

  //     try {
  //       const dragData = e.dataTransfer.getData("Text");
  //       const praseDragData = JSON.parse(dragData);
  //       newComponent = praseDragData;
  //       newComponent.layout = "nestedLayout";

  //       this.asyncLoadComponent(newComponent.name);

  //       if (targetComponent.name === "PositionLayoutContainer") {
  //         if (this.dragoverBox.placement === "inside") {
  //           const rect = e.target.getBoundingClientRect();
  //           const css = {
  //             position: "absolute",
  //             top: `${e.clientY - rect.top}px`,
  //             left: `${e.clientX - rect.left}px`
  //           };
  //           newComponent.layout = "positionLayout";
  //           newComponent.properties.css = Object.assign(
  //             {},
  //             newComponent.properties.css,
  //             css
  //           );
  //           console.log(
  //             "ondrop event: ",
  //             e,
  //             rect,
  //             newComponent,
  //             targetComponent,
  //             this
  //           );
  //         }
  //       }
  //       this.dropEvent(newComponent, targetComponent);
  //     } catch (error) {
  //       console.log("drop error:", error);
  //     }
  //   }

  //   this.dragoverBox = {
  //     target: null,
  //     componentId: "",
  //     rect: {},
  //     hint: "",
  //     placement: "inside",
  //     style: {}
  //   };
  // }
  // dropEvent(newComponent, targetComponent) {
  //   console.log("nested drop:", newComponent, targetComponent, this);
  //   let message = "";
  //   let event = "";
  //   if (this.dragoverBox.placement === "up") {
  //     event = "componentInsertAbove";
  //     message = `insert ${newComponent.properties.name} above ${targetComponent.properties.name}`;
  //   } else if (this.dragoverBox.placement === "down") {
  //     event = "componentInsertBelow";
  //     message = `insert ${newComponent.properties.name} below ${targetComponent.properties.name}`;
  //   } else {
  //     switch (targetComponent.name) {
  //       case "NestedLayoutContainer": {
  //         event = "componentInsertInto";
  //         message = `insert ${newComponent.properties.name} into ${targetComponent.properties.name}`;
  //         break;
  //       }
  //       case "PositionLayoutContainer": {
  //         event = "componentInsertInto";
  //         message = `insert ${newComponent.properties.name} into ${targetComponent.properties.name}`;
  //         break;
  //       }
  //       default:
  //         console.log(`Sorry, we are out of ${targetComponent.name}.`);
  //     }
  //   }

  //   (this as any).$eventBus.$emit(event, newComponent, targetComponent.id);
  //   (this as any).$eventBus.$emit("snapshotProject");

  //   this.$message({
  //     showClose: true,
  //     message,
  //     type: "success"
  //   });

  //   // 通过drop event插入组件数据，DOM重绘时间不确定，使用this.$nextTick()，仍不行，暂时加个延迟
  //   setTimeout(() => {
  //     this.currentComponentId = newComponent.id;
  //     this.componentSelectedStack = [newComponent.id];
  //   }, 200);
  // }
  // created() {
  //   (this as any).$eventStack.register(
  //     "editor-container",
  //     "dragover",
  //     this.ondragover
  //   );
  //   (this as any).$eventStack.register("editor-container", "drop", this.ondrop);
  // }
  // destroyed() {
  //   (this as any).$eventStack.dispose("editor-container", "dragover");
  //   (this as any).$eventStack.dispose("editor-container", "drop");
  // }
}
