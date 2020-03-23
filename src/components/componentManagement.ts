import ButtonComponent from "./ButtonComponent.vue";
import IconComponent from "./IconComponent.vue";
import ImageComponent from "./ImageComponent.vue";
import TextComponent from "./TextComponent.vue";
import LinkComponent from "./LinkComponent.vue";
import TagComponent from "./TagComponent.vue";
import InputComponent from "./InputComponent.vue";
import DivComponent from "./DivComponent.vue";
import HorizontalLayout from "./HorizontalLayout.vue";
import VerticalLayout from "./VerticalLayout.vue";
import AbsoluteBox from "./AbsoluteBox.vue";

/**
 * 组件管理JS
 */

export default {
  registComponents: {
    ButtonComponent: ButtonComponent,
    IconComponent: IconComponent,
    ImageComponent: ImageComponent,
    TextComponent: TextComponent,
    LinkComponent: LinkComponent,
    TagComponent: TagComponent,
    InputComponent: InputComponent,
    DivComponent: DivComponent,
    HorizontalLayout: HorizontalLayout,
    VerticalLayout: VerticalLayout,
    AbsoluteBox: AbsoluteBox
  }
};
