<template>
    <div>
        <div class="tag-container example">
            <a href="javascript:void(0)" class="btn blue radius block" @click="actions">
                简单的案例
            </a>
            <a href="javascript:void(0)" class="btn blue radius block" @click="actions2">
                隐藏取消按钮
            </a>
            <a href="javascript:void(0)" class="btn blue radius block" @click="actions3">
                自定义的样式
            </a>
        </div>
    </div>
</template>
<script>
    export default {
    	data:function(){
    		return{
    			items:_.times(10,index=>`items${index}`),
    			visible:false
    		}
    	},
        methods: {
            actions() {
                maple.actions('拍照','从相册选择',item=>maple.alert(`你点击了${item.text}`))
            },
            actions2() {
                maple.actions('拍照','从相册选择',{cancelText:''})
            },
            actions3(){
            	maple.actions(_.times(20,index=>{
            		return {
            			text:`当前item字号为${index+10}px`,
            			style:{fontSize:index+10+'px'}
            		}
            	}),(item,index)=>maple.alert(`你点击了第${index}项`),{title:'我是标题'})
            }
        }
    }
</script>