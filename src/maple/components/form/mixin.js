export default {
  methods: {
    handleFocus(event) {
      // console.log(`base handleFocus`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('focus', value, this)
      this.cmuiFormItem && this.cmuiFormItem.$emit('form.focus')
    },
    handleInput(event) {
      // console.log(`base handleInput`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('input', value, this)
      this.$nextTick(this.rendered)
      this.cmuiFormItem && this.cmuiFormItem.$emit('form.input')
    },
    handleChange(event) {
      // console.log(`base handleChange`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('change', value, this)
      this.$emit('input', value, this)
      this.cmuiFormItem && this.cmuiFormItem.$emit('form.change')
    },
    handleBlur(event) {
      // console.log(`base handleBlur`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('blur', value, this)
      this.cmuiFormItem && this.cmuiFormItem.$emit('form.blur')
    },
    rendered(event) {
      // console.log(`base rendered`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('rendered', value, this)
    },
    getInput() {
      return this.$refs.input
    }
  },
  props: {
    disabled: { type: Boolean, default: false, intro: '是否禁用' },
    readonly: { type: Boolean, default: false, intro: '是否设置为只读' },
    placeholder: { type: String, default: '', intro: 'placeholder文字' },
    value: { type: [String, Boolean, Number, Array, Object], default: () => '', intro: '用于v-model绑定的值' },
    name: { type: String, default: '', intro: '表单项名称' },
    target: { type: Object, default: null, intro: '可用于存放一个对象在后续操作中使用' },
    targetClass: { type: String, default: '', intro: '绑定到表单项上的class，可配合Cyan使用' },
    label: { type: [String, Number], default: '', intro: '标签文字' },
    align: { type: String, default: 'left', intro: '标签位置，可选项为left或right' },
    flex: { type: Boolean, default: false, intro: '是否使用flex布局' }
  },
  inject: {
    cmuiForm: {
      default: ''
    },
    cmuiFormItem: {
      default: ''
    }
  }
}
