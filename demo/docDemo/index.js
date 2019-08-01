import '../../src/maple/theme.scss'
import countdown from './countdown.vue';
import image from './image.vue';
let routes=[
    {path:'/countdown',component:countdown},
    {path:'/image',component:image}
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