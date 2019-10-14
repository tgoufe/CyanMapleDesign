<template>
    <div>
        <span class="btn blue block radius" @click="simple()">
            simple Demo
        </span>
        <span class="btn blue block radius" @click="title()">
            with title
        </span>
        <span class="btn blue block radius" @click="noCancel()">
            without cancel
        </span>
    </div>
</template>
<script type="text/javascript">
    import _ from 'lodash'
    import alert from '@components/alert/index.js'
    import actions from '@components/actions/index.js'
    import popup from '@components/popup/index.js'
    import vue from 'vue'
    vue.config.warnHandler=new Function
    vue.use(actions)
    vue.use(popup)
    vue.use(alert)
    export default {
        name:'actions',
        methods:{
            simple(){
                this.actions(
                    ['拍照', '从相册选择'], 
                    item => this.alert(`你点击了${item}`)
                )
            },
            title(){
                this.actions({
                    items:_.times(10,index=>index+1),
                    title:'this is title'
                },data=>{
                    this.alert(data)
                })
            },
            noCancel(){
                this.actions('拍照', '从相册选择', { cancelText: '' })
            }
        }
    }
</script>