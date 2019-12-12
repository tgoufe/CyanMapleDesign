<template>
    <div>
        <span class="btn blue" @click="show">显示列表</span>
        <span class="btn blue" @click="hide">隐藏取消按钮</span>
        <span class="btn blue" @click="custom">自定义样式</span>
    </div>
</template>

<script>
export default {
  name: "Actions-1",
  methods:{
    show(){
      this.actions({
        items:Array.from({length:5},(item,index)=>index),
        title:'this is title'
      })
    },
    hide(){
      this.actions(
        ['拍照', '从相册选择'],
        {cancelText:''},
        item => this.alert(`你点击了${item}`),
      )
    },
    custom(){
      this.actions({
        items:Array.from({length:5},(item,index)=>index),
        title:'this is title',
        itemStyle:{
          color:'red'
        }
      })
    }
  }
};
</script>
