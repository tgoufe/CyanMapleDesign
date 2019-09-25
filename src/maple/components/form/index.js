import Textarea from './textarea.vue';
import Input from './input.vue';
import Select from './select.vue';
import Number from './number.vue';
import Checkbox from './checkbox.vue';
import Radio from './radio.vue';
[
    Checkbox,
    Input,
    Number,
    Radio,
    Select,
    Textarea
].forEach(Component => {
    Component.install = function(Vue,Maple) {
        Vue.component(Component.name, Component);
    };
});
export {Checkbox, Input, Number, Radio, Select, Textarea};
