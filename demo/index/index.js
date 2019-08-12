import './index.scss';
import '../../src/maple/theme.scss'
import '../../src/pageComponent/head/index.js';
import componentList from './componentList.vue';
import badge from './badge.vue';
import type from './type.vue';
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
    import sliderConfig from './ui/slider/config.vue';
    import sliderExample from './ui/slider/example.vue';
    import sliderElement from './ui/slider/element.vue';
import list from './ui/list.vue';
    import listMusic from './ui/list/music.vue';
    import listConfig from './ui/list/config.vue';
    import listLoop from './ui/list/loop.vue';
import popup from './ui/popup.vue';
import swiper from './ui/swiper.vue';
import progress from './ui/progress.vue';
import slidebar from './ui/slidebar.vue';
import scroll from './ui/scroll.vue';
import captcha from './ui/captcha.vue';
import countdown from './ui/countdown.vue';
const routes = [
    {path: '/componentList/:id', component: componentList},
    {path: '/badge/', component: badge},
    {path: '/type/', component: type},
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
    {path: '/slider/config',component:sliderConfig},
    {path: '/slider/example',component:sliderExample},
    {path: '/slider/element',component:sliderElement},
    {path: '/list/', component: list},
    {path: '/list/music', component: listMusic},
    {path: '/list/config', component: listConfig},
    {path: '/list/loop', component: listLoop},
    {path: '/popup/', component: popup},
    {path: '/swiper/', component: swiper},
    {path: '/progress/', component: progress},
    {path: '/slidebar/', component: slidebar},
    {path: '/scroll/', component: scroll},
    {path: '/captcha/', component: captcha},
    {path: '/countdown/', component: countdown},
];
const router = new VueRouter({
    routes
});
window.vm = new Vue({
    el: '#main',
    router,
    data: {
        headTitle: 'CYANMAPLE',
        imageList:_.times(6,i=>location.origin+'/image/white'+i+'.jpg')
    },
    watch:{

    },
    methods: {
        goback() {
            this.$router.go(-1);
        },
        showbottom(){
            maple.scrollBar('bottom');
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