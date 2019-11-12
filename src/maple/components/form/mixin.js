export default {
  methods: {
    handleFocus(event) {
      console.log(`base handleFocus`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('focus', value, this)
    },
    handleInput(event) {
      console.log(`base handleInput`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('input', value, this)
      this.$nextTick(this.rendered)
    },
    handleChange(event) {
      console.log(`base handleChange`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('change', value, this)
      this.$emit('input', value, this)
    },
    handleBlur(event) {
      console.log(`base handleBlur`)
      let evt = window.event || event
      let target = evt.target || evt.srcElement
      let value = target.value
      this.$emit('blur', value, this)
    },
    rendered(event) {
      console.log(`base rendered`)
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
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    placeholder: String,
    value: { type: [String, Boolean, Number, Array, Object], default: () => '' },
    name: String,
    target: Object,
    targetClass: { type: String, default: '' },
    label: String,
    align: { type: String, default: 'left' },
    flex: { type: Boolean, default: false }
  }
}
