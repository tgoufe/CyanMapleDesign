'use strict';

import Model from './model.js';
import merge from '../util/merge.js';

/**
 * 默认配置
 * @const
 * */
const WEB_SOCKET_CONFIG = {
		protocol: 'ws'  // ws 或 wss
	}
	;

/**
 * @class
 * @classdesc   WebSocket 接口，与 Model 统一接口，隔离数据与数据来源的问题，在 Model.factory 工厂方法注册为 webSocket，别名 socket，将可以使用工厂方法生成
 * @extends     Model
 * */
class WebSocketModel extends Model{
	/**
	 * @constructor
	 * @param   {Object}    [config={}]
	 * */
	constructor(config={}){
		super( config );

		this._config = merge(config, WebSocketModel._CONFIG);

		this._clinet = new Promise((resolve, reject)=>{
			if( 'WebSocket' in self ){
				let socket = new WebSocket(this._config.url)
					;

				socket.onopen = ()=>{
					resolve( socket );
				};
				socket.onclose = ()=>{
					this._clinet = Promise.reject( new Error('该 Web Socket 连接已经被关闭') );
				};
				socket.onmessage = (e)=>{
					let data = e.data
						;

					if( data.topic && data.data ){
						super.setData(data.topic, data.data);
					}
				};
				socket.onerror = ()=>{
					this._client = Promise.reject( new Error('该 Web Socket 出现异常进而关闭') );
				};
			}
			else{
				reject( new Error('此浏览器不支持 Web Socket') );
			}
		});
	}

	// // ---------- 静态方法 ----------
	// static isOpen(){
	// 	if( 'WebSocket' in self ){
	// 		return WebSocket.OPEN;
	// 	}
	// 	else{
	// 		return false;
	// 	}
	// }

	// ---------- 静态属性 ----------
	/**
	 * @summary 默认配置
	 * @static
	 * @const
	 * */
	static get _CONFIG(){
		return WEB_SOCKET_CONFIG;
	}

	// ---------- 私有方法 ----------
	/**
	 * @summary 检测 socket 是否还连接着
	 * @private
	 * @param   {WebSocket} socket
	 * @return  {Boolean}   socket 是否连接着
	 * */
	_state(socket){
		return socket.readyState === WebSocket.OPEN;
	}

	// ---------- 公有方法 ----------
	/**
	 * @summary 获取数据
	 * @param   {String}    topic
	 * @param   {*}         data
	 * @return  {Promise}   数据发送是否成功
	 * */
	setData(topic, data){
		return this._clinet.then((socket)=>{
			let result
				;

			if( this._state(socket) ){
				socket.send({
					topic
					, data
				});

				result = true;
			}
			else{
				result = Promise.reject( new Error('该 Web Socket 连接已被关闭') );
			}

			return result;
		});
	}
	/**
	 *
	 * */
	getData(topic){
		return this.setData(topic, {});
	}
	/**
	 *
	 * */
	removeData(topic){}
	/**
	 * 
	 * */
	clearData(){}
	/**
	 * @summary 关闭当前 socket 连接
	 * @param   {Number}    [code]
	 * @param   {String}    [reason]
	 * @return  {Promise}
	 * */
	close(code, reason){
		return this._clinet.then((socket)=>{
			socket.close();

			return true
		});
	}
}

/**
 * 在 Model.factory 工厂方法注册，将可以使用工厂方法生成
 * */
Model.register('webSocket', WebSocketModel);
/**
 * 注册别名
 * */
Model.registerAlias('webSocket', 'socket');

export default WebSocketModel;