import '../../src/maple/theme.scss'
import countdown from './countdown.vue';
import datePicker from './dataPicker.vue';
let routes=[
    {path:'/countdown',component:countdown},
    {path:'/datePicker',component:datePicker}
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