<template>
  <div
    style="width:200px;height:40px;display:flex;flex-direction:row;"
    @click="chooseColor"
  >
    <span>请选择颜色：</span>
    <div
      style="width:160px;height:40px;border-style: solid;border-width: 2px;border-color: black;"
      :style="{ 'background-color': value }"
    ></div>
    <choose-color-dialog
      :visible="visible"
      :project="project"
      @confirm="colorSelected"
      @hide="cancel"
    />
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import ComponentMixins from "../../../mixins/ComponentMixins";
import ChooseColorDialog from "../../ChooseColorDialog.vue";
import ProjectInfo from "../../../types/ProjectInfo";
import ProjectModule from "../../../store/modules/ProjectModule";
@Component({
  components: {
    ChooseColorDialog
  }
})
export default class PropertiesColor extends Mixins(ComponentMixins) {
  private visible: boolean = false;
  private project!: ProjectInfo;

  private chooseColor() {
    this.visible = true;
  }

  private colorSelected(color: string) {
    this.change(color);
    this.visible = false;
  }
  private cancel() {
    this.visible = false;
  }

  created() {
    let index: number = ProjectModule.selectedIndex;
    let projects: ProjectInfo[] = ProjectModule.projects;
    if (index >= 0 && index < projects.length) {
      this.project = projects[index];
    } else {
      this.project = new ProjectInfo();
    }
  }
}
</script>
<style lang="less">
.properties-colorPicker {
  .el-color-picker__trigger {
    padding: 1px;
  }
}
</style>
