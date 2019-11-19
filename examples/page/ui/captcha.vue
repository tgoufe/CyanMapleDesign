<template>
  <div>
    <div class="tag-container example">
      <p class="title paddingv20 paddingh30">默认的输入，只能输入数字，在移动端弹起数字键盘并且不可切换</p>
      <div class="paddingv50">
        <cmui-captcha v-model="value" />
      </div>
    </div>
    <div class="tag-container example">
      <p class="title paddingv20 paddingh30">设置type为text可输入任何字符，在移动端弹起默认键盘</p>
      <div class="paddingv50">
        <cmui-captcha
        type="text"
        v-model="value2"
        />
      </div>
    </div>
    <div class="tag-container example">
      <p class="title paddingv20 paddingh30">设置hide为true，转换为隐藏输入</p>
      <div class="paddingv50">
        <cmui-captcha
        :hide="true"
        v-model="value3"
        />
      </div>
    </div>
    <div class="tag-container example">
      <p class="title paddingv20 paddingh30">调节length属性控制输入数量</p>
      <div class="paddingv50">
        <cmui-captcha
        :length="6"
        v-model="value4"
        />
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      value: '',
      value2: '',
      value3: '',
      value4: ''
    }
  },
  mounted () {
    this.$root.headTitle = 'captcha'
  }
}
</script>
