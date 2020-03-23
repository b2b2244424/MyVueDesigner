<template>
  <MainLayout class="tenon">
    <div class="tenon-projects f-f-1 f f-fw-w f-ac-fs">
      <div
        class="tenon-project-card f f-fd-c f-jc-sb"
        v-for="item in projects"
        :key="item.id"
      >
        <div class="tenon-project-title f f-ai-b f-jc-sb">
          <h2 class="ellipsis-line-clamp-3">
            {{ item.name }}
          </h2>
          <el-dropdown
            trigger="click"
            size="medium"
            @command="c => moreEvent(c, item.id)"
          >
            <i class="el-icon-more" title="More"></i>
            <el-dropdown-menu class="tenon-project-more" slot="dropdown">
              <el-dropdown-item
                :command="item.value"
                v-for="item in moreList"
                :key="item.value"
              >
                <i :class="`icon-${item.value}`" :title="item.text"></i>
                {{ item.value }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="tenon-project-action f f-jc-sb">
          <a :href="getProjectLink(item.id).editor">Designer</a>
          <a :href="getProjectLink(item.id).viewer">Viewer</a>
        </div>
      </div>
      <div class="tenon-project-add" @click="addEvent">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <ProjectForm
      :visible.sync="visible"
      :edit="edit"
      :project="project"
      @confirm="confirm"
      @cancel="cancel"
    ></ProjectForm>
  </MainLayout>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ProjectForm from "../components/ProjectForm.vue";
import ProjectModule from "../store/modules/ProjectModule";
import ProjectInfo from "../types/ProjectInfo";
import MainLayout from "../components/MainLayout.vue";
@Component({
  components: {
    ProjectForm,
    MainLayout
  }
})
export default class ProjectListPanel extends Vue {
  private visible: boolean = false;
  private edit: boolean = false;
  private projects: ProjectInfo[] = ProjectModule.projects;
  private project: ProjectInfo = new ProjectInfo();
  private moreList: any[] = [
    {
      text: "Share",
      value: "share"
    },
    {
      text: "Edit",
      value: "edit"
    },
    {
      text: "Duplicate",
      value: "duplicate"
    },
    {
      text: "Remove",
      value: "delete"
    }
  ];

  private confirm(data: ProjectInfo) {
    // this.edit ? this.updateProject(data) : this.addProject(data);
    this.addProject(data);
  }
  private cancel() {
    this.visible = false;
  }

  private addProject(data: ProjectInfo) {
    ProjectModule.addProject(data);
    this.visible = false;
    this.reset();
  }

  private updateProject(data: any) {
    const index = this.projects.findIndex(item => item.id === data.id);
    this.projects.splice(index, 1, data);
    this.visible = false;
    this.edit = false;
    this.reset();
  }
  private reset() {}
  private addEvent() {
    this.reset();
    this.visible = true;
  }
  private editProject(id: string) {
    // const project = this.projects.find(item => item.id === id);
    // this.project = JSON.parse(JSON.stringify(project));
    // this.edit = true;
    // this.visible = true;
  }
  private removeProject(id: string) {
    let project: any = this.projects.find((e: ProjectInfo) => {
      return e.id === id;
    });
    if (project) {
      ProjectModule.removeProject(project);
    }
  }

  private shareProject(id: string) {
    const link = this.getProjectLink(id).viewer;
    const text = `${window.location.origin}${window.location.pathname}${link}`.replace(
      /(\/)\1+/g,
      "/"
    );
    // this.$copyText(text).then(
    //   e => {
    //     console.log(e);
    //     this.$Message.success("clipboard");
    //   },
    //   e => {
    //     this.$Message.success("unclipboard");
    //     console.log(e);
    //   }
    // );
  }
  private duplicateProject(id: string) {
    const project = this.projects.find(item => item.id === id);
    const duplicateProject = JSON.parse(JSON.stringify(project));
    duplicateProject.id = (this as any).$uuid();
    duplicateProject.name = `Duplicate ${duplicateProject.name}`;
    this.projects.push(duplicateProject);
  }
  private moreEvent(key: string, id: string) {
    switch (key) {
      case "share":
        this.shareProject(id);
        break;
      case "edit":
        this.editProject(id);
        break;
      case "duplicate":
        this.duplicateProject(id);
        break;
      case "delete":
        this.removeProject(id);
        break;
      default:
        break;
    }
  }

  private fetchProjects() {
    const data = localStorage.getItem("Tenon-projects");
    this.projects = data ? JSON.parse(data) : [];
  }
  private getProjectLink(id: string) {
    return {
      // editor: `/myvuedesigner2/designer#/projects/${id}`,
      // viewer: `/myvuedesigner2/viewer#/projects/${id}`
      editor: `/designer#/projects/${id}`,
      viewer: `/index.html`
    };
  }
  created() {}
}
</script>
<style lang="less">
@import "~styles/variables";
.tenon {
  background: #e6e8ec;
  &-header {
    height: 50px;
    line-height: 50px;
    background-color: @primary-color;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
    h1 {
      color: @white-color;
      font-size: 18px;
      font-weight: 700;
    }
    img {
      width: 45px;
      height: 45px;
      padding: 8px;
    }
    i {
      display: inline-block;
      width: 50px;
      text-align: center;
      color: @primary-light-color;
      font-size: 16px;
      &:hover {
        color: @white-color;
      }
    }
  }
  &-projects {
  }
  &-project {
    &-card {
      position: relative;
      width: 180px;
      height: 150px;
      margin: 10px 5px;
      padding: 8px;
      border-radius: 3px;
      color: #464c59;
      background: @white-color;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      transition-timing-function: ease-in-out;
      transition-duration: 0.2s;
      transition-property: transform, box-shadow;
      &:hover {
        box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
      }
      // &:before {
      //     position: absolute;
      //     top: 0;
      //     right: 0;
      //     bottom: 0;
      //     left: 0;
      //     z-index: -1;
      //     background: @white-color center
      //         url("../../assets/images/bg.png") no-repeat;
      //     background-size: 27px * 1.4 30px * 1.4;
      //     content: "";
      // }
    }
    &-title {
      h2 {
        padding: 0 8px;
        font-size: 15px;
        font-weight: 600;
        color: @dark-text-color;
      }
      i {
        padding: 8px;
        transform: rotate(90deg);
        cursor: pointer;
        &:hover {
          color: @accent-color;
        }
      }
    }
    &-more {
      li {
        i {
          margin-right: 6px;
        }
      }
    }
    &-action {
      a {
        padding: 8px;
        color: @primary-text-color;
        transition-timing-function: ease-in-out;
        transition-duration: 0.2s;
        transition-property: transform;
        &:hover {
          color: @accent-color;
          transform: translateY(-4px);
        }
      }
    }
    &-add {
      width: 180px;
      height: 150px;
      line-height: 150px;
      margin: 10px 5px;
      padding: 10px;
      text-align: center;
      border-radius: 3px;
      color: @primary-text-color;
      background: @white-color;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
      cursor: pointer;
      &:hover {
        color: @white-color;
        background: @accent-color;
      }
      i {
        font-size: 40px;
      }
    }
  }
}
</style>
