<template>
  <el-container class="page-design">
    <el-header style="height:0px;padding:0px;margin:0px;">
      <!-- <design-header @pre-view="preview" @save="save"></design-header> -->
    </el-header>
    <el-container>
      <el-aside v-bind:style="{ width: width + 'px' }" class="component-aside">
        <el-tabs
          type="border-card"
          v-model="activeName"
          @tab-click="switchLeftTabs"
          ref="box"
        >
          <el-tab-pane
            name="uicomponent"
            class="el-tab-pane"
            style="height:100%;"
          >
            <span slot="label"> <i class="el-icon-date"></i> 组件 </span>
            <div class="component-list">
              <el-col
                :span="8"
                v-bind:style="{ height: colHeight + 'px' }"
                v-for="component in components"
              >
                <div
                  draggable="true"
                  @dragstart="drag($event)"
                  @dragend="dragEnd($event)"
                  :id="component.id"
                >
                  <i class="component-icon" v-bind:class="component.icon"></i>
                  <span class="component-title">{{ component.name }}</span>
                </div>
              </el-col>
            </div>
          </el-tab-pane>

          <el-tab-pane
            name="uicomponent2"
            class="el-tab-pane"
            style="height:100%;"
          >
            <span slot="label"> <i class="el-icon-date"></i> 组件2 </span>
            <div class="component-list">
              <el-col
                :span="8"
                v-bind:style="{ height: colHeight + 'px' }"
                v-for="component in components"
              >
                <div
                  draggable="true"
                  @dragstart="drag($event)"
                  @dragend="dragEnd($event)"
                  :id="component.id"
                >
                  <i class="component-icon" v-bind:class="component.icon"></i>
                  <span class="component-title">{{ component.name }}</span>
                </div>
              </el-col>
            </div>
          </el-tab-pane>

          <el-tab-pane name="plugin">
            <span slot="label"> <i class="el-icon-date"></i> 页面 </span>
            <el-row>
              <el-button
                type="primary"
                style="width: 100%;"
                @click="newPage"
                icon="el-icon-circle-plus-outline"
                >新建页面</el-button
              >
            </el-row>
            <div class="page-list">
              <ul>
                <li v-for="page in pages" :class="{ active: page.active }">
                  <span
                    class="page-name"
                    :title="page.pageName"
                    @click="selectPage(page)"
                    >{{ page.pageName }}</span
                  >
                  <div class="page-oper">
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-document"
                      circle
                      @click="savePage(page)"
                    ></el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-edit"
                      circle
                      @click="changePageName(page)"
                    ></el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-finished"
                      circle
                      @click="generatePage(page)"
                    ></el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      circle
                      @click="deletePage(page)"
                    ></el-button>
                  </div>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container class="scroll-container">
        <el-main>
          <div class="main-container">
            <!--标尺-->
            <page-ruler
              :width="pageWidth"
              :height="pageHeight"
              :page-width="pageWidth"
              :page-height="pageHeight"
              :scroll-left="scrollLeftNum"
              :scroll-top="scrollTopNum"
            ></page-ruler>

            <!-- 页面设计主界面 -->
          </div>
        </el-main>
      </el-container>
      <el-aside v-bind:style="{ width: width + 'px' }" class="component-aside">
        <el-tabs
          type="border-card"
          v-model="tab2SelectedName"
          @tab-click="switchPageInfoTab"
          ref="box"
        >
          <el-tab-pane
            name="pageStructure"
            class="el-tab-pane"
            style="height:100%;"
          >
            <span slot="label"> <i class="el-icon-date"></i> 页面结构 </span>
            <div class="block">
              <el-tree
                :data="pageStructure"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                :indent="4"
                @node-click="handleClickNode"
              >
                <div
                  class="custom-tree-node"
                  slot-scope="{ node, data }"
                  @mouseenter="mouseEnterNode(data)"
                  @mouseleave="mouseLeaveNode(data)"
                  style="width:100%;box-sizing:border-box;"
                >
                  <span>{{ node.label }}</span>
                  <!-- <span>
                    <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button>
                  </span>-->
                </div>
              </el-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane name="componentCss">
            <span slot="label"> <i class="el-icon-date"></i> CSS样式 </span>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import PageHeader from "../layouts/PageHeader.vue";
