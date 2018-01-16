'use strict';

import merge    from '../util/merge.js';

/**
 * @summary     注册 Service Worker
 * @function    registerServiceWorker
 * @param       {Object}    [options={}]
 * @param       {String}    options.file
 * @return      {Promise}   返回一个 Promise 对象，在 resolve 时传入 true
 * */
function registerServiceWorker(options={}){
	let config = merge(options, registerServiceWorker._CONFIG)
		;

	return new Promise((resolve, reject)=>{
		if( 'serviceWorker' in navigator ){
			if( !(config.file in registerServiceWorker._CACHE) ){

				registerServiceWorker._CACHE[config.file] = navigator.serviceWorker.register(config.file, {
					scope: config.scope
				}).then((regist)=>{
					let serviceWorker
						;

					if( regist.installing ){
						serviceWorker = regist.installing;
					}
					else if( regist.waiting ){
						serviceWorker = regist.waiting;
					}
					else if( regist.active ){
						serviceWorker = regist.active;
					}

					if( serviceWorker ){
						// todo 用途
						serviceWorker.addEventListener('statechange', function(e){
							console.log(e);
						});
					}

					return true;
				}).catch(function(e){
					console.log( e );
				});

				navigator.serviceWorker.ready.then((reg)=>{
					reg.pushManager.getSubscription().then((res)=>{
						if( !res ){
							reg.pushManager.subscribe({
								userVisibleOnly: true
							}).then((sub)=>{
								console.log('Subscribed! Endpoint', sub.endpoint);
							});
						}
						else{
							console.log('remain endpoint', res.endpoint);
						}
					});
				});
			}

			resolve( registerServiceWorker._CACHE[config.file] );
		}
		else{
			reject( new Error('该浏览器不支持 Service Worker') );
		}
	});

	// return result;
}

registerServiceWorker._CACHE = {};

registerServiceWorker._CONFIG = {
	file: 'sw.js'
	, scope: './'
};

export default registerServiceWorker;