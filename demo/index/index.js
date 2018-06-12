import '../../src/pageComponent/head/index.js';
import componentList from './componentList.vue';
import badge from './badge.vue';
import button from './button.vue';
import actions from './actions.vue';
import collapse from './collapse.vue';
import tabbar from './tabbar.vue';
import affix from './affix.vue';
import alert from './alert.vue';

const routes = [
    {path: '/componentList/:id', component: componentList},
    {path: '/badge/', component: badge},
    {path: '/button/', component: button},
    {path: '/collapse/', component: collapse},
    {path: '/tabbar/', component: tabbar},
    {path: '/affix/', component: affix},
    {path: '/alert/', component: alert},
    {path: '/actions/', component: actions}
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
        pickData:Array(2).fill([...Array(10)].map((item,index)=>index)),
        visible:false
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

    }
});