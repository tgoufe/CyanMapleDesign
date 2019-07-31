import '../../src/maple/theme.scss'
import countdown from './countdown.vue';

let routes=[
    {path:'/countdown',component:countdown}
];
const router = new VueRouter({
    routes
});
new Vue({
    el:'#main',
    router,
    data: {
        headTitle: 'CYANMAPLE'
    },
})