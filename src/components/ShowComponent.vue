<template>
  <div>
    <component
      class="layout-container"
      :is="asyncLoadComponent(component.name)"
      :data-component-id="component.id"
      :data-component-name="component.name"
      :data-component-layout="component.layout"
      :properties.sync="component.properties"
    >
    </component>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Mixins } from "vue-property-decorator";
@Component({
  components: {}
})
export default class ShowComponent extends Vue {
  @Prop({ default: "" })
  public libName: string = "";
  @Prop({ default: "" })
  public categoryName: string = "";
  @Prop({ default: "" })
  public componentName: string = "";
}
</script>
