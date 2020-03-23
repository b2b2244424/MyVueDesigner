<template>
  <el-dialog
    title="选择颜色"
    width="500px"
    :append-to-body="true"
    :visible.sync="currentVisible"
    class="project-add"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div style="display:flex;flex-direction:row;flex-wrap:wrap;width:100%;">
      <div
        class="flex_box_vertical"
        style="width:80px;"
        v-for="(colorInfo, index) in project.colors"
        :key="index"
        @click="chooseColor(colorInfo.color)"
      >
        <div
          :style="{
            backgroundColor: colorInfo.color,
            height: '40px',
            width: '60px'
          }"
        ></div>
        <span class="page-name" :title="colorInfo.color">{{
          colorInfo.color
        }}</span>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取消</el-button>
      <!-- <el-button type="primary" @click="confirm">确定</el-button> -->
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ProjectInfo from "../types/ProjectInfo";
import loaderDelegate from "../mixins/loaderDelegate";
@Component({})
export default class ChooseColorDialog extends Vue {
  @Prop({ default: false })
  public visible!: boolean;
  @Prop({ default: new ProjectInfo() })
  public project!: ProjectInfo;

  private color: string = "";

  get currentVisible() {
    return this.visible;
  }

  private hide() {
    this.$emit("hide");
  }

  private confirm() {
    this.hide();
    this.$emit("confirm", this.color);
  }

  private chooseColor(color: string) {
    this.$emit("confirm", color);
  }

  created() {}
}
</script>
<style lang="less" scoped>
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

.flex_box_vertical {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
