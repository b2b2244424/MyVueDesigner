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
            :name="tabNames[0]"
            class="el-tab-pane"
            style="height:100%;"
          >
            <span slot="label"> <i class="el-icon-date"></i> 组件 </span>
            <el-collapse v-model="activeCollapse" @change="handleCollapse">
              <el-collapse-item
                v-for="(item, index) in vueComponentConfigs"
                :key="index"
                :title="item.showName"
                :name="item.name"
              >
                <div
                  class="flex_box_vertical"
                  v-for="(category, index2) in item.categories"
                  :key="index2"
                >
                  <span>{{ category.showName }}</span>
                  <div class="component-list">
                    <el-col
                      :span="8"
                      :style="{ height: colHeight + 'px' }"
                      v-for="(component, index3) in category.components"
                      :key="index3"
                    >
                      <div
                        draggable="true"
                        @dragstart="
                          drag($event, item.name, category.name, component.name)
                        "
                        @dragend="dragEnd($event)"
                        :id="component.id"
                      >
                        <i
                          class="component-icon"
                          v-bind:class="component.icon"
                        ></i>
                        <span class="component-title">{{
                          component.showName
                        }}</span>
                      </div>
                    </el-col>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane
            :name="tabNames[1]"
            class="el-tab-pane"
            style="height:100%;"
          >
            <span slot="label"> <i class="el-icon-date"></i> 项目信息 </span>
            <el-collapse v-model="activeCollapse2" @change="handleCollapse">
              <el-collapse-item title="项目详情" name="项目详情">
                <el-row>
                  <div class="flex_box_vertical_start" style="width:100%;">
                    <span>项目名称:</span>
                    <textarea
                      v-model="project.name"
                      style="width:100%;resize: none;"
                      cols="6"
                      @input="projectNameChanged"
                    ></textarea>
                  </div>
                </el-row>
                <el-row>
                  <div class="flex_box_vertical_start" style="width:100%;">
                    <span>页面路径：</span>
                    <textarea
                      v-model="project.pageDir"
                      disabled
                      style="width:100%;resize: none;"
                      cols="6"
                    ></textarea>
                    <el-button
                      style="width: 100%; margin-top:10px"
                      @click="browsePageDir"
                      >浏览</el-button
                    >
                  </div>
                </el-row>
                <el-row>
                  <div class="flex_box_vertical_start" style="width:100%;">
                    <span>组件路径：</span>
                    <textarea
                      v-model="project.componentDir"
                      disabled
                      style="width:100%;resize: none;"
                      cols="6"
                    ></textarea>
                    <el-button
                      style="width: 100%; margin-top:10px"
                      @click="browseComponentDir"
                      >浏览</el-button
                    >
                  </div>
                </el-row>
                <el-row></el-row>
              </el-collapse-item>
              <el-collapse-item title="页面列表" name="页面列表">
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
                    <li
                      class="list-item"
                      v-for="(page, index) in project.pages"
                      :class="{ active: page.isSelected }"
                      @click="selectPage(page)"
                      :key="index"
                    >
                      <div class="page-preview-item">
                        <div class="page-preview">
                          <div
                            style="width:375px;height:600px;background-color:white;
                        box-sizing:border-box;"
                          >
                            <component
                              :is="
                                loadComponent(
                                  page.component.libName,
                                  page.component.categoryName,
                                  page.component.componentName
                                )
                              "
                              :id="getPageComponent(page).id"
                              :css="page.component.css"
                              :customData="page.component.defaultData"
                              :components="getPageComponent(page).children"
                            />
                          </div>
                        </div>
                        <span class="page-name" :title="page.name">{{
                          page.name
                        }}</span>
                        <div class="page-oper">
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-document-add"
                            circle
                            @click="savePageTemplate($event, page)"
                            >保存页面模板</el-button
                          >
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-view"
                            circle
                            @click="previewPage($event, page)"
                            >预览</el-button
                          >
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-document"
                            circle
                            @click="savePage($event, page)"
                            >生成代码</el-button
                          >
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-edit"
                            circle
                            @click="changePageName($event, page)"
                            >修改名称</el-button
                          >
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-finished"
                            circle
                            @click="generatePage($event, page)"
                            >生成页面(无))</el-button
                          >
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-delete"
                            circle
                            @click="deletePage2($event, page)"
                            >删除</el-button
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
              <el-collapse-item title="页面模板" name="页面模板">
                <div class="page-list">
                  <ul>
                    <li
                      class="list-item"
                      v-for="(page, index) in project.pageTemplates"
                      :key="index"
                    >
                      <div class="page-preview-item">
                        <div class="page-preview">
                          <div
                            style="width:375px;height:600px;background-color:white;
                        box-sizing:border-box;"
                          >
                            <component
                              :is="
                                loadComponent(
                                  page.component.libName,
                                  page.component.categoryName,
                                  page.component.componentName
                                )
                              "
                              :id="page.component.id"
                              :css="page.component.css"
                              :customData="page.component.defaultData"
                              :components="page.component.children"
                            />
                          </div>
                        </div>
                        <span class="page-name" :title="page.name">{{
                          page.name
                        }}</span>
                        <div class="page-oper">
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-document-add"
                            circle
                            @click="createPageFromTemplate($event, page)"
                            >创建页面</el-button
                          >
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-edit"
                            circle
                            @click="changeTemplateName($event, page)"
                            >修改名称</el-button
                          >
                          <el-button
                            type="text"
                            size="mini"
                            icon="el-icon-delete"
                            circle
                            @click="deleteTemplate($event, page)"
                            >删除</el-button
                          >
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
              <el-collapse-item title="组件模板" name="组件模板">
                <div class="page-list">
                  <ul>
                    <li
                      class="list-item"
                      v-for="(page, index) in project.componentTemplates"
                      :key="index"
                    >
                      <div class="component-preview-item">
                        <div
                          class="component-preview-container flex_box_vertical"
                        >
                          <div class="component-preview">
                            <component
                              :is="
                                loadComponent(
                                  page.component.libName,
                                  page.component.categoryName,
                                  page.component.componentName
                                )
                              "
                              :id="page.component.id"
                              :css="page.component.css"
                              :customData="page.component.defaultData"
                              :components="page.component.children"
                            />
                          </div>
                          <span class="page-name" :title="page.name">{{
                            page.name
                          }}</span>
                          <div class="page-oper">
                            <el-button
                              type="text"
                              size="mini"
                              icon="el-icon-document"
                              circle
                              @click="saveComponentCode($event, page)"
                              >生成组件代码</el-button
                            >
                            <el-button
                              type="text"
                              size="mini"
                              icon="el-icon-edit"
                              circle
                              @click="changeComponentTemplateName($event, page)"
                              >修改名称</el-button
                            >
                            <el-button
                              type="text"
                              size="mini"
                              icon="el-icon-delete"
                              circle
                              @click="deleteComponentTemplate($event, page)"
                              >删除</el-button
                            >
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
              <el-collapse-item title="颜色列表" name="颜色列表">
                <el-row>
                  <el-button
                    type="primary"
                    style="width: 100%;"
                    @click="addColorConfirm"
                    icon="el-icon-circle-plus-outline"
                    >添加颜色</el-button
                  >
                </el-row>
                <div class="page-list">
                  <ul>
                    <li
                      class="list-item"
                      v-for="(colorInfo, index) in project.colors"
                      :key="index"
                    >
                      <div class="component-preview-item">
                        <div
                          class="component-preview-container flex_box_vertical"
                        >
                          <div
                            class="component-preview"
                            :style="{
                              backgroundColor: colorInfo.color,
                              height: '40px'
                            }"
                          ></div>
                          <span class="page-name" :title="colorInfo.color">{{
                            colorInfo.color
                          }}</span>
                          <div class="page-oper">
                            <el-button
                              type="danger"
                              size="mini"
                              icon="el-icon-delete"
                              circle
                              @click="deleteColor($event, page)"
                            ></el-button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
              <el-collapse-item title="文字尺寸列表" name="文字尺寸列表">
                <el-row>
                  <el-button
                    type="primary"
                    style="width: 100%;"
                    @click="addFontSizeConfirm"
                    icon="el-icon-circle-plus-outline"
                    >添加文字尺寸</el-button
                  >
                </el-row>
                <div class="page-list">
                  <ul>
                    <li
                      class="list-item"
                      v-for="(fontSizeInfo, index) in project.fontSizes"
                      :key="index"
                    >
                      <div class="component-preview-item">
                        <div
                          class="component-preview-container flex_box_vertical"
                        >
                          <div
                            class="component-preview"
                            :style="{
                              fontSize: fontSizeInfo.size + fontSizeInfo.unit,
                              height: '40px',
                              textAlign: 'center'
                            }"
                          >
                            示例文字
                          </div>
                          <span class="page-name" :title="fontSizeInfo.name">{{
                            fontSizeInfo.name
                          }}</span>
                          <div class="page-oper">
                            <el-button
                              type="danger"
                              size="mini"
                              icon="el-icon-delete"
                              circle
                              @click="deleteFontSize($event, fontSizeInfo)"
                            ></el-button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-container class="scroll-container">
        <el-main>
          <div class="main-container">
            <!--标尺-->
            <page-ruler
              :width.sync="pageWidth"
              :height.sync="pageHeight"
              :page-width.sync="pageWidth"
              :page-height.sync="pageHeight"
              :scroll-left.sync="scrollLeftNum"
              :scroll-top.sync="scrollTopNum"
            ></page-ruler>
            <template v-if="projects.length > 0">
              <page-component2
                id="pageDesign"
                :config="project.config"
                :componentData="pageComponent133"
              />
            </template>

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
            :name="tabNames[2]"
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
          <el-tab-pane :name="tabNames[3]">
            <span slot="label"> <i class="el-icon-date"></i> CSS样式 </span>
            <properties-container />
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
    <el-dialog title="添加颜色" :visible.sync="dialogFormVisible">
      <el-color-picker label="请选择颜色" v-model="color2"></el-color-picker>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addColorSuccess">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加文字尺寸" :visible.sync="addFontSizeDialogVisible">
      <div
        class="flex_box_horizontal"
        style="width:100%;box-sizing:border-box;"
      >
        <span>文字尺寸：</span>
        <div>
          <input
            type="number"
            style="width:50px"
            v-model="inputFontSize.size"
            size="mini"
            controls-position="right"
            placeholder="请输入文字尺寸"
          />
          <el-select
            style="width:80px;"
            v-model="inputFontSize.unit"
            size="mini"
          >
            <el-option
              v-for="unit in unitList"
              :value="unit.value"
              :key="unit.value"
              :label="unit.text"
            />
          </el-select>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addFontSizeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFontSizeSuccess">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script lang="ts">
