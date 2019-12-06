import _ from 'lodash'
import Alert from './components/alert/index.js'
import Popup from './components/popup/index.js'
import Actions from './components/actions/index.js'
import Confirm from './components/confirm/index.js'
import Notice from './components/notice/index.js'
import Affix from './components/affix/index.js'
import Captcha from './components/captcha/index.js'
import Collapse from './components/collapse/index.js'
import CollapseItem from './components/collapse-item/index.js'
import Countdown from './components/countdown/index.js'
import {
  Checkbox,
  CheckboxGroup,
  Input,
  Number,
  Radio,
  Select,
  Textarea,
  Form,
  FormItem
} from './components/form/index.js'
import Picker from './components/picker/index.js'
import Img from './components/img/index.js'
import Slider from './components/slider/index.js'
import SliderItem from './components/slider-item/index.js'
import List from './components/list/index.js'
import ListItem from './components/list-item/index.js'
import ListGroup from './components/list-group/index.js'
import Progress from './components/progress/index.js'
import DatePicker from './components/date-picker/index.js'
import Mask from './components/mask/index.js'
import Slidebar from './components/slidebar/index.js'
import Scroll from './components/scroll/index.js'
import ScrollItem from './components/scroll-item/index.js'
import Swiper from './components/swiper/index.js'
import Tabbar from './components/tabbar/index.js'
import VirtualList from './components/virtualList/index.js'

// methods
import methods from './methods/index.js'
function Maple() {
  return new Maple.prototype.Init()
}
Maple.prototype.Init = function() {}
Maple.prototype.Init.prototype = Maple.prototype
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
  CheckboxGroup,
  Input,
  Number,
  Radio,
  Select,
  Textarea,
  Form,
  FormItem, // form
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
  Tabbar,
  VirtualList
]
const install = function(Vue) {
  if (install.installed) return
  components.forEach(function(component) {
    component.install(Vue, Maple)
  })
  _.assign(Maple, methods)
}
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.maple = Maple
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
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
  CheckboxGroup,
  Input,
  Number,
  Radio,
  Select,
  Textarea,
  Form,
  FormItem, // form
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
  Tabbar,
  VirtualList
}
