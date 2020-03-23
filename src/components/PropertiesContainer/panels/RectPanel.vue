<template>
  <div class="rect-panel">
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
export default class RectPanel extends Mixins(PanelMixin, ComponentLoader2) {
  mounted() {
    console.log("rect panel mounted");
    console.dir(this.schema);
  }
}
</script>