import PageHeader from "../layouts/PageHeader.vue";
import DesignHeader from "../layouts/DesignHeader.vue";
import PageFooter from "../layouts/PageFooter.vue";
import PageRuler from "../components/PageRuler.vue";
import PageComponent2 from "../components/PageComponent2.vue";
import PropertiesContainer from "../components/PropertiesContainer/PropertiesContainer.vue";
import axios from "axios";
import { Component, Prop, Vue, Mixins, Watch } from "vue-property-decorator";
import PageInfo2 from "../types/PageInfo2";
import AttributeInfo from "../pojo/AttributeInfo";
import ComponentInfo from "../pojo/ComponentInfo";
import TreeData from "../pojo/TreeData";
import { ComponentOptions } from "vue";
import DragData from "../types/DragData";
import BusEvents from "../events/BusEvents";
import ComponentLoader from "../mixins/ComponentLoader";
import PageConfig from "../types/PageConfig";
import ProjectInfo from "../types/ProjectInfo";
import ProjectModule from "../store/modules/ProjectModule";
import configs from "../configs/componentConfigs2";
import VueFileGenerator from "../utils2/VueFileGenerator";
import PageTemplateInfo from "../types/PageTemplateInfo";
import DragDataUtils from "../utils2/DragDataUtils";
import ComponentTemplateInfo from "../types/ComponentTemplateInfo";
import ColorInfo from "../types/ColorInfo";
import FontSizeInfo from "../types/FontSizeInfo";
import unitList from "../configs/unitList";
import FileUtils from "../utils/local/FileUtils";

