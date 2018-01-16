'use strict';

/**
 * @file    Service Worker 后台执行文件
 * */

import CacheStorageModel    from '../model/cacheStorage.js';
import notify               from '../notify.js';

let CACHE_URL = []
	, url = ''
	, cache = new CacheStorageModel()
	// , socket = new WebSocketReq({
	// 	url: 'ws://localhost:8181/'
	// })
	;

console.log('Service Worker 已加载');

self.addEventListener('install', function(event){
	console.log('Service Worker 安装完成，install event', event);

	event.waitUntil( cache.addAll( CACHE_URL ).then(self.skipWaiting(), function(e){
		console.log( e );
	}));
});

self.addEventListener('activate', function(event){
	console.log('新版本 Service Worker 激活 Active event,', event);
});

self.addEventListener('message', function(event){

});

self.addEventListener('push', function(event){
	event.waitUntil( self.self.registration.showNotification('123123', {
		body: 'asdfsadfasdf'
	}));
});

self.addEventListener('notificationclick', function(event){
	event.notification.close();
	event.waitUntil( clients.matchAll({
		type: 'window'
	}).then(()=>{
		if( clients.openWindow ){
			return clients.openWindow( url );
		}
	}));
});

self.addEventListener('fetch', function(event){

	event.respondWith( cache.getData( event.request ).then(function(response){
		return response;
	}, function(e){
		console.log( e.message );

		return fetch( event.request.clone() );  // 克隆该请求，Request 对象是 stream 类型的，只能读取一次
	}).then(function(response){
		let result
			;
		if( !response || response.status !== 200 || response.type !== 'basic' ){    // 判断是否为一个异常的响应
			result = Promise.resolve( response );
		}
		else{
			result = cache.setData(event.request, response.clone()).then(function(){
				console.log('已缓存 '+ event.request.url);
				
				return response;
			});
		}

		return result;
	}));
});

// socket.on(function(data){
// 	notify(data.title, data.content);
// });
//
// socket.send({
// 	msg: 'hello'
// });