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
        headTitle: 'CMUI组件列表'
        ,componentList: _.times(20, index => {
            return {
                title: '组件' + index, link: '###'
            };
        })
    },
    watch:{

    },
    methods: {
        goback() {
            this.$router.go(-1);
        }
    },
    computed:{

    },
    mounted() {
        if (location.hash === '#/') {
            this.$router.replace('/componentList/default');
        }
    }
});