'use strict';

class HandlerQueue{
	/**
	 * @constructor
	 * */
	constructor(){
		this._queue = [];
		this._currIndex = 0;
	}

	// ---------- 公有函数 ----------
	/**
	 * @summary 向队列中添加 handler
	 * @param   {Function}  handler
	 * @return  {Number}    handler 在队列中的 id，方便删除
	 * */
	add(handler){
		if( typeof handler === 'function' ){
			return this._queue.push( handler );
		}
		else{
			return -1;
		}
	}
	/**
	 * @summary 队列中是否存在该 handler
	 * @param   {Function}  handler
	 * @return  {Boolean}
	 * */
	has(handler){
		return this._queue.indexOf( handler ) !== -1;
	}
	/**
	 * @summary 从队列中移除相应的 handler
	 * @param   {Number|Function}   findBy
	 * */
	remove(findBy){

		if( typeof findBy === 'function' ){
			findBy = this._queue.indexOf( findBy );
		}
		else if( typeof findBy === 'number' ){
			findBy = parseInt( findBy );    // 去掉小数
		}
		else{
			return;
		}

		if( findBy > -1 ){
			this._queue[findBy] = null;
		}
	}
	/**
	 * @summary 清空队列
	 * */
	empty(){
		this._queue = [];
		this._currIndex = 0;
	}
	/**
	 * @summary 队列中是否还有剩余
	 * @return  {Boolean}
	 * */
	remain(){
		return this._currIndex < this._queue.length;
	}
	/**
	 * @summary 按顺序返回队列中的 handler
	 * @return  {Function|Null}
	 * @desc    当队列为空时或到队列末尾时返回 null
	 * */
	next(){
		let result = null
			, i = this._currIndex
			, j = this._queue.length
			;
		
		if( j ){
			for(; i < j; i++ ){
				result = this._queue[i];

				if( result !== null ){
					break;
				}
			}
			if( i !== j ){
				this._currIndex = i +1;
			}
		}

		return result;
	}
	/**
	 * @summary 重置队列
	 * */
	reset(){
		this._currIndex = 0;
	}
	/**
	 * @summary 执行队列中的一个 handler，内部指针将指向下一个 handler
	 * @param   {...*}
	 * @return  {*}
	 * @desc    当传入参数时，参数被视为传入 handler 的参数
	 * */
	fire(){
		return this.next()( ...arguments );
	}
	/**
	 * @summary 以指定上下文来执行队列中的一个 handler，内部指针将指向下一个 handler
	 * @param   {Element|Window|Object} context=null
	 * @param   {Array|*}               [args=[]]
	 * @return  {*}
	 * */
	fireWith(context=null, args=[]){

		if( !Array.isArray(args) ){
			args = [args];
		}

		return this.next().apply(context, args);
	}
	/**
	 * @summary 执行队列中的全部 handler，将返回一个结果数组
	 * @param   {...*}
	 * @return  {Array} 数组中将不包括已失效
	 * @desc    当传入参数时，参数被视为传入 handler 的参数（所有 handler 都会传入相同的参数），全部执行后会重置
	 * */
	fireAll(){
		let args = arguments
			;

		this.reset();

		return this._queue.filter( d=>d !== null ).map( d=>d( ...args ) );
	}
	/**
	 * @summary 以指定上下文的方式执行队列中的全部 handler，将返回一个结果数组
	 * @param   {Element|Window|Object} context=null
	 * @param   {Array|*}               [args=[]]
	 * @return  {*}
	 * */
	fireAllWith(context=null, args=[]){
		this.reset();

		if( !Array.isArray(args) ){
			args = [args];
		}

		return this._queue.filter( d=>d !== null ).map( d=>d.apply(context, args) );
	}
	/**
	 * @summary 顺序执行队列中的全部 handler，前一个 handler 的返回结果觉得下一个 handler 是否执行
	 * @param   {...*}
	 * @return  {Boolean|Undefined}
	 * @desc    当 handler 返回 false 时，将终止队列的中后续 handler 的执行
	 * */
	fireLine(){
		let args = arguments
			;

		this.reset();

		return this._queue.filter( d=>d !== null ).some( d=>d( ...args ) === false );
	}
	/**
	 * @summary 以指定上下文的方式顺序执行队列中的全部 handler，前一个 handler 的返回结果觉得下一个 handler 是否执行
	 * @param   {Element|Window|Object} context=null
	 * @param   {Array|*}               [args=[]]
	 * @return  {*}
	 * */
	fireLineWith(context=null, args=[]){
		this.reset();

		if( !Array.isArray(args) ){
			args = [args];
		}

		return this._queue.filter( d=>d !== null ).some( d=>d.apply(context, args) === false );
	}
	/**
	 * @summary 用 reduce 的形式执行队列中的全部 handler，即前一个 handler 的返回结果作为下一个 handler 的参数
	 * @param   {*}         [init]
	 * @return  {Promise}
	 * @desc    当传入参数时，参数被视为传入第一个 handler 的参数，全部执行后会重置
	 *          由于为 reduce 方式调用，将只允许传入一个初始参数，并且原则上所有 handler 都应只有一个参数
	 *          由于为 reduce 方式调用，将返回 Promise 类型的结果
	 * */
	fireReduce(init){
		
		this.reset();

		return this._queue.filter( d=>d !== null ).reduce((promise, d)=>{
			return promise.then( rs=>d( rs ) );
		}, Promise.resolve( init ));
	}
	/**
	 * @summary 以指定上下文的方式用 reduce 的形式执行队列中的全部 handler，即前一个 handler 的返回结果作为下一个 handler 的参数
	 * @param   {Element|Window|Object} context=null
	 * @param   {*}                     [init]
	 * @return  {Promise}
	 * @desc    当传入 init 参数时，参数被视为传入第一个 handler 的参数，全部执行后会重置
	 *          由于为 reduce 方式调用，将只允许传入一个初始参数，并且原则上所有 handler 都应只有一个参数
	 *          由于为 reduce 方式调用，将返回 Promise 类型的结果
	 * */
	fireReduceWith(context=null, init){

		this.reset();


		return this._queue.filter( d=>d !== null ).reduce((promise, d)=>{
			return promise.then( rs=>d.call(context, rs) );
		}, Promise.resolve( init ));
	}
}

export default HandlerQueue;