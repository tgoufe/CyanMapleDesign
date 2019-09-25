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
        ui: {
            pageTitle: 'UI组件',
            list: [
                {
                    title: 'picker',
                    icon: 'baseIcon-ui_picker',
                    path: '/picker'
                },
                {
                    title: 'mask',
                    icon: 'baseIcon-ui_mask',
                    path: '/mask'
                },
                {
                    title: 'notice',
                    icon: 'baseIcon-ui_notice',
                    path: '/notice'
                },
                {
                    title: 'actions',
                    icon: 'baseIcon-ui_actions',
                    path: '/actions'
                },
                {
                    title: 'alert',
                    icon: 'baseIcon-ui_alert',
                    path: '/alert'
                },
                {
                    title: 'confirm',
                    icon: 'baseIcon-ui_confirm',
                    path: '/confirm'
                },
                {
                    title: 'popup',
                    icon: 'baseIcon-ui_popup',
                    path: '/popup'
                },
                {
                    title: 'slider',
                    icon: 'baseIcon-ui_slider',
                    path: '/slider'
                },
                {
                    title: 'list',
                    icon: 'baseIcon-ui_list',
                    path: '/list'
                },
                {
                    title: 'tabbar',
                    icon: 'baseIcon-ui_tabbar',
                    path: '/tabbar'
                },
                {
                    title: 'collapse',
                    icon: 'baseIcon-ui_collapse',
                    path: '/collapse'
                },
                {
                    title: 'affix',
                    icon: 'baseIcon-ui_affix',
                    path: '/affix'
                },
                {
                    title: 'swiper',
                    icon: 'baseIcon-ui_swiper',
                    path: '/swiper'
                },
                {
                    title: 'progress',
                    icon: 'baseIcon-ui_progress',
                    path: '/progress'
                },
                {
                    title: 'slidebar',
                    icon: 'baseIcon-ui_slidebar',
                    path: '/slidebar'
                },
                {
                    title: 'scroll',
                    icon: 'baseIcon-ui_scroll',
                    path: '/scroll'
                },
                {
                    title: 'captcha',
                    icon: 'baseIcon-ui_captcha',
                    path: '/captcha'
                }
                ,
                {
                    title: 'countdown',
                    icon: 'baseIcon-ui_countdown',
                    path: '/countdown'
                }
            ]
        },
        form: {
        pageTitle: '表单组件',
        list: [
            {
                title: 'input',
                icon: 'baseIcon-form_input',
                path: '/input'
            },
            {
                title: 'select',
                icon: 'baseIcon-form_select',
                path: '/select'
            },
            {
                title: 'number',
                icon: 'baseIcon-form_number',
                path: '/number'
            },
            {
                title: 'radio',
                icon: 'baseIcon-form_radio',
                path: '/radio'
            },
            {
                title: 'textarea',
                icon: 'baseIcon-form_textarea',
                path: '/textarea'
            },
            {
                title: 'checkbox',
                icon: 'baseIcon-form_checkbox',
                path: '/checkbox'
            }
        ]
        },
        default: {
            pageTitle: 'CYANMAPLE',
            topTitle: true,
            list: [
                {title: 'UI组件',icon:'baseIcon-default_easelCopy', path: '/componentList/ui'},
                {title: '表单组件',icon:'baseIcon-default_grid3', path: '/componentList/form'},
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