const { dialog } = require("electron").remote;

@Component({
  components: {
    PageHeader,
    PageFooter,
    DesignHeader,
    PageRuler,
    PropertiesContainer,
    PageComponent2
  }
})
export default class Design2 extends Mixins(ComponentLoader) {
  public tabNames: string[] = [
    "uicomponent",
    "plugin",
    "pageStructure",
    "componentCss"
  ];
  // public components: any[] = [];
  public activeName: string = this.tabNames[0];
  public tab2SelectedName: string = this.tabNames[3];
  public width: number = 280;
  public colHeight: number = 280 / 3;
  public activeCollapse: string[] = ["common"];
  public activeCollapse2: string[] = ["页面列表"];
  private handleCollapse(val: any) {
    console.dir(val);
  }
  //标尺属性
  public pageWidth: number = 20000;
  public pageHeight: number = 20000;
  public scrollLeftNum: number = 0;
  public scrollTopNum: number = 0;

  public projects: ProjectInfo[] = ProjectModule.projects;
  public selectedIndex: number = ProjectModule.selectedIndex;
  public project!: ProjectInfo;
  public selectedPage: number = 0;

  public dialogFormVisible: boolean = false;
  private color2: string = "";

  @Watch("selectedPage", { deep: true, immediate: true })
  selectedPageChanged() {
    console.log("current selected page:" + this.selectedPage);
  }

  public defaultProps: any = {
    children: "children",
    label: "pageName"
  };

  //页面组件
  public pageId: string = "";
  public components: DragData[] = [];

