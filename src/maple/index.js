import maple from './core';
import { cookie } from './cache/cookie';
//挂载cookie
maple.cookie = cookie;
import { sessionData } from './cache/session';
//挂载sessionStorage
maple.sessionData = sessionData;
import { localData } from './cache/local';
//挂载localStorage
maple.localData = localData;
import * as util from './util';
//挂载工具方法
maple._ = util;
maple.util = util;
import * as support from './support';
//挂载支持
maple.support = support;
import url from './url';
//挂载url处理方法
maple.url = url;
import log from './log';
//挂载console.log
maple.log = log;
import load from './load';
//挂载load
maple.load = load;
import scrollBar from './scroll_bar';
//挂载滚动事件
maple.scrollBar = scrollBar;
import device from './device';
//挂载设备信息
maple.device = device;
import style from './style';
//挂载style
maple.style = style;
import vm from './vm';
//挂载vm控制器
maple.vm = vm;
import component from './component';
import alert from './ui/alert/index.js';
import confirm from './ui/confirm/index.js';
import notice from './ui/notice/index.js';
import actions from './ui/actions/index.js';
import mask from './ui/mask/index.js';
import message from './ui/message/index.js';
import slider from './component/slider/index.js';
import list from './component/list/index.js';
import tabbar from './component/tabbar/index.js';
import form from './component/form/index.js';

maple.notice = notice;
maple.alert = alert;
maple.confirm = confirm;
maple.actions = actions;
maple.mask = mask;
maple.slider = slider;
maple.tabbar = tabbar;
maple.list = list;
maple.form = form;
maple.message = message;
// // 初始化通用组件
Object.keys(component).forEach(d => Vue.component(d, component[d]));
export default (window.maple = maple);