import DesignHeader from "../layouts/DesignHeader.vue";
import PageFooter from "../layouts/PageFooter.vue";
import PageRuler from "../components/PageRuler.vue";
import componentManagement from "../components/componentManagement";
import PageComponent from "../components/PageComponent.vue";
import axios from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";
import PageInfo from "../pojo/PageInfo";
import AttributeInfo from "../pojo/AttributeInfo";
import ComponentInfo from "../pojo/ComponentInfo";
import TreeData from "../pojo/TreeData";
import { ComponentOptions } from "vue";
let PageComponentJson = require("../components/component.json");
@Component({
  components: {
    PageHeader,
    PageFooter,
    DesignHeader,
    PageRuler
  }
})
export default class Design extends Vue {
  public components: any[] = [];
  public activeName: string = "uicomponent";
  public tab2SelectedName: string = "pageStructure";
  public width: number = 260;
  public colHeight: number = 260 / 3;

  //标尺属性
  public pageWidth: number = 800;
  public pageHeight: number = 600;
  public scrollLeftNum: number = 0;
  public scrollTopNum: number = 0;

  //页面列表属性
  public pages: PageInfo[] = [];
  public defaultProps: any = {
    children: "children",
    label: "pageName"
  };

  //页面组件
  public pageComponent: any = null;
  public pageId: string = "";

  //定时器
  public timeIndex: any;
  /**
   * TAB点击事件
   */
  public switchLeftTabs(tab: any, event: any) {
    // console.log(tab, event);
  }

  public switchPageInfoTab(tab: any, event: any) {
    console.log(tab, event);
  }

  /**
   * 选择指定页面
   */
  selectPage(page: PageInfo) {
    //选中当前页面
    for (let i = 0; i < this.pages.length; i++) {
      this.pages[i].active = false;
    }
    page.active = true;

    this.createEmptyWorkspace();
    this.pageId = page.id;

    //设置页面属性
    let componentAttrs: ComponentInfo = page.componentAttrs;
    if (
      componentAttrs &&
      componentAttrs.componentAttrs &&
      componentAttrs.componentAttrs.length > 0
    ) {
      for (let i = 0; i < componentAttrs.componentAttrs.length; i++) {
        this.pageComponent.$data[
          componentAttrs.componentAttrs[i].attrName
        ] = this.parseAttr(
          componentAttrs.componentAttrs[i].attrType,
          componentAttrs.componentAttrs[i].attrValue
        );
      }
    }

    let pageComponents: any[] = page.pageComponents;
    if (!pageComponents) pageComponents = [];

    for (let i = 0; i < pageComponents.length; i++) {
      let temp: any = pageComponents[i];
      this.addComponentToWorkspace(temp, page.id);
    }

    this.generatePageStructure(page);

    //强制更新
    this.$forceUpdate();
  }

  /**
   * 编辑页面
   */
  private changePageName(page: PageInfo) {
    let oldValue = page["pageName"];
    console.dir(oldValue);
    let current = this;
    this.$prompt("页面名称", "修改页面名称", {
      confirmButtonText: "确定",
      inputPattern: /.+/,
      inputErrorMessage: "页面名称不能为空",
      inputValue: oldValue
    }).then((value: any) => {
      console.dir(value);
      page.pageName = value.value;
    });
  }

  /**
   * 删除页面
   */
  private deletePage(page: PageInfo) {
    let index: number = this.pages.indexOf(page);
    if (index < 0) return;
    this.pages.splice(index, 1);
    index = index - 1;
    if (index >= 0 && this.pages.length > 0) {
      this.selectPage(this.pages[index]);
    } else {
      this.clearWorkspace();
    }
  }

  private clearWorkspace() {
    let pageDesignContainer: HTMLElement = document.querySelector(
      ".pagedesign-container"
    ) as HTMLElement;
    console.log("newPage:" + pageDesignContainer);
    if (pageDesignContainer) {
      //.pagedesign-container之上还有一个div，所以这里需要这样删除，否则会出现右键菜单显示不出来的问题
      ((pageDesignContainer.parentNode as Node)
        .parentNode as HTMLElement).removeChild(
        pageDesignContainer.parentNode as HTMLElement
      );
    }
  }

  /**
   * 组件开始移动触发
   */
  drag(event: any) {
    //往Text设置组件的标识，用于获取组件配置项
    console.log("drag");
    console.dir(event);
    event.dataTransfer.setData("Text", event.target.id);
  }

