<template>
    <div style="height:1000px">
        <div class="tag-container example">
            <a href="javascript:void(0)" class="btn blue radius block" @click="alert">
                简单的案例
            </a>
            <a href="javascript:void(0)" class="btn blue radius block" @click="alert2">
                同时设置标题和内容
            </a>
            <a href="javascript:void(0)" class="btn blue radius block" @click="alert3">
                超长内容的DEMO
            </a>
            <a href="javascript:void(0)" class="btn blue radius block" @click="alert4">
                来点另类的
            </a>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.$root.headTitle = 'alert'
    },
    methods: {
        alert() {
            maple.alert('这是一个简单的弹窗')
        },
        alert2() {
            maple.alert('<span>这是标题</span>', '这是内容')
        },
        alert3() {
            maple.alert('下面是一段非常长的内容', _.pad('', 1000, '非常长的内容'))
        },
        alert4() {
            let timer;
            let vm = maple.alert({
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
