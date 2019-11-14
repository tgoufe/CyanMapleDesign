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
import Alert from '../../../src/maple/components/alert/index.js'
import Popup from '../../../src/maple/components/popup/index.js'
import Actions from '../../../src/maple/components/actions/index.js'
import Confirm from '../../../src/maple/components/confirm/index.js'
import Notice from '../../../src/maple/components/notice/index.js'
// import Affix from '../../../src/maple/components/affix/index.js'
// import Captcha from '../../../src/maple/components/captcha/index.js'
// import Collapse from '../../../src/maple/components/collapse/index.js'
// import CollapseItem from '../../../src/maple/components/collapse-item/index.js'
// import Countdown from '../../../src/maple/components/countdown/index.js'
// import {
//   Checkbox,
//   Input,
//   Number,
//   Radio,
//   Select,
//   Textarea
// } from '../../../src/maple/components/form/index.js'
// import Picker from '../../../src/maple/components/picker/index.js'
// import Img from '../../../src/maple/components/img/index.js'
// import Slider from '../../../src/maple/components/slider/index.js'
// import SliderItem from '../../../src/maple/components/slider-item/index.js'
// import List from '../../../src/maple/components/list/index.js'
// import ListItem from '../../../src/maple/components/list-item/index.js'
// import ListGroup from '../../../src/maple/components/list-group/index.js'
// import Progress from '../../../src/maple/components/progress/index.js'
// import DatePicker from '../../../src/maple/components/date-picker/index.js'
// import Mask from '../../../src/maple/components/mask/index.js'
// import Slidebar from '../../../src/maple/components/slidebar/index.js'
// import Scroll from '../../../src/maple/components/scroll/index.js'
// import ScrollItem from '../../../src/maple/components/scroll-item/index.js'
// import Swiper from '../../../src/maple/components/swiper/index.js'
import Tabbar from '../../../src/maple/components/tabbar/index.js'
// import VirtualList from '../../../src/maple/components/virtualList/index.js'
Alert.install(vue)
Popup.install(vue)
Actions.install(vue)
Confirm.install(vue)
Notice.install(vue)
Tabbar.install(vue)
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