  private dragEnd(event: any) {
    console.log("dragEnd");
    let page: PageInfo = this.pages.find((e: PageInfo) => {
      return e.id === this.pageId;
    }) as PageInfo;
    // page.pageComponents = [];

    if (page) {
      this.generatePageStructure(page);
      // console.dir(page);
    }
  }

  /**
   * 新建页面
   */
  private newPage() {
    let newPage: PageInfo = new PageInfo();
    newPage.id = new Date().getTime() + "";
    newPage.pageName = "新页面";
    newPage.active = false;
    this.pages.push(newPage);
    this.selectPage(newPage);
  }

  private createEmptyWorkspace() {
    console.log("createEmptyWorkspace");
    this.pageId = "";

    //1、动态加载页面组件
    this.pageComponent = new Vue(PageComponent);

    //2、移除已有的页面组件
    let pageDesignContainer: HTMLElement = document.querySelector(
      ".pagedesign-container"
    ) as HTMLElement;
    console.log("newPage:" + pageDesignContainer);
    if (pageDesignContainer) {
      //.pagedesign-container之上还有一个div，所以这里需要这样删除，否则会出现右键菜单显示不出来的问题
      ((pageDesignContainer.parentNode as Node)
        .parentNode as HTMLElement).removeChild(
        pageDesignContainer.parentNode as HTMLElement
      );
    }
    let id: string = this.pageComponent.uniqueId();
    this.pageComponent.$ref = id;

    console.log("pageComponent:");
    console.dir(this.pageComponent);

    //3、装载新的页面组件到页面中
    let tmpDiv: HTMLDivElement = document.createElement("div");
    tmpDiv.setAttribute("id", id);
    (document.querySelector(".main-container") as HTMLElement).appendChild(
      tmpDiv
    );
    this.pageComponent.$mount("#" + id);
  }

  private addComponentToWorkspace(component: any, workspaceId: string) {
    console.log("addComponentToWorkspace");
    console.dir(component);
    this.pageId = "";

    //1、动态加载页面组件
    this.pageComponent = new Vue(PageComponent);
    // console.log("pageComponent:");
    // console.dir(this.pageComponent);
    var id = this.pageComponent.uniqueId();

    //3、装载新的页面组件到页面中
    let tmpDiv: HTMLDivElement = document.createElement("div");
    tmpDiv.setAttribute("id", id);
    (document.querySelector("#" + workspaceId) as HTMLElement).appendChild(
      tmpDiv
    );

    // let vueComponents = this.pageComponent.$data.vueComponents;
    // for (key in vueComponents) {
    //   //页面组件属性
    //   var componentAttrs = [];
    //   var attrIndex = 0;
    //   for (var attrName in vueComponents[key].$data) {
    //     if (attrName === "id") {
    //       continue;
    //     }
    //     attrFormat = this.formatAttr(vueComponents[key].$data[attrName]);
    //     componentAttrs[attrIndex] = {
    //       attrName: attrName,
    //       attrValue: attrFormat.value,
    //       attrType: attrFormat.type
    //     };
    //     attrIndex++;
    //   }
    //   page["pageComponents"][index] = {
    //     componentName: vueComponents[key].$data.id,
    //     componentCode: vueComponents[key].define().id,
    //     componentAttrs: componentAttrs
    //   };
    //   index++;
    // }
  }

  /**
   * 页面预览
   */
  preview() {
    //clearInterval(this.timeIndex);

    var current = this;
    this.save(function(pageId: string) {
      //打开新的窗口
      let routeData = current.$router.resolve({
        name: "view",
        params: { pageId: pageId }
      });
      window.open(routeData.href, "_blank");
    });
  }

  /**
   * 页面保存
   */
  save(callback: any) {
    if (this.pageComponent === null) {
      return false;
    }

    let page: PageInfo = new PageInfo();
    page.id = this.pageId;

    let current = this;
    if (this.pageId === "") {
      this.$prompt("请输入页面名称", "保存页面", {
        confirmButtonText: "确定",
        inputPattern: /.+/,
        inputErrorMessage: "页面名称不能为空"
      })
        .then((value: any) => {
          page["pageName"] = value;
          current.savePage(page);
        })
        .catch(() => {
          return false;
        });
    } else {
      current.savePage(page);
    }
  }

  private generatePage(page: PageInfo) {}