  public pageComponent133: DragData = new DragData();

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
  selectPage(page: PageInfo2) {
    //选中当前页面
    for (let i = 0; i < this.project.pages.length; i++) {
      this.project.pages[i].isSelected = false;
    }
    page.isSelected = true;
    this.selectedPage = this.project.pages.indexOf(page);
    console.error("selectPage,index:" + this.selectedPage);
    console.dir(page);
    this.pageComponent133 = this.project.pages[this.selectedPage].component;
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
    this.generatePageStructure(page);
    (this as any).$eventBus.$emit(BusEvents.SUB_COMPONENT_SELECTED, "");
  }

  /**
   * 编辑页面
   */
  private changePageName(event: MouseEvent, page: PageInfo2) {
    event.stopPropagation();
    let oldValue: string = page.name;
    console.dir(oldValue);
    let current = this;
    this.$prompt("页面名称", "修改页面名称", {
      confirmButtonText: "确定",
      inputPattern: /.+/,
      inputErrorMessage: "页面名称不能为空",
      inputValue: oldValue
    }).then((value: any) => {
      console.dir(value);
      page.name = value.value;
    });
  }

  /**
   * 删除页面
   */
  private deletePage(page: PageInfo2) {
    console.log("deletePage");
    if (this.project.pages.length <= 1) return;
    let index: number = this.project.pages.indexOf(page);
    console.log("index:" + index);
    if (index < 0) return;
    this.project.pages.splice(index, 1);
    if (index === 0) {
      this.selectPage(this.project.pages[index]);
    } else {
      index = index - 1;
      console.log("index2:" + index);
      if (index >= 0 && this.project.pages.length > 0) {
        console.log("next page:");
        console.dir(this.project.pages[index]);
        this.selectPage(this.project.pages[index]);
      } else {
        this.clearWorkspace();
      }
    }
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
  }

  private clearWorkspace() {}

  /**
   * 组件开始移动触发
   */
  public drag(
    event: any,
    libName: string,
    categoryName: string,
    componentName: string
  ) {
    //往Text设置组件的标识，用于获取组件配置项
    console.log("drag");
    console.dir(event);
    let css: any = this.loadDefaultCss(libName, categoryName, componentName);
    console.error("css:");
    console.dir(css);
    let data: DragData = {
      libName: libName,
      categoryName: categoryName,
      componentName: componentName,
      id: "div" + (this as any).$uuid(),
      css: css,
      style: "",
      defaultData: this.loadDefaultData(libName, categoryName, componentName),
      children: [],
      useless: "",
      customComponentData: {}
    };
    console.dir("start drag data:");
    console.dir(data);
    event.dataTransfer.setData("Text", JSON.stringify(data));
  }

  private dragEnd(event: any) {
    this.$forceUpdate();
  }

  /**
   * 新建页面
   */
  private newPage() {
    console.log("newPage");
    let newPage: PageInfo2 = {
      id: (this as any).$uuid(),
      name: "新页面",
      isSelected: false,
      component: JSON.parse(
        JSON.stringify(this.project.defaultPageTemplate.component)
      )
    };

    this.project.pages.push(newPage);
    this.selectPage(newPage);
    console.log("pages:");
    console.dir(this.project.pages);
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
  }

  /**
   * 页面预览
   */
  preview() {
    //clearInterval(this.timeIndex);
    var current = this;
  }

  /**
   * 保存页面
   */
  savePage(event: MouseEvent, page: PageInfo2) {
    event.stopPropagation();
    if (this.project.pageDir && this.project.pageDir.trim().length > 0) {
      let code: string = "";
      let generator: VueFileGenerator = new VueFileGenerator();
      code = generator.generate(page.component);
      FileUtils.writeFile(
        this.project.pageDir + "/" + page.name + ".vue",
        code
      );
      code = generator.generateHtml(page.component);
      FileUtils.writeFile(
        this.project.pageDir + "/" + page.name + ".html",
        code
      );
      this.$message({
        type: "info",
        message: "代码已经保存在：" + this.project.pageDir,
        duration: 2000
      });
    } else {
      this.$message({
        type: "info",
        message: "请在项目信息里面配置页面代码保存的路径",
        duration: 2000
      });
    }
  }

  private saveComponentCode(event: MouseEvent, page: PageInfo2) {
    event.stopPropagation();
    if (
      this.project.componentDir &&
      this.project.componentDir.trim().length > 0
    ) {
      let code: string = "";
      let generator: VueFileGenerator = new VueFileGenerator();
      code = generator.generate(page.component);
      FileUtils.writeFile(
        this.project.componentDir + "/" + page.name + ".vue",
        code
      );
      this.$message({
        type: "info",
        message:
          "代码已经保存在：" +
          this.project.componentDir +
          "/" +
          page.name +
          ".vue",
        duration: 2000
      });
    } else {
      this.$message({
        type: "info",
        message: "请在项目信息里面配置组件代码保存的路径",
        duration: 2000
      });
    }
  }

