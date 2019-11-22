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
import '../../../src/cyan/CMUI_doc.scss'
import '../../../src/maple/theme/default.scss'

import Alert from '../../../src/maple/components/alert/index.js'
import Popup from '../../../src/maple/components/popup/index.js'
import Actions from '../../../src/maple/components/actions/index.js'
import Confirm from '../../../src/maple/components/confirm/index.js'
import Notice from '../../../src/maple/components/notice/index.js'
import Affix from '../../../src/maple/components/affix/index.js'
import Captcha from '../../../src/maple/components/captcha/index.js'
import Collapse from '../../../src/maple/components/collapse/index.js'
import CollapseItem from '../../../src/maple/components/collapse-item/index.js'
import Countdown from '../../../src/maple/components/countdown/index.js'
import {
  Checkbox,
  Input,
  Number,
  Radio,
  Select,
  Textarea
} from '../../../src/maple/components/form/index.js'
import Picker from '../../../src/maple/components/picker/index.js'
import Img from '../../../src/maple/components/img/index.js'
import Slider from '../../../src/maple/components/slider/index.js'
import SliderItem from '../../../src/maple/components/slider-item/index.js'
import List from '../../../src/maple/components/list/index.js'
import ListItem from '../../../src/maple/components/list-item/index.js'
import ListGroup from '../../../src/maple/components/list-group/index.js'
import Progress from '../../../src/maple/components/progress/index.js'
import DatePicker from '../../../src/maple/components/date-picker/index.js'
import Mask from '../../../src/maple/components/mask/index.js'
import Slidebar from '../../../src/maple/components/slidebar/index.js'
import Scroll from '../../../src/maple/components/scroll/index.js'
import ScrollItem from '../../../src/maple/components/scroll-item/index.js'
import Swiper from '../../../src/maple/components/swiper/index.js'
import VirtualList from '../../../src/maple/components/virtualList/index.js'
import Tabbar from '../../../src/maple/components/tabbar/index.js'
const components = [
  Alert,
  Popup,
  Actions,
  Confirm,
  Notice,
  Affix,
  Captcha,
  Collapse,
  CollapseItem,
  Countdown,
  Checkbox,
  Input,
  Number,
  Radio,
  Select,
  Textarea, // form
  Picker,
  Img,
  Slider,
  SliderItem,
  List,
  ListItem,
  ListGroup,
  Progress,
  DatePicker,
  Mask,
  Slidebar,
  Scroll,
  ScrollItem,
  Swiper,
  VirtualList,
  Tabbar
]
components.forEach(function(component) {
  component.install(vue, {})
})
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
