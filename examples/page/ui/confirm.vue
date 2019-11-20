<template>
    <div style="height:1000px">
        <div class="tag-container example themeAlert padding15">
            <a href="javascript:void(0)" class="btn block" @click="alert">
                简单的案例
            </a>
            <a href="javascript:void(0)" class="btn block" @click="alert2">
                同时设置标题和内容
            </a>
            <a href="javascript:void(0)" class="btn block" @click="alert3">
                超长内容的DEMO
            </a>
            <a href="javascript:void(0)" class="btn block" @click="alert4">
                来点另类的
            </a>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.$root.headTitle = 'confirm'
    },
    methods: {
        alert() {
            maple.confirm('这是一个简单的弹窗')
        },
        alert2() {
            maple.confirm('这是标题', '这是内容')
        },
        alert3() {
            maple.confirm('下面是一段非常长的内容', _.pad('', 1000, '非常长的内容'))
        },
        alert4() {
            let timer;
            let vm = maple.confirm({
                content: '',
                okFn() {
                    clearTimeout(timer);
                },
                callback() {
                    let str = '其实这个功能没什么用，我做这个功能只是想让你明白，你可以动态的去改变这里的文字，以及其他你想改变的东西.你可以查看一下DEMO中的源代码，看看它是如何实现的。'
                    let length = str.length;
                    let index = 1;
                    timer = setInterval(function() {
                        vm.content = str.slice(0, index++);
                        if (index > length) {
                            clearTimeout(timer);
                        }
                    }, 100)
                }
            });

        }
    }
}
</script>
<style lang="scss">
  .themeAlert{
    a{
      padding:10px 15px;
      &.btn:nth-of-type(odd){
        background: #003E3E !important;
      }
      &.btn:nth-of-type(even){
        background: #007c7c !important;
      }
    }
  }
</style>