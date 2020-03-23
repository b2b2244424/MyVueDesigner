<template>
  <div class="page-container">
    <component
      v-if="page && page.component && page.component.libName"
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
</template>

<script lang="ts">
import PageComponentOption from "../components/PageComponent.vue";
import axios from "axios";
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import ProjectInfo from "../types/ProjectInfo";
import PageInfo2 from "../types/PageInfo2";
import ComponentLoader from "../mixins/ComponentLoader";
import ProjectModule from "../store/modules/ProjectModule";
@Component({})
export default class ViewPage extends Mixins(ComponentLoader) {
  public pageId: string = "";
  public projectId: string = "";
  public page: PageInfo2 = new PageInfo2();

  public renderPage() {
    var current = this;
    let projects: ProjectInfo[] = ProjectModule.projects;
    let project: any = projects.find((e: ProjectInfo) => {
      return e.id === this.projectId;
    });
    if (project) {
      let pi: any = project.pages.find((e: PageInfo2) => {
        return e.id === this.pageId;
      });
      if (pi) {
        this.page = pi;
        console.log("page:");
        console.dir(this.page);
      }
    }
  }

  created() {
    console.log("created");
    this.pageId = this.$route.params.pageId as string;
    this.projectId = this.$route.params.projectId as string;
    console.error("projectId:" + this.projectId + ";pageId:" + this.pageId);

    this.renderPage();
  }
}
</script>

<style scoped>
.page-container {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>
