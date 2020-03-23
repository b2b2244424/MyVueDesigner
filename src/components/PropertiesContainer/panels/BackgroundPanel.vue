<template>
  <div class="background-panel">
    <ul class="f f-fw-w">
      <li
        :class="{ 'w-percent-100': item.format === 'slider' }"
        v-for="(item, key) in schema.properties"
        :key="key"
      >
        <div class="f f-ai-c" v-if="item.format === 'slider'">
          <span class="mr-15">{{ $i18n(`designer.properties.${key}`) }}</span>
          <el-slider
            class="f-f-1"
            v-model="sliderValue[key]"
            :min="0"
            :max="1"
            :step="0.1"
            @change="val => change2(key, val)"
          />
        </div>
        <component
          :is="loadComponent(item.format)"
          :title="$i18n(`designer.properties.${key}`)"
          :placeholder="$i18n(`designer.properties.${key}`)"
          :schema="item"
          :value="data[key]"
          @change="val => change(key, val)"
          v-else
        />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue, Watch } from "vue-property-decorator";
import PanelMixin from "../../../mixins/PanelMixin";
import ComponentLoader2 from "../../../mixins/ComponentLoader2";
@Component({
  components: {}
})
export default class BackgroundPanel extends Mixins(
  PanelMixin,
  ComponentLoader2
) {
  created() {
    console.log("BackgroundPanel created");
    console.dir(this.schema);
  }

  public sliderValue: { [key: string]: any } = {};

  @Watch("data", { deep: true, immediate: true })
  onDataChanged() {
    for (var key in this.schema.properties) {
      // console.error("------------------------------------");
      let value: any = this.schema.properties[key];
      // console.log("key:" + key);
      // console.dir(this.data[key]);
      if (value.format === "slider") {
        this.$set(
          this.sliderValue,
          key,
          this.data[key] ? this.data[key] : value.defaultValue
        );
      }
    }
  }

  public change2(key: string, value: any) {
    console.log("change2,key:" + key + ";value:" + value);
    this.data[key] = value;
    this.$set(this.data, key, value);
    this.change(key, value);
  }
}
</script>
<style lang="less">
.background-panel {
  > ul > li {
    padding: 4px;
  }
  .properties-select {
    width: 75px;
  }
}
</style>
