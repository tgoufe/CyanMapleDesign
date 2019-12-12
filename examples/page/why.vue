<template>
    <div class="padding20">
        <p>由于CMUI强大的布局能力，所以你在很多框架中看到的组件我们都没有进行提供，因为你手动创建一个实在是太简单了，下面列举了一些其他框架提供，但是CMUI没有提供的组件，在CMUI中的实现方式，供你参考</p>
        <div class="list border">
            <div class="list-item padding20" v-for="item in whylist">
                <router-link :to="`/why/${item.path}`">{{item.name}}</router-link>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "why",
  data(){
    return {
      whylist:[
        {name:'cell单元格',path:'cell'}
      ]
    }
  }
};
</script>

<style scoped>

</style>
