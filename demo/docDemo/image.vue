<template>
    <div>
        <div style="height:1000px">
            这里是一个高度比较大的DIV
        </div>
        <p>下面这张图片会在滚动到可见区域的时候进行加载，并且点击的时候可以进行预览</p>
        <cmui-img
                src="//image1.51tiangou.com/product/201907/11/E72EA18F-E0CF-42EF-B2BD-DF22CE7BBA40.jpg!y"
                :pre-view="true"
                :lazy-load="true"
        ></cmui-img>

    </div>
</template>

<script>
    export default {
        name: "image"
    }
</script>