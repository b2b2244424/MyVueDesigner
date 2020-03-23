<template>
  <div class="font-panel">
    <ul class="f f-fw-w f-ai-fe">
      <li
        :class="{ 'w-percent-50': ['select', 'cssunit'].includes(item.format) }"
        v-for="(item, key) in schema.properties"
        :key="key"
      >
        <el-radio-group
          :value="data[key]"
          size="mini"
          @input="val => change(key, val)"
          v-if="item.format === 'radio'"
        >
          <el-radio-button
            v-for="item in item.enum"
            :key="item.value"
            :label="item.value"
          >
            <!-- <i :class="`icon-${key}-${item.value}`" /> -->
          </el-radio-button>
        </el-radio-group>
        <el-input
          :value="data[key]"
          :readonly="item.readonly"
          size="mini"
          @input="val => change(key, val)"
          v-else-if="key === 'fontFamily'"
        >
          <template slot="prepend">{{
            $i18n(`designer.properties.${key}`)
          }}</template>
        </el-input>
        <component
          :is="loadComponent(item.format)"
          :title="$i18n(`designer.properties.${key}`)"
          :placeholder="$i18n(`designer.properties.${key}`)"
          :schema="item"
          :value="data[key]"
          @change="val => change(key, val)"
          v-else
        ></component>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import PanelMixin from "../../../mixins/PanelMixin";
import ComponentLoader2 from "../../../mixins/ComponentLoader2";
@Component({
  components: {}
})
export default class FontPanel extends Mixins(PanelMixin, ComponentLoader2) {}
</script>
<style lang="less">
.font-panel {
  .el-radio-button__inner {
    padding: 7px 8px;
  }
}
</style>
