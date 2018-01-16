'use strict';

/**
 * @file    基础框架聚合
 *          模块聚合关系如下：
<pre>
 +-----------------------------------------------------------+
 |                                                           |
 |             Maple( base.js )                              |
 |                                                           |
 |  +-------+  +----------+  +------------+  +------------+  |
 |  |       |  |          |  |            |  |            |  |
 |  |  url  |  |  device  |  |  listener  |  |  util      |  |   运行环境检测 & 基础工具函数
 |  |       |  |          |  |            |  |            |  |
 |  +-------+  +----------+  +------------+  +------------+  |
 |                                                           |
-----------------------------------------------------------------------
 |                                                           |
 |  +--------------+  +---------------+  +----------------+  |
 |  |              |  |               |  |                |  |
 |  |  model       |  |  view         |  |  router        |  |   Model 数据处理 & View 视图处理 & router 路由配置
 |  |              |  |               |  |                |  |
 |  +--------------+  +---------------+  +----------------+  |
 |                                                           |
-----------------------------------------------------------------------
 |                                                           |
 |  +------------+  +------------+  +----------+             |
 |  |            |  |            |  |          |             |
 |  |  position  |  |  register  |  |  notify  |             |  浏览器增强功能
 |  |            |  |            |  |          |             |
 |  +------------+  +------------+  +----------+             |
 |                                                           |
 +-----------------------------------------------------------+
</pre>
 * */

/**
 * @namespace   maple
 * */

/**
 * ---------- 事件队列监听 ----------
 * */
import {Listener, listener} from './listener.js';

/**
 * ---------- 通用工具 ----------
 * */
import util     from './util/index.js';

/**
 * ---------- 全局运行时检测 ----------
 * */
// 运行参数
import url      from './runtime/url.js';

// 运行设备、系统、内核、浏览器
import device   from './runtime/device.js';

/**
 * ---------- 数据层 ----------
 * */
import Model    from './model/index.js';

/**
 * ---------- View 监控对象 ----------
 * */
import view     from './view/index.js';

/**
 * ---------- Router 路由控制 ----------
 * */
import Router   from './router/index.js';

/**
 * ---------- 获取地理位置 ----------
 * */
import position from './position.js';

/**
 * todo 实验性功能
 * */

/**
 * ---------- 动画库 ----------
 * */
import * as animate from './animate/index.js';

/**
 * ---------- 注册后台 worker ----------
 * */
import register from './register/index.js';

/**
 * ---------- 桌面通知 ----------
 * */
import notify   from './notify.js';

let maple = {
	Listener
	, listener
	, util

	, url
	, device

	, Model
	, model: Model

	, view

	, Router
	, router: Router

	, position

	// 实验性功能
	, animate
	, register
	, notify
};

window.maple = maple;

export default maple;