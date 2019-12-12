<template>
    <div class="expContainer">
        <div class="exp">
            <slot name="exp"></slot>
        </div>
        <div v-show="show" class="code">
            <slot name="code"></slot>
        </div>
        <div @click="show=!show" class="toogleCode" v-text="show?'隐藏代码':'显示代码'"></div>
    </div>
</template>

<script>
import vue from 'vue'
import _ from 'lodash'
import '../../../src/cyan/CMUI_doc.scss'
import '../../../src/maple/theme/default.scss'
import components from '../../../src/maple/components/index.js'
_.forEach(components,component=>component.install(vue, {}))
export default {
  name: 'Exp',
  data(){
    return{
      show:false
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
$gray:#edf2f7;
$dark:#cbd5e0;
/deep/ .cmui-tabbar__content{
    padding:.85rem;
}
.expContainer{
    margin:20px 0;
    border:1px solid #00baba;
    padding:10px;
    border-radius:6px;
    overflow: hidden;
    max-width:740px;
}
.toogleCode{
    background-color: #00baba;
    text-align: center;
    padding:10px;
    color:white;
    margin:-10px;
    margin-top:10px;
    cursor: pointer;
}
.code{

}
.exp{

}
/deep/ .cmui-list-item{
    .list-item-demo{
        background: $gray;
    }
    &:nth-child(odd) .list-item-demo{
        background: $dark;
    }
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