  /**
   * 保存页面
   */
  savePage(page: PageInfo) {
    //页面属性
    let attrs: AttributeInfo[] = [];
    for (var key in PageComponentJson.styles) {
      var attrFormat = this.formatAttr(this.pageComponent.$data[key]);
      attrs.push({
        attrName: key,
        attrValue: attrFormat.value,
        attrType: attrFormat.type
      });
    }

    page.componentAttrs = {
      componentName: "pagedesign",
      componentCode: "pagedesign",
      componentAttrs: attrs,
      components: []
    };

    //页面组件
    page["pageComponents"] = [];
    console.dir(this.pageComponent);
    let vueComponents = this.pageComponent.$data.vueComponents;
    page.pageComponents = this.getVueComponents(vueComponents);

    page["pageHtml"] = {};

    console.dir(page);
  }

  private getVueComponents(vueComponents: any[]) {
    let key: string = "";
    let attrFormat: any;
    let components: ComponentInfo[] = [];
    for (key in vueComponents) {
      console.log("key:");
      console.dir(key);
      //页面组件属性
      let attrs: AttributeInfo[] = [];
      let subcomponents: ComponentInfo[] = [];
      for (var attrName in vueComponents[key].$data) {
        console.log(vueComponents[key].define().id + " attrName:" + attrName);
        if (attrName === "id") {
          continue;
        } else if (attrName === "vueComponents") {
          subcomponents = this.getVueComponents(
            vueComponents[key].$data[attrName]
          );
          continue;
        }
        attrFormat = this.formatAttr(vueComponents[key].$data[attrName]);
        attrs.push({
          attrName: attrName,
          attrValue: attrFormat.value,
          attrType: attrFormat.type
        });
      }
      components.push({
        componentName: vueComponents[key].$data.id,
        componentCode: vueComponents[key].define().id,
        componentAttrs: attrs,
        components: subcomponents
      });
    }

    return components;
  }

  /**
   * 格式化属性值（转换为字符串）
   * 返回格式{value: 属性对应的字符串值, type: 属性类型,1:字符串,2:数值,3:布尔值,4:数组,5:对象,6:其它}
   */
  formatAttr(attrValue: any) {
    var getType = Object.prototype.toString;
    if (getType.call(attrValue) === "[object String]") {
      return { value: attrValue, type: "1" };
    } else if (getType.call(attrValue) === "[object Number]") {
      return { value: attrValue + "", type: "2" };
    } else if (getType.call(attrValue) === "[object Boolean]") {
      return { value: attrValue + "", type: "3" };
    } else if (getType.call(attrValue) === "[object Array]") {
      return { value: JSON.stringify(attrValue), type: "4" };
    } else if (getType.call(attrValue) === "[object Object]") {
      return { value: JSON.stringify(attrValue), type: "5" };
    }

    return { value: attrValue, type: "6" };
  }

  /**
   * 根据属性类型和值，解析为正确的格式
   */
  parseAttr(attrType: any, attrValue: any) {
    if (attrType === "1") {
      return attrValue;
    } else if (attrType === "2") {
      return Number.parseFloat(attrValue);
    } else if (attrType === "3") {
      return eval(attrValue);
    } else if (attrType === "4" || attrType === "5") {
      return JSON.parse(attrValue);
    }

    return attrValue;
  }

  /**
   * 组件生命周期：mounted
   *
   */
  mounted() {
    //滚动到居中位置
    let scroll: HTMLElement = document.querySelector(".el-main") as HTMLElement;
    scroll.scrollTop = 0;
    scroll.scrollLeft = 0;

    //主界面滚动事件（设置标尺的top、left，保证标尺固定）
    let thisComponent = this;
    scroll.addEventListener(
      "scroll",
      () => {
        thisComponent.scrollTopNum = scroll.scrollTop;
        thisComponent.scrollLeftNum = scroll.scrollLeft;
        if (!(thisComponent.pageComponent === null)) {
          thisComponent.pageComponent.$data.scrollTop =
            thisComponent.scrollTopNum;
          thisComponent.pageComponent.$data.scrollLeft =
            thisComponent.scrollLeftNum;
        }
      },
      false
    );

    //初始化组件
    var index = 0;
    for (var componentName in componentManagement.registComponents) {
      // console.log("componentName:" + componentName);
      let vueComponent: any = (componentManagement as any).registComponents[
        componentName
      ];

      // console.dir(vueComponent);

      var defineJson = vueComponent.options.methods.define();
      this.components[index] = {
        name: defineJson.name,
        icon: defineJson.icon,
        id: defineJson.id
      };
      index++;
    }

    //强制更新
    this.$forceUpdate();
  }

