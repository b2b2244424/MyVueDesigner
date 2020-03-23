<template>
  <div class="border-panel">
    <ul class="f f-fw-w">
      <li
        :class="{ 'w-percent-50': item.format === 'cssunit' }"
        v-for="(item, key) in schema.properties"
        :key="key"
      >
        <component
          :is="loadComponent(item.format)"
          :title="$i18n(`designer.properties.${key}`)"
          :schema="item"
          :value="data[key]"
          @change="val => change(key, val)"
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
export default class BorderPanel extends Mixins(PanelMixin, ComponentLoader2) {}
</script>

<style lang="less">
.border-panel {
  .properties-select {
    width: 80px;
  }
}
</style>
