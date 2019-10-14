import Textarea from "./textarea.vue";
import Input from "./input.vue";
import Select from "./select.vue";
import Number from "./number.vue";
import Checkbox from "./checkbox.vue";
import Radio from "./radio.vue";
let formList = [Checkbox, Input, Number, Radio, Select, Textarea];
formList.forEach(Component => {
  Component.install = function(Vue) {
    Vue.component(Component.name, Component);
  };
});
function install(vue) {
  formList.forEach(Component => Component.install(vue));
}

export default { install, Checkbox, Input, Number, Radio, Select, Textarea };
