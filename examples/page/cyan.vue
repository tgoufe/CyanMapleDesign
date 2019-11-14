<template>
<!--     <div>
        <router-link to="cyan/gridContainer" class="padding20 dis-b">栅格布局</router-link>
        <router-link to="cyan/ratioContainer" class="padding20 dis-b">比例容器</router-link>
        <router-link to="cyan/imgContainer" class="padding20 dis-b">图片容器</router-link>
        <router-link to="cyan/scrollContainer" class="padding20 dis-b">滚动容器</router-link>
        <router-link to="cyan/flexContainer" class="padding20 dis-b">flex容器</router-link>
        <router-link to="cyan/type" class="padding20 dis-b">排版</router-link>
        <router-link to="cyan/button" class="padding20 dis-b">按钮</router-link>
        <router-link to="cyan/badge" class="padding20 dis-b">徽标</router-link>
        <router-link to="cyan/form" class="padding20 dis-b">表单</router-link>
         <router-link to="cyan/formCustom" class="padding20 dis-b">自定义表单</router-link>
        <p>建站DEMO，在下面的案例中你将看到使用cyan的各种组合，在不使用JS和其他样式的情况下完成常见布局建设</p>
        <router-link to="cyan/demo/productList" class="padding20 dis-b">电商网站商品列表</router-link>
        <router-link to="cyan/settingView/settingView" class="padding20 dis-b">可视化设置</router-link>
    </div>
    </div> -->
    <cmui-list v-bind="options">
        <cmui-list-item v-for="item in list" class="bg-white flex-container vfull hfull" style="height:33.3333vw">
            <router-link :to="item.path" class="paddingt10 paddingb30 text-dark text-center flex-container-col" style="height:100%;">
                <div class="flex2 flex-container bottom">
                    <i class="baseIcon baseIcon-home text-black" style="font-size: 24px;line-height: 30px;"></i>
                </div>
                <div class="flex1 flex-container bottom" style="line-height: 22px;">{{ item.name }}</div>
            </router-link>
        </cmui-list-item>
    </cmui-list>
</template>

<script>
export default {
  name: 'cyan',
  data() {
    return {
      options: {
        border: true,
        col: 3,
        space: 0
      },
      list: [
        {name:'栅格布局',url:'gridContainer'},
        {name:'比例容器',url:'ratioContainer'},
        {name:'图片容器',url:'imgContainer'},
        {name:'滚动容器',url:'scrollContainer'},
        {name:'flex容器',url:'flexContainer'},
        {name:'排版',url:'type'},
        {name:'按钮',url:'button'},
        {name:'徽标',url:'badge'},
        {name:'表单',url:'form'},
        {name:'自定义表单',url:'formCustom'},
        {name:'电商网站商品列表',url:'productList'},
        {name:'可视化设置',url:'settingView/settingView'}
      ].map(item => ({ name: item.name, path: `cyan/${item.url}` }))

    }
  }
}
</script>

<style scoped>

</style>
