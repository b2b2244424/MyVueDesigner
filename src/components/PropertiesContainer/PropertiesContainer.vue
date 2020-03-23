<template>
  <div class="properties-container">
    <div class="properties-content" v-if="showProperties">
      <!-- <div class="properties-line f f-ai-c">
        <span class="f-fs-0 mr-10">{{
          $i18n(`designer.properties.name`)
        }}</span>
        <el-input
          class="properties-name"
          value=""
          size="mini"
          :placeholder="$i18n(`designer.properties.name`)"
          @input="val => change('name', val)"
        />
      </div>

      <rect-panel
        class="properties-panel"
        :schema="commonSchemas.rect"
        :data="{}"
        @change="changeStyle"
        v-if="
          commonSchemas.rect.display && commonSchemas.rect.display !== false
        "
      ></rect-panel> -->
      <el-collapse class="properties-collapse" v-model="actives">
        <el-collapse-item
          name="custom"
          v-if="
            selectedComponentInfo.schema &&
              selectedComponentInfo.schema.properties
          "
        >
          <template slot="title">
            {{ $i18n(`designer.properties.title.custom`) }}
          </template>
          <ul class="properties-item">
            <li
              v-for="(item, key) in selectedComponentInfo.schema.properties"
              :key="key"
            >
              <span>{{ $i18n(`designer.properties.custom.${key}`) }}</span>
              <component
                class="f-f-1"
                :is="loadComponent(item.format)"
                :schema="item"
                :value="
                  selectedComponentInfo.data[key]
                    ? selectedComponentInfo.data[key]
                    : ''
                "
                @change="value => change2(key, value)"
              ></component>
            </li>
          </ul>
        </el-collapse-item>
        <template v-for="(schema, key, i) in commonSchemas">
          <el-collapse-item
            :name="schema.title"
            :key="schema.title"
            v-if="key !== 'rect'"
          >
            <template slot="title">
              {{ $i18n(`designer.properties.title.${schema.title}`) }}
            </template>
            <component
              class="properties-panel"
              :is="loadPanel(schema.format)"
              :schema="schema"
              :data="selectedComponentInfo.css"
              @change="changeStyle"
            ></component>
          </el-collapse-item>
        </template>
      </el-collapse>
      <p style="text-align: center;padding: 15px;">
        ~ 分割线 ~
      </p>
      <el-collapse v-model="actives">
        <template v-for="(schema, key, i) in styleSchemas">
          <el-collapse-item :name="schema.title" :key="schema.title">
            <template slot="title">
              {{ schema.title }}
            </template>
            <ul class="properties-item">
              <li v-for="(item, key, index) in schema.properties" :key="key">
                <span>{{ key }}</span>
                <component
                  class="f-f-1"
                  :is="loadComponent(item.format)"
                  :schema="item"
                  :readonly="item.readonly ? true : false"
                  v-model="selectedComponentInfo.css[key]"
                  @change="value => changeStyle(key, value)"
                ></component>
              </li>
            </ul>
          </el-collapse-item>
        </template>

        <el-collapse-item name="style">
          <template slot="title">
            style
          </template>
          <code2 value=""></code2>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div v-else>请选择组件</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
import ComponentType from "../../types/ComponentType";
import styleSchemas from "../../configs/styleSchemas";
import commonSchemas from "../../configs/commonSchemas";
import RectPanel from "./panels/RectPanel.vue";
import Code2 from "./components/code.vue";
import ComponentLoader2 from "../../mixins/ComponentLoader2";
import BusEvents from "../../events/BusEvents";

// TODO
// 增加确认操作，或者输入框回车生效。避免实时生效带来的性能问题。
// 声明临时数据承载用户编辑，保存后循环赋值。
// 对属性定制UI视图
@Component({
  components: {
    RectPanel,
    Code2
  }
})
export default class PropertiesContainer extends Mixins(ComponentLoader2) {
  public actives: string[] = ["name", "style"];
  public defaultCssData: any = {
    color: "",
    opacity: 1,
    backgroundColor: "",
    borderColor: "",
    borderStyle: "none",
    borderWidth: "0px",
    borderRadius: "0px"
  };

  public commonSchemas: any = commonSchemas;
  public styleSchemas: any = styleSchemas;
  public selectedComponentInfo: ComponentType = {
    type: ComponentType.TYPE_NONE,
    libName: "",
    categoryName: "",
    componentName: "",
    id: "",
    schema: {},
    data: {},
    css: {}
  };

  mounted() {
    (this as any).$eventBus.$on("componentSelected", this.onComponentSelected);
  }

  get showProperties() {
    let result: boolean =
      this.selectedComponentInfo && this.selectedComponentInfo.id !== "";
    console.log("showProperties:" + result);
    return result;
  }

  private onComponentSelected(type: ComponentType) {
    // console.log("commonSchemas:");
    // console.dir(this.commonSchemas);
    // console.log("component data:");
    // console.dir(type);
    this.selectedComponentInfo = type;
  }

  private changeStyle(key: string, value: any) {
    console.log("change style,key:" + key + ";value:" + value);
    console.dir(value);
    this.$set(this.selectedComponentInfo.css, key, value);
    console.log("result css:");
    console.dir(this.selectedComponentInfo.css);
    (this as any).$eventBus.$emit(
      BusEvents.CHANGE_STYLE,
      this.selectedComponentInfo.id,
      key,
      value
    );
  }

  private change2(key: string, value: any) {
    console.log("key:" + key + ";value:" + value);
    this.$set(this.selectedComponentInfo.data, key, value);
    (this as any).$eventBus.$emit(
      BusEvents.CHANGE_CUSTOM_DATA,
      this.selectedComponentInfo.id,
      key,
      value
    );
  }
}
</script>
<style lang="less">
@import "../../styles/variables";
.properties {
  &-container {
    .el-collapse {
      border-top: none;
      &-item__header {
        height: 30px;
        line-height: 30px;
        padding-left: 8px;
        // color: @primary-color;
        font-weight: 600;
        font-size: 14px;
        background: @white-color;
        // &:hover {
        //     color: @white-color;
        //     background: @accent-color;
        // }
      }
      &-item__arrow {
        line-height: 30px;
      }
      &-item__wrap {
        background: transparent;
      }
      &-item__content {
        padding-bottom: 0;
      }
    }
  }
  &-content {
    padding-bottom: 150px;
  }
  &-panel {
    padding: 20px 10px 10px;
    > ul > li {
      padding: 0 6px;
      margin-bottom: 20px;
    }
  }
  &-line {
    padding: 20px 16px 0;
    i {
      font-size: @font-size-large;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: @white-color;
      }
      &:first-of-type {
        margin: 0;
      }
    }
  }
  &-item {
    & > li {
      display: flex;
      align-items: center;
      //   border: 1px solid #333;
      height: 30px;
      padding: 0 24px 0 16px;
      & > span {
        width: 80px;
      }
    }
  }
}
</style>
