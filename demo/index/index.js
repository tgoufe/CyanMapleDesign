import '../../src/pageComponent/head/index.js';
import componentList from './componentList.vue';
import badge from './badge.vue';
import button from './button.vue';
import collapse from './collapse.vue';
import tabbar from './tabbar.vue';
import affix from './affix.vue';
import picker from './picker.vue';
// form
import input from './form/input.vue';
import select from './form/select.vue';
import number from './form/number.vue';
import textarea from './form/textarea.vue';
import radio from './form/radio.vue';
import checkbox from './form/checkbox.vue';
//ui
import mask from './ui/mask.vue';
import notice from './ui/notice.vue';
import alert from './ui/alert.vue';
import confirm from './ui/confirm.vue';
import actions from './ui/actions.vue';
import slider from './ui/slider.vue';
import list from './ui/list.vue';
const routes = [
    {path: '/componentList/:id', component: componentList},
    {path: '/badge/', component: badge},
    {path: '/button/', component: button},
    {path: '/collapse/', component: collapse},
    {path: '/tabbar/', component: tabbar},
    {path: '/affix/', component: affix},
    {path: '/alert/', component: alert},
    {path: '/confirm/', component: confirm},
    {path: '/actions/', component: actions},
    {path: '/picker/', component: picker},
    {path: '/input/', component: input},
    {path: '/select/', component: select},
    {path: '/number/', component: number},
    {path: '/textarea/', component: textarea},
    {path: '/radio/', component: radio},
    {path: '/checkbox/', component: checkbox},
    {path: '/mask/', component: mask},
    {path: '/notice/', component: notice},
    {path: '/slider/', component: slider},
    {path: '/list/', component: list},
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
        list:_.times(20,index=>index)
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