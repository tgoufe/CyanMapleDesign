'use strict';

import Model from './model.js';
import merge from '../util/merge.js';

/**
 * 默认配置
 * @const
 * */
const FILE_SYSTEM_CONFIG = {
		fileName: 'storage.txt'
		, fileSize: 2>>20
		, fileType: 1           // 0 为临时文件，1 为持久文件
	}
	;

/**
 * @class
 * @classdesc   对 File System 进行封装，统一调用接口，在 Model.factory 工厂方法注册为 file，别名 fs，将可以使用工厂方法生成。默认使用文件名为 storage.txt，2MB 空间
 * @extends     Model
 * */
class FileSystemModel extends Model{
	/**
	 * @constructor
	 * @param   {Object}    [config={}]
	 * @param   {String}    [config.fileName]
	 * @param   {Number}    [config.fileSize]
	 * @param   {Number}    [config.fileType]   文件的保存类型，0 为临时文件，1 为持久文件，可以使用 FileSystemModel.TEMPORARY 和 FileSystemModel.PERSISTENT 来替代
	 * */
	constructor(config={}){
		super( config );

		this._config = merge(config, FileSystemModel._CONFIG);

		this._fs = new Promise((resolve, reject)=>{
			let requestFileSystem = self.requestFileSystem || self.webkitRequestFileSystem || null
				;

			// if( 'webkitPersistentStorage' in navigator ){
			// 	navigator.webkitPersistentStorage.requestQuota(this.config.fileSize, (grantedBytes)=>{
			// 		self.webkitRequestFileSystem(self.PERSISTENT, grantedBytes, (fs)=>{
			// 			resolve( fs );
			// 		});
			// 	});
			// }
			if( requestFileSystem ){
				requestFileSystem(self.PERSISTENT, this._config.fileSize, resolve, reject);
			}
			else{
				reject( new Error('此浏览器不支持 Local File System') );
			}
		});
	}

	// ---------- 静态属性 ----------
	/**
	 * @summary 默认配置
	 * @static
	 * @const
	 * */
	static get _CONFIG(){
		return FILE_SYSTEM_CONFIG;
	}
	/**
	 * @summary 持久化文件类型的值
	 * @static
	 * */
	static get PERSISTENT(){
		return self.PERSISTENT;
	}
	/**
	 * @summary 临时文件类型的值
	 * @static
	 * */
	static get TEMPORARY(){
		return self.TEMPORARY;
	}

