import Textarea from './textarea.vue'
import Input from './input.vue'
import Select from './select.vue'
import Number from './number.vue'
import Checkbox from './checkbox.vue'
import CheckboxGroup from './checkbox-group.vue'
import Radio from './radio.vue'
import Form from './form.vue'
import FormItem from './form-item.vue'
let formList = [Checkbox, CheckboxGroup, Input, Number, Radio, Select, Textarea, Form, FormItem]
formList.forEach(Component => {
  Component.install = function(Vue) {
    Vue.component(Component.name, Component)
  }
})
function install(vue) {
  formList.forEach(Component => Component.install(vue))
}

export { install, Checkbox, CheckboxGroup, Input, Number, Radio, Select, Textarea, Form, FormItem }
