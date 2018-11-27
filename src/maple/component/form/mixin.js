export default {
  methods: {
    handleFocus(event) {
        let evt = window.event||event;
        let target = evt.target||evt.srcElement;
        let value = target.value;
      this.$emit("focus", value, target, this);
    },
    handleInput(event) {
        let evt = window.event||event;
        let target = evt.target||evt.srcElement;
        let value = target.value;
      this.$emit("input", value, target, this);
      this.$nextTick(this.rendered);
    },
    handleChange(event) {
        let evt = window.event||event;
        let target = evt.target||evt.srcElement;
        let value = target.value;
      this.$emit("change", value, target, this);
      this.$emit("input", value, target, this);
    },
    handleBlur(event) {
        let evt = window.event||event;
        let target = evt.target||evt.srcElement;
        let value = target.value;
      this.$emit("blur", value, target, this);
    },
    rendered(event) {
        let evt = window.event||event;
        let target = evt.target||evt.srcElement;
        let value = target.value;
      this.$emit("rendered", value, target, this);
    }
  },
  props: {
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    placeholder: String,
    value: [String, Boolean],
    name: String,
    target: Object,
    targetClass: String,
    label: String,
    align: { type: String, default: "left" },
    flex:{type:Boolean,default:false}
  }
};
