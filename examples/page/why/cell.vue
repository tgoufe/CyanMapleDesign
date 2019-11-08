<template>
    <div class="">
        <div class="bg-blue text-blue light padding20">
            模拟一下友商的单元格组件
        </div>
        <div style="background-color: rgb(248, 248, 248)" class="padding20">
            <div class="bg-white paddingh20">
                <div class="list list-col1" :class="{border,radius,inner}">
                    <div class="list-item padding20 flex-container">
                        <span>单元格</span>
                        <span class="text-light">内容</span>
                    </div>
                    <div class="list-item padding20">
                        <div class="flex-container">
                            <span>单元格</span>
                            <span class="text-light">内容</span>
                        </div>
                        <div class="text-light fs-12">描述信息</div>
                    </div>
                    <div class="list-item padding20 flex-container">
                        <i class="baseIcon baseIcon-add"></i>
                        <span class="left">单元格</span>
                        <span class="text-light">内容</span>
                    </div>
                    <div class="list-item padding20 flex-container">
                        <span class="left">单元格</span>
                        <i class="baseIcon baseIcon-right"></i>
                    </div>
                    <div class="list-item padding20 flex-container">
                        <span class="marginr10">单元格</span>
                        <span class="badge red left">标签</span>
                        <span >内容</span>
                        <i class="baseIcon baseIcon-right"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="padding30">
            单元格做成什么样完全取决于你自己的需要，你还可以随意控制边框和圆角
            <div class="form margint20">
                <input type="checkbox"  class="btn" v-model="border" label="使用边框">
                <input type="checkbox" class="btn" v-model="inner" label="仅使用内部边框">
                <input type="checkbox" class="btn" v-model="radius" label="使用圆角">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "cell",
  data(){
    return{
      border:true,
      inner:true,
      radius:false
    }
  }
};
</script>

<style scoped>

</style>
