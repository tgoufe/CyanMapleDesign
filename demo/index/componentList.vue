<template>
    <div>
        <div class="paddingt30 paddingh30" v-show="topTitle">
            <div class="bg-white padding30 fs-12" style="color:#4A4A4A">
                <div class="flex-container"><span class="fs-20 text-black">CYANMAPLE</span><i class="baseIcon baseIcon-right" style="color:#D9D9D9"></i></div>
                <div class="margint20">CYANMAPLE(CMUI)是一套我们尽量使用非常简单的单词来对功能或效果进行描述，以保证你可以付出非常小的学习成本，快速上手一的一套前端框架。</div>
                <div class="margint30">版本号1.01</div>
            </div>
            
        </div>
        <div class="paddingh30" :class="!topTitle && 'childTheme'">
            <cmui-list :col="1">
                <cmui-list-item :key="key" v-for="(item,key) in list" class="bg-white" :class="!topTitle && (((key + 1) % 3 === 0) ? 'borderb' : 'borderr borderb')" :style="!topTitle && 'height: 33.333333333vw;'">
                    <router-link :to="item.path" :class="topTitle && 'flex-container'" class="padding30 text-dark">
                        <div class="text-black" :class="topTitle ? 'flex-container left' : 'text-center'">
                            <div class="lh-28" :class="topTitle ? 'marginr20' : 'paddingt50 paddingb20'"><i class="baseIcon" :class="item.icon" style="font-size: 24px;"></i></div>
                            <div class="fs-14 text-center" :class="!topTitle && 'text-dark'">{{item.title}}</div>
                        </div>
                        
                        <i class="baseIcon baseIcon-right" style="color:#D9D9D9" v-show="topTitle"></i>
                    </router-link>
                </cmui-list-item>
            </cmui-list>
        </div>
    </div>
</template>
<script>
    const componentData = {
        base: {
            pageTitle: '基础组件',
            topTitle: false,
            list:[
                {
                    title: 'badge',
                    icon: 'baseIcon-base_badge',
                    path: '/badge'
                },
                {
                    title: 'button',
                    icon: 'baseIcon-base_button',
                    path: '/button'
                },
                {
                    title: 'layout',
                    icon: 'baseIcon-base_layout',
                    path: '/layout'
                },
                {
                    title: 'type',
                    icon: 'baseIcon-base_type',
                    path: '/type'
                }
            ]
            // list: ['badge', 'button', 'layout', 'type']
        },
        ui: {
            pageTitle: 'UI组件',
            list: [
              'picker',
              'mask',
              'notice',
              'actions',
              'alert',
              'confirm',
              'popup',
              'slider',
              'list',
              'tabbar',
              'collapse',
              'affix',
              'swiper',
              'progress',
              'slidebar',
              'scroll',
              'captcha'
            ]
        },
        page: {
            pageTitle: '页面组件',
            list: [
                
            ]
        },
        // business: {
        //     pageTitle: '业务组件',
        //     list: ['mask', 'notice', 'action', 'alert']
        // },
        form: {
        pageTitle: '表单组件',
        list: ['input','select','number','radio','textarea','checkbox']
        },
        default: {
            pageTitle: 'CYANMAPLE',
            topTitle: true,
            list: [
                {title: '基础组件',icon:'baseIcon-default_compare', path: '/componentList/base'},
                {title: 'UI组件',icon:'baseIcon-default_easelCopy', path: '/componentList/ui'},
                {title: '表单组件',icon:'baseIcon-default_grid3', path: '/componentList/form'},
                {title: '页面组件',icon:'baseIcon-defalut_faceFilter', path: '/componentList/page'},
                // {title: '业务组件', path: '/componentList/business'}
            ]
        }
    }
    export default {
        data: function () {
            const id = this.$router.currentRoute.params.id;
            this.$root.headTitle = _.get(componentData, `${id}.pageTitle`);
            const list = _.get(componentData, `${id}.list`, []).map(item => {
                if (_.isString(item)) {
                    return {title: item, path: `/${item}`}
                } else {
                    return item;
                }
            });
            const topTitle =  _.get(componentData, `${id}.topTitle`);
            return {
                list,
                topTitle
            }
        },
        watch: {
            '$route'(to, from) {
                const id = to.params.id;
                this.$root.headTitle = _.get(componentData, `${id}.pageTitle`);
                const list = _.get(componentData, `${id}.list`, []).map(item => {
                    if (_.isString(item)) {
                        return {title: item, path: `/${item}`}
                    } else {
                        return item;
                    }
                });
                const topTitle =  _.get(componentData, `${id}.topTitle`);
                this.list = list;
                this.topTitle = topTitle;
            }
        }
    }
</script>