<template>
    <div class="padding30">
        <cmui-list :col="1" :border="true">
        <cmui-list-item :key="key" v-for="(item,key) in list" class="bg-white">
            <router-link :to="item.path" class="flex-container padding30 text-dark">
                <span>{{item.title}}</span>
                <i class="baseIcon baseIcon-right"></i>
            </router-link>
        </cmui-list-item>
    </cmui-list>
    </div>
</template>
<script>
    const componentData = {
        base: {
            pageTitle: '基础组件',
            list: ['badge', 'button', 'layout', 'type']
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
            pageTitle: 'CMUI组件列表',
            list: [
                {title: '基础组件', path: '/componentList/base'},
                {title: 'UI组件', path: '/componentList/ui'},
                {title: '表单组件', path: '/componentList/form'},
                {title: '页面组件', path: '/componentList/page'},
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
            return {
                list
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
                this.list = list
            }
        }
    }
</script>