  private showAttrs(attrs: any) {
    console.dir(attrs);
  }

  public pageStructure: TreeData<ComponentInfo>[] = [];

  // get pageStructure() {
  //   let page: PageInfo = this.pages.find((e: PageInfo) => {
  //     return e.id === this.pageId;
  //   }) as PageInfo;
  //   let tree: TreeData<ComponentInfo>[] = [];
  //   if (page) {
  //     this.savePage(page);
  //     let data: TreeData<ComponentInfo> = this.generatePageStructure(page);
  //     tree.push(data);
  //   }

  //   return tree;
  // }

  private generatePageStructure(page: PageInfo) {
    this.savePage(page);

    let tree: TreeData<ComponentInfo> = new TreeData<ComponentInfo>();
    tree.id = page.componentAttrs.componentName;
    tree.label = page.pageName;
    tree.data = page.componentAttrs;
    tree.children = this.createTreeDataFromComponents(page.pageComponents);

    this.pageStructure = [];
    this.pageStructure.push(tree);
  }

  private createTreeDataFromComponents(components: ComponentInfo[]) {
    let tree: TreeData<ComponentInfo>[] = [];
    components.forEach((e: ComponentInfo) => {
      tree.push(this.createTreeDataFromComponent(e));
    });
    return tree;
  }

  private createTreeDataFromComponent(component: ComponentInfo) {
    let leaf: TreeData<ComponentInfo> = new TreeData<ComponentInfo>();
    leaf.id = component.componentName;
    leaf.label = component.componentCode;
    leaf.data = component;
    leaf.children = this.createTreeDataFromComponents(component.components);
    return leaf;
  }

  private handleClickNode(obj: any, node: any, data: any) {
    console.log("handleClickNode");
    console.dir(obj);
    console.dir(node);
    console.dir(data);
  }

  private mouseEnterNode(data: TreeData<ComponentInfo>) {
    console.log("mouseEnterNode");
    console.dir(data);
    // eventBus.$emit("showMask", data.data.componentName, true);
  }

  private mouseLeaveNode(data: TreeData<ComponentInfo>) {
    console.log("mouseEnterNode");
    console.dir(data);
    // eventBus.$emit("showMask", data.data.componentName, false);
  }
}
</script>

<style>
html,
body,
#app {
  height: 100vh;
  user-select: none;
  overflow: hidden;
}

.el-tabs--border-card > .el-tabs__content {
  padding: 0px;

  padding-left: 5px;
}
</style>
<style scoped>
.custom-tree-node {
  padding: 0px;
}
.page-design {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
ul {
  margin: 0px;
  padding: 0px;
}
li {
  list-style: none;
}
.el-container {
  height: 100%;
}

.el-tab-pane {
  min-height: 100%;
}
.tool-item-title {
  display: block;
  padding: 8px;
  background-color: #eee;
}
.component-aside {
  height: calc(100% - 50px);
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
.el-tabs {
  height: 100%;
}

.el-tabs-content {
  min-height: 100vh;
}
.component-list {
  height: 100%;
}
.component-list .el-col {
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #eee;
  cursor: pointer;
  background-color: #fefefe;
  font-size: 14px;
}

.component-list .el-col:hover {
  background-color: #dedede;
}

.component-list .component-icon {
  display: block;
  margin-bottom: 12px;
}

.el-main {
  background-color: #ddd;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  padding: 0;
}
.scroll-container {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
}

.main-container {
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  overflow-x: hidden;
}

.attr-list {
  margin-top: 20px;
  margin-right: 4px;
}

.line-separator {
  width: 100%;
  height: 0px;
  border: 1px dashed #999;
  margin-bottom: 8px;
}

/*-----------页面列表样式 BEGIN-----------*/
.page-list {
  margin-top: 12px;
  border-top: 1px solid #eee;
}
.page-list ul li {
  padding: 8px 2px 8px 12px;
  cursor: pointer;
}
.page-list ul li:hover {
  background-color: #dcdfe6;
}
.page-list ul .active {
  background-color: #b6b9bd;
}
.page-list .page-name {
  display: inline-block;
  width: 150px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
.page-list .page-oper {
  display: inline-block;
}

.el-tree-node__expand-icon {
  display: none;
  padding: 0px;
  margin: 0px;
}
/*-----------页面列表样式 END-------------*/
</style>
