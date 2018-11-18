'use strict';

import merge from '../util/merge.js';

/**
 * 运行 Web Worker
 * @function    registerWebWorker
 * @param   {Object}    [options={}]
 * @param   {String}    options.file
 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传入生成的 Web Worker 实例
 * */
function registerWebWorker(options={}){
	let config = merge(options, registerWebWorker._CONFIG)
		;
	
	return new Promise((resolve, reject)=>{
		if( 'Worker' in self ){

			if( !(config.file in registerWebWorker._WORKER_CACHE) ){
				registerWebWorker._WORKER_CACHE[config.file] = new Worker( config.file );
			}

			resolve( registerWebWorker._WORKER_CACHE[config.file] );
		}
		else{
			reject( new Error('您的浏览器不支持 Web Worker') );
		}
	});
}

registerWebWorker._WORKER_CACHE = {};

registerWebWorker._CONFIG = {
	file: 'ww.js'
};

export default registerWebWorker;