  created() {
    let id: string = (this.$route as any).params.id;
    console.log("id:" + id);
    this.projects = ProjectModule.projects;
    console.log("created");
    console.dir(this.projects);
    let project: any = this.projects.find((e: ProjectInfo) => {
      return e.id === id;
    });
    if (project) {
      this.project = project;
      this.pageComponent133 = JSON.parse(
        JSON.stringify(this.project.defaultPageTemplate.component)
      );
      let index: number = this.projects.indexOf(project);
      if (index >= 0) {
        ProjectModule.setSelectedIndex(this.selectedIndex);

        if (!this.project.id) this.project.id = (this as any).$uuid();
        if (!this.project.pageDir) this.project.pageDir = "";
        if (!this.project.componentDir) this.project.componentDir = "";
        if (this.project.pages.length === 0) {
          this.newPage();
        }

        (this as any).$eventBus.$on(
          BusEvents.COMPONENT_ADDED,
          this.componentAdded
        );
        (this as any).$eventBus.$on(
          BusEvents.PROJECT_CHANGED,
          this.projectChanged
        );
        (this as any).$eventBus.$on(
          BusEvents.COMPONENT_REMOVED,
          this.componentRemoved
        );
        (this as any).$eventBus.$on(
          BusEvents.GENERATE_COMPONENT,
          this.generateComponentTemplate
        );
        (this as any).$eventBus.$on(BusEvents.COMPONENT_UP, this.componentUp);
        (this as any).$eventBus.$on(
          BusEvents.COMPONENT_DOWN,
          this.componentDown
        );

        (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
      }
    } else {
      this.$router.push({
        path: "/index"
      });
      return;
    }
  }

  private componentUp(id: string) {
    let componentData: DragData = this.project.pages[this.selectedPage]
      .component;
    let dg: any = DragDataUtils.getParentByChildId(componentData, id);
    if (dg) {
      let child: any = dg.children.find((e: DragData) => {
        return e.id === id;
      });
      if (!child) return;
      let index: number = dg.children.indexOf(child);
      if (index <= 0) return;
      dg.children.splice(index, 1);
      dg.children.splice(index - 1, 0, child);
      console.log("componentUp:");
      console.dir(dg);
      (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
      (this as any).$eventBus.$emit(BusEvents.REFRESH_CHILD_COMPONENT);
      this.generatePageStructure(this.project.pages[this.selectedPage]);
      (this as any).$eventBus.$emit(BusEvents.SUB_COMPONENT_SELECTED, id);
    }
  }

  private componentDown(id: string) {
    let componentData: DragData = this.project.pages[this.selectedPage]
      .component;
    let dg: any = DragDataUtils.getParentByChildId(componentData, id);
    if (dg) {
      let child: any = dg.children.find((e: DragData) => {
        return e.id === id;
      });
      if (!child) return;
      let index: number = dg.children.indexOf(child);
      if (index < 0 || index >= dg.children.length - 1) return;
      dg.children.splice(index, 1);
      dg.children.splice(index + 1, 0, child);
      (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
      (this as any).$eventBus.$emit(BusEvents.REFRESH_CHILD_COMPONENT);
      this.generatePageStructure(this.project.pages[this.selectedPage]);
      (this as any).$eventBus.$emit(BusEvents.SUB_COMPONENT_SELECTED, id);
    }
  }

  private generateComponentTemplate(id: string) {
    let componentData: DragData = this.project.pages[this.selectedPage]
      .component;
    let result: any = DragDataUtils.getDataById(componentData, id);
    if (result) {
      if (
        result.customComponentData &&
        result.customComponentData.id &&
        result.customComponentData.id.length > 0
      ) {
        this.$confirm(
          "是否取消组件标识：" +
            result.customComponentData.name +
            "(生成代码时不再作为单独组件生成)",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            result.customComponentData = {};
            (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
          })
          .catch(() => {});
      } else {
        this.$prompt(
          "组件名称(生成组件代码时以名称命名，因此必须以英文命名)",
          "保存为组件（其位置信息将被删除）",
          {
            confirmButtonText: "确定",
            inputPattern: /.+/,
            inputErrorMessage: "组件名称不能为空",
            inputValue: ""
          }
        ).then((value: any) => {
          let tr: any = this.project.componentTemplates.find(
            (e: ComponentTemplateInfo) => {
              return e.name === value.value;
            }
          );
          if (tr) {
            this.$message({
              type: "error",
              message: "组件名称重复，请重新命名！"
            });
            this.generateComponentTemplate(id);
            return;
          }
          console.dir(value);
          console.log("original data:");
          console.dir(result);
          let newData: DragData = JSON.parse(JSON.stringify(result));
          delete newData.css["position"];
          delete newData.css["left"];
          delete newData.css["top"];
          delete newData.css["right"];
          delete newData.css["bottom"];
          console.log("newData:");
          console.dir(newData);
          let template: ComponentTemplateInfo = {
            id: (this as any).$uuid(),
            name: value.value,
            showName: value.value,
            component: newData
          };
          DragDataUtils.removeId(template.component);
          this.project.componentTemplates.push(template);
          result.customComponentData = {
            name: value.value,
            id: template.id
          };
          (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
          console.log("project info:");
          console.dir(this.project);
        });
      }
    }
  }

  /**
   * 组件生命周期：mounted
   *
   */
  mounted() {
    setTimeout(() => {
      let page: any = this.project.pages.find((e: PageInfo2) => {
        return e.isSelected;
      });
      console.log("selected page:");
      console.dir(page);
      if (page) {
        this.selectPage(page);
      }
    }, 50);
  }

  private componentRemoved() {
    this.generatePageStructure(this.project.pages[this.selectedPage]);
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
  }

  private timer!: any;

  private projectChanged() {
    // console.log("projectChanged");
    // console.log("time value:" + this.timer);
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(() => {
      // console.log("timer:" + new Date().getTime());
      ProjectModule.updateProject(this.project);
    }, 500);
  }

  private componentAdded(id: string, dragData: DragData) {
    console.log("selectedPage:" + this.selectedPage);
    console.dir(this.project.pages[this.selectedPage]);
    let data: any = this.addSubComponent(
      this.project.pages[this.selectedPage].component,
      id,
      dragData
    );
    console.log("componentAdded");
    console.log("id:" + id);
    console.log("dragData:");
    console.dir(dragData);
    console.log("components:");
    console.dir(this.project.pages[this.selectedPage].component);
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
    (this as any).$eventBus.$emit(BusEvents.REFRESH_CHILD_COMPONENT);
    this.generatePageStructure(this.project.pages[this.selectedPage]);
  }

  private addSubComponent(
    parent: DragData,
    id: string,
    child: DragData
  ): boolean {
    console.log("addSubComponent");
    console.log("parent:");
    console.dir(parent);
    if (parent.id === id) {
      console.log("added,id:" + id);
      parent.children.push(child);
      return true;
    } else {
      // console.error("addToSub");
      let data: any = parent.children.find((e: DragData) => {
        return this.addSubComponent(e, id, child);
      });
      return data ? true : false;
    }
  }

  public pageStructure: TreeData<DragData>[] = [];

  private generatePageStructure(page: PageInfo2) {
    let tree: TreeData<DragData> = this.createTreeDataFromComponent(
      page.component
    );
    console.log("page component tree:");
    console.dir(tree);

    this.pageStructure = [];
    this.pageStructure.push(tree);
  }

  private createTreeDataFromComponents(components: DragData[]) {
    let tree: TreeData<DragData>[] = [];
    components.forEach((e: DragData) => {
      tree.push(this.createTreeDataFromComponent(e));
    });
    return tree;
  }

  private createTreeDataFromComponent(component: DragData) {
    let leaf: TreeData<DragData> = new TreeData<DragData>();
    leaf.id = component.id;
    leaf.label = component.componentName;
    leaf.data = component;
    leaf.children = this.createTreeDataFromComponents(component.children);
    return leaf;
  }

  private handleClickNode(treeData: TreeData<DragData>, node: any, data: any) {
    console.log("handleClickNode");
    console.dir(treeData);
    console.dir(node);
    console.dir(data);
    let id: string = treeData.data.id;
    if (id === "pageDesign") return;
    (this as any).$eventBus.$emit(BusEvents.SUB_COMPONENT_SELECTED, id);
  }

  private mouseEnterNode(data: TreeData<ComponentInfo>) {
    // console.log("mouseEnterNode");
    // console.dir(data);
  }

  private mouseLeaveNode(data: TreeData<ComponentInfo>) {
    // console.log("mouseEnterNode");
    // console.dir(data);
  }

  public deletePage2(event: any, page: PageInfo2) {
    event.stopPropagation();
    this.$confirm("是否删除页面：" + page.name, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.deletePage(page);
      })
      .catch(() => {});
  }

  private generatePage(event: MouseEvent, page: PageInfo2) {
    event.stopPropagation();
    if (this.project.pageDir && this.project.pageDir.trim().length > 0) {
    } else {
      this.$message({
        type: "info",
        message: "请在项目信息里面配置页面代码保存的路径",
        duration: 2000
      });
    }
  }

  private previewPage(event: MouseEvent, page: PageInfo2) {
    event.stopPropagation();
    this.$router.push({
      path: "/page/preview/" + this.project.id + "/" + page.id
    });

    // this.$router.push({
    //   path: "/page/preview",
    //   query: {
    //     projectId: this.project.id,
    //     pageId: page.id
    //   }
    // });
  }

  private getPageComponent(page: PageInfo2) {
    let nd: DragData = JSON.parse(JSON.stringify(page.component));
    this.modifyId(nd);
    return nd;
  }
  private modifyId(dragData: DragData) {
    dragData.id = dragData.id + "1";
    if (dragData.children) {
      dragData.children.forEach((e: DragData) => {
        this.modifyId(e);
      });
    }
  }

  private savePageTemplate(event: MouseEvent, page: PageInfo2) {
    this.$prompt("模板名称", "将该页面保存为模板", {
      confirmButtonText: "确定",
      inputPattern: /.+/,
      inputErrorMessage: "模板名称不能为空",
      inputValue: ""
    }).then((value: any) => {
      console.dir(value);
      let template: PageTemplateInfo = {
        id: (this as any).$uuid(),
        name: value.value,
        showName: value.value,
        component: JSON.parse(JSON.stringify(page.component))
      };
      DragDataUtils.removeId(template.component);
      this.project.pageTemplates.push(template);
      (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
      console.log("project info:");
      console.dir(this.project);
    });
  }

  /**
   * 编辑页面
   */
  private changeTemplateName(event: MouseEvent, page: PageTemplateInfo) {
    event.stopPropagation();
    let oldValue: string = page.name;
    console.dir(oldValue);
    let current = this;
    this.$prompt("模板名称", "修改模板名称", {
      confirmButtonText: "确定",
      inputPattern: /.+/,
      inputErrorMessage: "模板名称不能为空",
      inputValue: oldValue
    }).then((value: any) => {
      console.dir(value);
      page.name = value.value;
      (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
    });
  }

  public deleteTemplate(event: any, page: PageTemplateInfo) {
    event.stopPropagation();
    this.$confirm("是否删除模板：" + page.name, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.deleteTemplate2(page);
      })
      .catch(() => {});
  }
  private deleteTemplate2(page: PageTemplateInfo) {
    let index: number = this.project.pageTemplates.indexOf(page);
    if (index < 0) return;
    this.project.pageTemplates.splice(index, 1);
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
  }

  private createPageFromTemplate(event: any, page: PageTemplateInfo) {
    event.stopPropagation();
    console.log("newPage");
    let newPage: PageInfo2 = {
      id: (this as any).$uuid(),
      name: "新页面",
      isSelected: false,
      component: JSON.parse(JSON.stringify(page.component))
    };
    DragDataUtils.generateStandardId(newPage.component);
    this.project.pages.push(newPage);
    this.selectPage(newPage);
    console.log("pages:");
    console.dir(this.project.pages);
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
  }

  /**
   * 编辑页面
   */
  private changeComponentTemplateName(
    event: MouseEvent,
    page: ComponentTemplateInfo
  ) {
    event.stopPropagation();
    let oldValue: string = page.name;
    console.dir(oldValue);
    let current = this;
    this.$prompt(
      "组件名称（生成代码以此命名，因此必须用英文)",
      "修改组件名称",
      {
        confirmButtonText: "确定",
        inputPattern: /.+/,
        inputErrorMessage: "组件名称不能为空",
        inputValue: oldValue
      }
    ).then((value: any) => {
      console.dir(value);
      page.name = value.value;
      (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
    });
  }

  public deleteComponentTemplate(event: any, page: ComponentTemplateInfo) {
    event.stopPropagation();
    this.$confirm("是否删除组件模板：" + page.name, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.deleteComponentTemplate2(page);
      })
      .catch(() => {});
  }
  private deleteComponentTemplate2(page: ComponentTemplateInfo) {
    let index: number = this.project.componentTemplates.indexOf(page);
    if (index < 0) return;
    this.project.componentTemplates.splice(index, 1);
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
  }

  public deleteColor(event: any, color: ColorInfo) {
    event.stopPropagation();
    this.$confirm("是否删除颜色值：" + color.color, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.deleteColor2(color);
      })
      .catch(() => {});
  }

  private deleteColor2(page: ColorInfo) {
    let index: number = this.project.colors.indexOf(page);
    if (index < 0) return;
    this.project.colors.splice(index, 1);
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
  }

  private addColorConfirm() {
    this.dialogFormVisible = true;
  }

  private addColorSuccess() {
    this.dialogFormVisible = false;
    let color: ColorInfo = {
      name: this.color2,
      color: this.color2
    };
    console.log("color:" + this.color2);

    let temp: any = this.project.colors.find((e: ColorInfo) => {
      return e.color === this.color2;
    });
    if (!temp) {
      this.project.colors.push(color);
      (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
    }
  }

  public deleteFontSize(event: any, fontSize: FontSizeInfo) {
    event.stopPropagation();
    this.$confirm("是否删除文字尺寸：" + fontSize.name, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.deleteFontSize2(fontSize);
      })
      .catch(() => {});
  }

  private deleteFontSize2(page: FontSizeInfo) {
    let index: number = this.project.fontSizes.indexOf(page);
    if (index < 0) return;
    this.project.fontSizes.splice(index, 1);
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
  }

  private addFontSizeDialogVisible: boolean = false;
  private inputFontSize: FontSizeInfo = new FontSizeInfo();
  private unitList: { text: string; value: string }[] = unitList;

  private addFontSizeConfirm() {
    this.addFontSizeDialogVisible = true;
  }

  private addFontSizeSuccess() {
    this.addFontSizeDialogVisible = false;
    this.inputFontSize.name = this.inputFontSize.size + this.inputFontSize.unit;
    if (!this.project.fontSizes) this.project.fontSizes = [];
    let temp: any = this.project.fontSizes.find((e: FontSizeInfo) => {
      return e.name === this.inputFontSize.name;
    });
    if (!temp) {
      this.project.fontSizes.push(this.inputFontSize);
      this.inputFontSize = JSON.parse(JSON.stringify(this.inputFontSize));
      this.inputFontSize.name = "";
      (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
    }
  }

  private browsePageDir() {
    console.log("browsePageDir");
    let that: any = this;
    dialog.showOpenDialog(
      {
        properties: [
          /* "openFile",  */ "openDirectory" /* , "multiSelections" */
        ]
      },
      function(files: any[]) {
        if (files) {
          console.log("selected path:" + files[0]);
          that.project.pageDir = files[0];
          that.$eventBus.$emit(BusEvents.PROJECT_CHANGED);
        }
      }
    );
  }

  private browseComponentDir() {
    console.log("browseComponentDir");
    let that: any = this;
    dialog.showOpenDialog(
      {
        properties: [
          /* "openFile",  */ "openDirectory" /* , "multiSelections" */
        ]
      },
      function(files: any[]) {
        if (files) {
          console.log("selected path:" + files[0]);
          that.project.componentDir = files[0];
          that.$eventBus.$emit(BusEvents.PROJECT_CHANGED);
        }
      }
    );
  }

  private projectNameChanged(e: any) {
    console.log("projectNameChanged");
    console.dir(e);
    (this as any).$eventBus.$emit(BusEvents.PROJECT_CHANGED);
  }
}
</script>

<style>
html,
body,
#app {
  height: 100vh;
  user-select: none;
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
  overflow-y: auto;
  overflow-x: hidden;
}
.tool-item-title {
  display: block;
  padding: 8px;
  background-color: #eee;
}
.component-aside {
  height: 100vh;
  border-bottom: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  overflow: scroll;
}
.el-tabs {
  height: 100%;
}

.el-tabs-content {
  height: 100vh;
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

.active {
  border: 2px solid black;
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
  width: 100%;
}
.list-item {
  background-color: #dedede;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  border-width: 2px;
}
/* .page-list ul li {
  padding: 8px 2px 8px 12px;
  cursor: pointer;
} */
/* .page-list ul li:hover {
  background-color: #dcdfe6;
}
.page-list ul .isSelected {
  background-color: #b6b9bd;
} */
.page-name {
  display: inline-block;
  width: 100%;
  line-height: 28px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
}
.page-list .page-oper {
  display: inline-block;
}

.el-tree-node__expand-icon {
  display: none;
  padding: 0px;
  margin: 0px;
}
.page-preview-item {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: #dedede;
}
.page-preview {
  width: 125px;
  height: 200px;
  transform: scale(0.3333) translate(-62.5px, -200px);
  -ms-transform: scale(0.3333) translate(-62.5px, -200px);
  -webkit-transform: scale(0.3333) translate(-125px, -200px);
  background-color: white;
}
/*-----------页面列表样式 END-------------*/
.flex_box_center {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.component-preview-item {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: #dedede;
  padding: 10px;
}
.component-preview-container {
  width: 100%;
  box-sizing: border-box;
  background-color: white;
}

.component-preview {
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: block;
}
.flex_box_vertical {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.flex_box_horizontal {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
.flex_box_vertical_start {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
