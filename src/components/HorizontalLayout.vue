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
@Component
export default class HorizontalLayout extends Vue {
  public id: string = new Date().getTime() + "";
  public width: string = "";
  public backgroundColor: string = "#eee";
  public border: string = "2px dashed #ccc";

  public content: string = "";
  public display: string = "flex";
  public flexDirection: string = "row";
  public flexWrap: string = "nowrap";
  public justifyContent: string = "flex-start";
  public alignItems: string = "center";
  public boxSizing: string = "border-box";
  public minWidth: string = "40px";
  public maxWidth: string = "100%";
  public minHeight: string = "40px";
  public overflow: string = "hidden";

  public position: string = "absolute";
  public top: number = 0;
  public left: number = 0;
  public zIndex: string = "1";

  //页面中组件集合对象，key: 组件ID， value: Vue组件对象
  public vueComponents: { [key: string]: any } = {};
  //当前点击的组件（被激活的组件）
  public activeComponent: any = null;
  public uniqueId(index: number) {
    this.id = this.define().id + new Date().getTime() + index;
    return this.id;
  }

  /**
   * 组件基础定义
   */
  public define() {
    return {
      name: "水平盒子",
      id: "HorizontalLayout",
      icon: "el-icon-goods"
    };
  }

  //-------------------------事件响应 BEGIN-------------------------
  /**
   * 拖动到指定target时触发：当组件拖动到页面组件时触发
   */
  public drop(event: any) {
    event.preventDefault();
    console.log("HorizontalLayout drop:");
    console.dir(event);

    //1、获取组件配置
    var componentName = event.dataTransfer.getData("Text");
    console.log("componentName:");
    console.dir(componentName);
    if (
      componentName === undefined ||
      (componentManagement as any).registComponents[componentName] === undefined
    ) {
      return;
    }
    var componentOption = (componentManagement as any).registComponents[
      componentName
    ];

    //2、动态NEW组件
    var vueComponent = this.newComponent(componentOption, event);

    //3、组件位置设置
    vueComponent.$data.position = "";
    vueComponent.$data.display = "";
    vueComponent.$data.top = event.offsetY;
    vueComponent.$data.left = event.offsetX;

    event.stopPropagation();
  }

  //窗口滚动距离
  public scrollTop: number = 0;
  public scrollLeft: number = 0;

  //鼠标点击的位置
  public clientX: number = 0;
  public clientY: number = 0;

  //右键菜单属性设置
  public rightMenu: boolean = false; //右键菜单
  public rightMenuActive: string = ""; //右键菜单选中的菜单项

  /**
   * 根据组件配置项新建组件
   */
  public newComponent(componentOption: any, event: any) {
    //2、动态NEW组件
    var vueComponent = new Vue(componentOption);
    //新增组件长度作为id的一部分，这样就能保证ID的唯一性
    var id = (vueComponent as any).uniqueId(
      Object.keys(this.vueComponents).length
    );

    //3、将组件渲染到指定的页面元素中,该元素临时创建
    var tmpDiv = document.createElement("div");
    tmpDiv.setAttribute("id", id);
    (document.querySelector("#" + this.id) as HTMLElement).appendChild(tmpDiv);
    vueComponent.$mount("#" + id);
    console.dir(vueComponent);
    (vueComponent as any).position = "";
    (vueComponent as any).left = 0;
    (vueComponent as any).top = 0;
    (vueComponent as any).display = "";

    //4、注册到页面组件集合中
    this.vueComponents[id] = vueComponent;

    //5、组件交互及位置设置
    let el: HTMLElement = vueComponent.$el as HTMLElement;
    el.ondblclick = this.componentClick;

    return vueComponent;
  }

  /**
   * 组件双击事件（弹出组件属性设置框）
   */
  public componentClick(event: any) {
    // //非设计界面
    // this.isPage = false;

    // //获取点击的组件
    // var el = event.currentTarget;
    // var componentId = el.getAttribute("id");
    // var vueComponent = this.vueComponents[componentId];
    // this.activeComponent = vueComponent;

    // //设置属性显示到界面中
    // let tempAttrs: { [key: string]: any } = {};
    // for (var key in this.activeComponent.$data) {
    //   tempAttrs[key] = this.formatAttr(this.activeComponent.$data[key]).value;
    // }
    // this.elAttrs = tempAttrs;

    // //显示属性设置框
    // this.showAttrDialog(event);

    //停止传播
    event.stopPropagation();
  }

  /**
   * 组件移动到设计界面时触发
   *
   */
  public allowDrop(event: any) {
    //防止元素默认行为
    event.preventDefault();
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
