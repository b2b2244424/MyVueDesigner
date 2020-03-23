<template>
  <div class="box-panel">
    <ul class="f f-fw-w">
      <li
        class="w-percent-50"
        v-for="(item, key) in schema.properties"
        :key="key"
      >
        <component
          :is="loadComponent(item.format)"
          :title="$i18n(`designer.properties.${key}`)"
          :schema="item"
          :value="getValue(key)"
          @change="val => change2(key, val)"
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
export default class BoxPanel extends Mixins(PanelMixin, ComponentLoader2) {
  public getValue(key: string) {
    let value: any = this.data[key];
    if (value) {
      return value;
    } else {
      return "";
    }
  }

  public change2(key: string, value: any) {
    this.$set(this.data, key, value);
    this.change(key, value);
  }
}
</script>
