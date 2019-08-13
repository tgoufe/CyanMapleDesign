import maple from './core';
// import { cookie } from './cache/cookie';
// maple.cookie = cookie;
// import { sessionData } from './cache/session';
// maple.sessionData = sessionData;
// import { localData } from './cache/local';
// maple.localData = localData;
import url from './url';
maple.url = url;
import log from './log';
maple.log = log;
import load from './load';
maple.load = load;
import scrollBar from './scroll_bar';
maple.scrollBar = scrollBar;
import device from './device';
maple.device = device;
import style from './style';
maple.style = style;
import time from './time';
maple.time = time;
import shake from './shake';
maple.shake=shake;
import {isInView} from './dom';
maple.isInView=isInView;
import component from './component';
import alert     from './component/alert/index.js';
import confirm   from './component/confirm/index.js';
import notice    from './component/notice/index.js';
import actions   from './component/actions/index.js';
import mask      from './component/mask/index.js';
import message   from './component/message/index.js';
import slider    from './component/slider/index.js';
import list      from './component/list/index.js';
import tabbar    from './component/tabbar/index.js';
import form      from './component/form/index.js';
import maskPanel from './component/maskPanel/index.js';
import picker from './component/pick/index.js';
maple.notice = notice;
maple.alert = alert;
maple.confirm = confirm;
maple.actions = actions;
maple.mask = mask;
maple.slider = slider;
maple.tabbar = tabbar;
maple.list = list;
maple.form = form;
maple.maskPanel = maskPanel;
maple.message = message;
maple.picker=picker;
for(let i in component){
    Vue.component(i,component[i]);
}
export default (window.maple = maple);



