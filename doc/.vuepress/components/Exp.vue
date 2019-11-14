<template>
    <div class="expContainer">
        <cmui-tabbar>
            <cmui-tabbar-item title="Exp">
                <slot name="exp"></slot>
            </cmui-tabbar-item>
            <cmui-tabbar-item title="Code">
                <slot name="code"></slot>
            </cmui-tabbar-item>
        </cmui-tabbar>
    </div>
</template>

<script>
import vue from 'vue'
import '../../../src/cyan/CMUI_doc.scss'
import '../../../src/maple/theme/default.scss'
import cmui from '../../../src/maple/index.js'
cmui.install(vue)
export default {
  name: 'Exp',
}
</script>

<style scoped lang="scss" type="text/scss">
$gray:#edf2f7;
$dark:#cbd5e0;
/deep/ .cmui-tabbar__content{
    padding:.85rem;
}
.expContainer{

}
.code{

}
.exp{

}
/deep/ [ratio="2/3"]::before{padding-top:150%;}
/deep/ .demo{
    background: $gray;
    &.flex-container,&.flex-container-col{
        padding:10px;
        div{
            background: $dark;
            min-height:50px;
        }
    }
    .row,.box-row{
        .grid{
            background: $dark;
            min-height:50px;
            border-radius:4px;
            line-height: 50px;
            text-align: center;
        }
    }
}
</style>
