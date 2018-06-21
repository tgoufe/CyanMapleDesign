import '../../src/pageComponent/head/index.js';
import componentList from './componentList.vue';
import badge from './badge.vue';
import button from './button.vue';
import actions from './actions.vue';
import collapse from './collapse.vue';
import tabbar from './tabbar.vue';
import affix from './affix.vue';
import alert from './alert.vue';
import picker from './picker.vue';

const routes = [
    {path: '/componentList/:id', component: componentList},
    {path: '/badge/', component: badge},
    {path: '/button/', component: button},
    {path: '/collapse/', component: collapse},
    {path: '/tabbar/', component: tabbar},
    {path: '/affix/', component: affix},
    {path: '/alert/', component: alert},
    {path: '/actions/', component: actions},
    {path: '/picker/', component: picker}
];
const router = new VueRouter({
    routes
});
window.vm = new Vue({
    el: '#main',
    router,
    data: {
        headTitle: 'CMUI组件列表',
        componentList: _.times(20, index => {
            return {
                title: '组件' + index, link: '###'
            };
        }),
        // pickData:Array(2).fill([...Array(10)].map((item,index)=>index)),
        // pickData:[[1,2,{text:3,value:3,children:[7,8,{text:9,value:9,select:true}]}],[4,5,6,10]],
        visible:false,
        // pickData:[_.times(_.random(5,10),i=>{
        //     return {
        //         text:i,
        //         value:i,
        //         children:_.times(_.random(5,10),k=>{
        //             return{
        //                 text:`${i}-${k}`,
        //                 value:`${i}-${k}`,
        //                 children:_.times(_.random(5,10),m=>{
        //                     return {
        //                         text:`${i}-${k}-${m}`,
        //                         value:`${i}-${k}-${m}`,
        //                         children:_.times(_.random(5,10),l=>`${i}-${k}-${m}-${l}`)
        //                     };
        //                 })
        //             };
        //         })
        //     };
        // })],
        pickData:[['hot',{text:'东北',value:'东北',children:[
            {text:'北京',value:'北京'},
            {text:'长春',value:'长春'},
            {text:'沈阳',value:'沈阳'},
          ]}],['北','上','广','深']],
        selectIndex:[2,2],
        test:[1,2,3,4]
    },
    watch:{
        test(){
            // console.log(arguments)
        }
    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        change(){
           this.visible=!this.visible;
        },
        changeData(){
            this.pickData=Array(3).fill([...Array(10)].map((item,index)=>index));
        }
    },
    computed:{
        checkAll(){
            return _.compact(this.checkedList).length===this.checkList.length;
        }
    },
    mounted() {
        if (location.hash === '#/') {
            this.$router.replace('/componentList/default');
        }
        let _this=this;
        _.delay(function(){
            _this.test.splice(2,1,555);
        },1000);
    }
});