	// ---------- 私有方法 ----------
	/**
	 * @summary 获取 FileEntry 对象
	 * @private
	 * @param   {Object}    [options={}]
	 * @param   {Boolean}   [options.create]    是否创建文件
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 fileEntry 对象
	 * */
	_getFileEntry(options={}){
		return this._fs.then((fs)=>{
			return new Promise((resolve, reject)=>{
				fs.root.getFile(this._config.fileName, options, resolve, reject);
			});
		});
	}
	/**
	 * @summary 获取 FileWriter 对象
	 * @private
	 * @param   {FileSystemFileEntry}   fileEntry
	 * @return  {Promise}               返回一个 Promise 对象，在 resolve 时传回 fileWriter 对象
	 * */
	_getFileWriter(fileEntry){
		return new Promise((resolve, reject)=>{
			fileEntry.createWriter(resolve, reject);
		});
	}
	/**
	 * @summary 向文件写入内容
	 * @private
	 * @param   {FileWriter}    fileWriter
	 * @param   {String}        content
	 * @return  {Promise}       返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	_writeFile(fileWriter, content){
		return new Promise((resolve, reject)=>{
			let blob = new Blob([content], {
					type: 'text/plain'
				})
				;

			fileWriter.onwriteend = function(e){
				resolve( true );
			};
			fileWriter.onerror = function(e){
				console.log( e );
				reject( e );
			};

			fileWriter.write( blob );
		});
	}
	/**
	 * @summary 向文件写入内容
	 * @private
	 * @param   {String}    content
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	_write(content){
		return this._getFileEntry().then((fileEntry)=>{
			console.log('写入文件 ',  fileEntry.toURL());
			return this._getFileWriter( fileEntry );
		}).then((fileWriter)=>{
			return this._writeFile(fileWriter, content);
		}).then(()=>{
			return true;
		});
	}
	/**
	 * @summary 获取文件对象
	 * @private
	 * @param   {FileSystemFileEntry}   fileEntry
	 * @return  {Promise}               返回一个 Promise 对象，在 resolve 时传回 file 对象
	 * */
	_getFile(fileEntry){
		return new Promise((resolve, reject)=>{
			return fileEntry.file(resolve, reject);
		});
	}
	/**
	 * @summary 读取文件内容
	 * @private
	 * @param   {File}      file
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回文件内容字符串
	 * */
	_readFile(file){
		return new Promise((resolve, reject)=>{
			let fileReader = new FileReader()
				;

			fileReader.onload = function(e){
				resolve( e.target.result );
			};
			fileReader.onerror = function(e){
				console.log( e );
				reject( e );
			};

			fileReader.readAsText( file );
		});
	}
	/**
	 * @summary 获取文件的全部内容
	 * @private
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回对文件内容解析后的 JSON 对象
	 * */
	_read(){
		return this._getFileEntry({
			create: true
		}).then((fileEntry)=>{
			console.log('读取文件 ', fileEntry.toURL());
			return this._getFile( fileEntry );
		}).then((file)=>{
			return this._readFile( file );
		}, (e)=>{
			console.log( e );

			return '{}';
		}).then((content)=>{
			content = content || '{}';

			try{
				content = JSON.parse( content );

				return content;
			}
			catch(e){
				console.log( e );
				return Promise.reject( e );
			}
		});
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary 设置数据
	 * @param   {String|Object} topic
	 * @param   {*}             value
	 * @return  {Promise}       返回一个 Promise 对象，在 resolve 时传回 true
	 * @desc    保持值得时候，同时会保持在内存中
	 * */
	setData(topic, value){
		let result
			, writeTarget
			;

		if( typeof topic === 'object' ){
			writeTarget = topic;
		}
		else if( typeof topic === 'string' ){
			writeTarget = {
				[topic]: value
			};
		}

		if( writeTarget ){

			Object.keys( writeTarget ).forEach((t)=>{
				return super.setData(t, writeTarget[t]);
			});

			result = this._read().then((content)=>{
				return merge(writeTarget, content);
			}).then((content)=>{
				return this._write( JSON.stringify(content) );
			});
		}
		else{
			result = Promise.reject( new Error('参数错误') );
		}

		return result;
	}
	/**
	 * @summary 获取数据
	 * @param   {String|String[]|...String} topic
	 * @return  {Promise}                   返回一个 Promise 对象，若存在 topic 的值，在 resolve 时传回查询出来的 value，否则在 reject 时传回 null
	 * @desc    获取数据时会优先从内存中取值，若没有则从 file system 中取值并将其存入内存中，当 topic 的类型为数组的时候，resolve 传入的结果为一个 json，key 为 topic 中的数据，value 为对应查找出来的值
	 * */
	getData(topic){
		let argc = arguments.length
			, topicList
			, readCache = null      // 读取文件结果缓存
			, getReadCache = ()=>{  // 执行读取文件操作
				return this._read();
			}
			;

		if( Array.isArray(topic) ){
			topicList = topic;
		}
		else if( argc > 1 ){
			topicList = [].slice.call( arguments );
		}
		else{
			topicList = [topic];
		}

		return Promise.all( topicList.map((t)=>{
			return super.getData(t).catch(()=>{
				if( !readCache ){   // 没有缓存，获取缓存
					readCache = getReadCache();
				}

				return readCache.then((content)=>{
					return content[t] || null;
				});
			});
		}) ).then((data)=>{
			let result
				;
			
			if( Array.isArray( topic ) || argc > 1 ){
				result = topicList.reduce((rs, d, i)=>{
					rs[d] = data[i];

					return rs;
				}, {});
			}
			else{
				result = data[0];
			}

			return result;
		});
	}
	/**
	 * @summary 将数据从缓存中删除
	 * @param   {String|String[]|...String} topic
	 * @return  {Promise}                   返回一个 Promise 对象，在 resolve 时传回 true
	 * */
	removeData(topic){
		let argc = arguments.length
			, topicList
			;

		if( Array.isArray(topic) ){
			topicList = topic;
		}
		else if( argc > 1 ){
			topicList = [].slice.call( arguments );
		}
		else{
			topicList = [topic];
		}

		topicList.forEach((t)=>{
			return super.removeData( t );
		});

		return this._read().then((content)=>{
			return topicList.reduce((all, t)=>{
				delete all[t];

				return all;
			}, content);
		}).then((content)=>{
			return this._write( JSON.stringify(content) );
		});
	}
	/**
	 * @summary 清空数据
	 * @return  {Promise}   返回一个 Promise 对象
	 * @desc    删除文件
	 * */
	clearData(){
		return super.clearData().then(()=>{
			return this._getFileEntry({
				create: false
			});
		}).then((fileEntry)=>{
			return new Promise((resolve, reject)=>{
				console.log(fileEntry.toURL(), ' 文件被删除');

				fileEntry.remove(resolve, reject);
			});
		});
	}
	/**
	 * @summary 获取文件存储使用状况
	 * @return  {Promise}   返回一个 Promise 对象，在 resolve 时传回查询结果
	 * @desc    返回结果为一个对象，包括 usage、all、percent 属性，对应为 已使用字节数、总字节数、已用百分比
	 * */
	getUsage(){
		return new Promise((resolve, reject)=>{
			navigator.webkitPersistentStorage.queryUsageAndQuota((usage, quota)=>{
				resolve({
					usage
					, all: quota
					, percent: (usage / quota *100) +'%'
				});
			});
		});
	}
}

/**
 * 在 Model.factory 工厂方法注册，将可以使用工厂方法生成
 * */
Model.register('file', FileSystemModel);
/**
 * 注册别名
 * */
Model.registerAlias('file', ['fs']);