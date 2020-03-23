<template>
  <el-dialog
    title="新建项目"
    width="500px"
    :append-to-body="true"
    :visible.sync="currentVisible"
    class="project-add"
    :show-close="false"
    :close-on-click-modal="false"
  >
    项目名称：
    <el-input type="text" v-model="name" />
    宽度：
    <el-input type="number" v-model="width" />
    高度：
    <el-input type="number" v-model="height" />
    初始容器：<br />
    <el-select v-model="container" style="width:100%;">
      <el-option
        v-for="item in containers"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hide">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ProjectInfo from "../types/ProjectInfo";
import loaderDelegate from "../mixins/loaderDelegate";
@Component({})
export default class ProjectForm extends Vue {
  @Prop({ default: false })
  public visible!: boolean;
  @Prop({ default: false })
  public edit!: boolean;
  @Prop({ default: new ProjectInfo() })
  public project!: ProjectInfo;

  public containers: any[] = [
    {
      value: 0,
      label: "绝对布局（可随意拖动）"
    },
    {
      value: 1,
      label: "垂直盒子（从上向下添加）"
    }
  ];

  private container: number = 0;
  private name: string = "";
  private width: number = 375;
  private height: number = 600;

  get currentVisible() {
    return this.visible;
  }

  private hide() {
    this.$emit("hide");
  }

  private confirm() {
    this.hide();
    let project: ProjectInfo = this.createNewProject();
    this.$emit("confirm", project);
    this.container = 0;
    this.name = "";
    this.width = 375;
    this.height = 600;
  }

  private createNewProject(): ProjectInfo {
    let libName: string = "";
    let categoryName: string = "";
    let componentName: string = "";
    switch (this.container) {
      case 0:
        libName = "common";
        categoryName = "layout";
        componentName = "AbsoluteBox";
        break;
      case 1:
        libName = "common";
        categoryName = "layout";
        componentName = "VerticalBox";
        break;
    }
    return {
      id: (this as any).$uuid(),
      config: {
        width: this.width,
        height: this.height,
        backgroundColor: "#fff",
        margin: "78px 0 0 78px",
        border: "2px dashed #ccc",
        zIndex: 1,
        css: {}
      },
      pages: [],
      colors: [],
      fontSizes: [],
      pageTemplates: [],
      componentTemplates: [],
      name: this.name,
      componentDir: "",
      pageDir: "",
      defaultPageTemplate: {
        id: "",
        name: "",
        showName: "",
        component: {
          libName: libName,
          categoryName: categoryName,
          componentName: componentName,
          id: "pageDesign",
          style: "",
          defaultData: loaderDelegate.loadDefaultData(
            libName,
            categoryName,
            componentName
          ),
          children: [],
          css: {
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            position: "relative"
          },
          useless: "",
          customComponentData: {}
        }
      }
    };
  }

  created() {}
}
</script>
<style lang="less">
@import "~styles/variables";

.project {
  &-template {
    padding: 15px 0;
    li {
      padding: 8px 10px;
      cursor: pointer;
    }
    .active {
      color: @white-color;
      background: @accent-color;
    }
  }
}
</style>
