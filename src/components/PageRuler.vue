<!-- 页面标尺组件 -->
<template>
  <div class="ef-ruler">
    <div
      class="corner"
      :style="{ top: scrollTop + 'px', left: scrollLeft + 'px' }"
    ></div>
    <div
      class="ruler top"
      :style="{ top: scrollTop + 'px', width: width + 'px' }"
    >
      <div
        class="tick"
        v-for="tick of ticks"
        v-bind:class="tick.class"
        v-bind:style="{ left: tick.left + 'px' }"
      >
        <span v-if="tick.class === 'major'">{{ tick.value }}</span>
      </div>
    </div>
    <div
      class="ruler left"
      :style="{ left: scrollLeft + 'px', height: height + 'px' }"
    >
      <div
        class="tick"
        v-for="tick of ticks"
        v-bind:class="tick.class"
        v-bind:style="{ top: tick.left + 'px' }"
      >
        <span v-if="tick.class === 'major'">{{ tick.value }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class PageRuler extends Vue {
  @Prop({ default: 0 }) public width!: number;
  @Prop({ default: 0 }) public height!: number;
  @Prop({ default: 0 }) public pageWidth!: number;
  @Prop({ default: 0 }) public pageHeight!: number;
  @Prop({ default: 0 }) public scrollTop!: number;
  @Prop({ default: 0 }) public scrollLeft!: number;

  private ruleWidth: number = this.width;
  private ruleHeight: number = this.height;

  @Watch("width", { deep: true, immediate: true })
  widthChanged() {
    this.ruleWidth = this.width;
  }

  @Watch("height", { deep: true, immediate: true })
  heightChanged() {
    this.ruleHeight = this.height;
  }

  get scale() {
    //两边边距80
    let realWidth = this.width;
    let scale = this.pageWidth / realWidth;
    return scale;
  }
  get minX() {
    let realWidth = this.width;
    // let leftWidth = (this.ruleWidth - realWidth) / 2;
    let leftWidth = 50;
    let result = parseInt(-(leftWidth * this.scale) + "", 0);
    console.log("minX:" + result);
    return result;
  }
  get maxX() {
    let realWidth = this.width;
    // let leftWidth = (this.ruleWidth - realWidth) / 2;
    let leftWidth = Math.min(this.ruleWidth, realWidth) - 50;
    let result = parseInt(leftWidth * this.scale + "", 0);
    console.log("maxX:" + result);
    return result;
  }
  get left() {
    return 10 / this.scale;
  }
  get ticks() {
    let ticks = [];
    var i = 0;
    console.log(this.minX % 20);
    let offset = this.minX % 20;
    ticks[i] = { class: "micro", value: this.minX, left: offset };
    i++;

    let minX = this.minX - offset;
    let majorIndex = 0;
    let className = "";

    //先处理非整20的数据
    for (var x = minX; x <= this.maxX; x += 20) {
      if (x % 100 === 0) {
        className = "major";
        majorIndex = i;
      } else {
        className = (i - majorIndex) % 2 === 0 ? "minor" : "micro";
      }
      ticks[i] = { class: className, value: x, left: this.left * 2 * i };
      i++;
    }
    // console.log(ticks);
    return ticks;
  }
}
</script>

<style scoped>
.ef-ruler {
  position: relative;
  z-index: 999;
}
.ef-ruler .corner {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #000;
  z-index: 999;
}
.ef-ruler .top {
  position: absolute;
  top: 0;
  left: 18px;
  width: 1300px;
  height: 18px;
  border-bottom: 1px solid #000;
}

.ef-ruler .ruler {
  background: none repeat scroll 0% 0% #fff;
  color: #444;
  font-family: source code pro, "Arial Narrow", "Helvetica Neue", Helvetica,
    Arial, Veranda, sans-serif;
  font-size: 9px;
  line-height: 14px;
  overflow: hidden;
  z-index: 1;
}

.ef-ruler .top-line {
  position: absolute;
  top: 0;
  width: 0;
  height: 18px;
  border-left: 1px solid #000;
  z-index: 3;
}

.ef-ruler .top .major {
  position: absolute;
  top: 0;
  width: 1px;
  height: 100%;
  text-indent: 1px;
}

.ef-ruler .left {
  line-height: 36px;
}

.ef-ruler .tick {
  background: none repeat scroll 0% 0% #444;
}

.ef-ruler .top .micro {
  position: absolute;
  bottom: 0px;
  width: 1px;
  height: 4px;
}

.ef-ruler .top .minor {
  position: absolute;
  bottom: 0px;
  width: 1px;
  height: 6px;
}

.ef-ruler .left {
  position: absolute;
  top: 18px;
  left: 0;
  width: 18px;
  height: 800px;
  border-right: 1px solid #000;
}

.ef-ruler .left .major {
  position: absolute;
  right: 0;
  height: 1px;
  width: 100%;
  text-indent: 1px;
}
.ef-ruler .left .major span {
  display: block;
  -moz-transform: rotate(
    -90deg
  ); /* Firefox 旋转属性，参数表示角度(deg表示角度)，负数逆时针，正数顺时针 */
  -webkit-transform: rotate(-90deg); /* Safari和Chrome */
  -ms-transform: rotate(-90deg); /* IE 9 */
  -o-transform: rotate(-90deg); /* Opera */
  transform: rotate(-90deg);
}

.ef-ruler .left .micro {
  position: absolute;
  right: 0px;
  height: 1px;
  width: 4px;
}

.ef-ruler .left .minor {
  position: absolute;
  right: 0px;
  height: 1px;
  width: 6px;
}
</style>
