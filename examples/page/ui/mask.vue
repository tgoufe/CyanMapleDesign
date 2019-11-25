<template>
	<div class="padding20">
		<!-- <div class="tag-container example">
			<p>使用方式</p>
			<p>简介方式：maple.mask(content,position,callback)</p>
			<p>完整方式：maple.mask(options)</p>
			<p>options结构：</p>
			<cmui-list :col="[1,2]">
				<cmui-list-item>
position
				</cmui-list-item><cmui-list-item>表示位置的字符串，继承于flex-container,可选值为top,bottom,left,right,center中的一个或两个</cmui-list-item>
				<cmui-list-item>
content
				</cmui-list-item><cmui-list-item> 弹出的内容，支持html片段</cmui-list-item>
				<cmui-list-item>
closeFn
				</cmui-list-item><cmui-list-item> 弹窗关闭的毁掉函数</cmui-list-item>
				<cmui-list-item>
callback
				</cmui-list-item><cmui-list-item> 弹窗弹出并渲染完成后的回调函数</cmui-list-item>
				<cmui-list-item>
contentStyle
				</cmui-list-item><cmui-list-item> 弹窗内容容器样式</cmui-list-item>
			</cmui-list>
		</div> -->
		<div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16" style="z-index:1">
			<div class="btn-group flex-container paddingv20">
              	<span class="text-white left" style="min-width: 55px;">纵向</span>
              	<div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
                  <div class="flex1 flex-container center" style="padding:3px;" v-for="item in pos1"><div class="badge blue pill" @click="pos1rs=item" :class="pos1rs==item?'badgeCurrent':'badgeDefault'">{{item}}</div></div>
                  <!-- <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="pos1rs='small'" :class="size=='small'?'badgeCurrent':'badgeDefault'">Small</div></div>
                  <div class="flex1 flex-container center" style="padding:3px;"><div class="badge blue pill" @click="pos1rs='big'" :class="size=='big'?'badgeCurrent':'badgeDefault'">Big</div></div> -->
              	</div>
            </div>
            <div class="btn-group flex-container paddingv20">
              <span class="text-white left" style="min-width: 55px;">横向</span>
              <div class="flex-container flex1" style="background: rgba(102,102,102,0.60);border-radius: 16px;border-radius: 16px;">
                  	<div class="flex1 flex-container center" style="padding:3px;" v-for="item in pos2"><div class="badge blue pill" @click="pos2rs=item" :class="pos2rs==item?'badgeCurrent':'badgeDefault'">{{item}}</div></div>
              </div>
            </div>
		</div>
		<div class="pos-f top0 left0 right0 flex-container center" style="height:calc(100% - 90px)">
			<a href="javascript:void(0)" class="" @click="showMask">
				<img :src="imgUrl" alt="">
			</a>
		</div>
	</div>
</template>
<style type="text/css" lang="scss"></style>
<script type="text/javascript">
let contentStyle = {
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '4px',
  width: '80%',
  textAlign: 'center'
}
import img from '@assets/img-mask_test.png'
export default {
  data: function() {
    return {
      pos1: ['center', 'top', 'bottom'],
      pos2: ['left', 'right', 'center'],
      pos1rs: ['center'],
      pos2rs: ['center'],
      text: 'mask content',
      imgUrl:img
    }
  },
  mounted() {
    this.$root.headTitle = 'mask'
  },
  methods: {
    showMask(num) {
      maple.mask({
        content: this.text,
        position: this.pos1rs + ' ' + this.pos2rs,
        contentStyle,
        closeFn: function() {
          console.log('closeFn方法被调用')
        },
        callback: function() {
          console.log('callback方法被调用')
        }
      })
    }
  }
}
</script>
