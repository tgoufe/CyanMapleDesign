'use strict';

/**
 * @class   Animator
 * */
class Animator {
	/**
	 * @constructor
	 * @param   {Number}            duration            运行时间，单位毫秒
	 * @param   {Function}          progress            运行操作
	 * @param   {String|Function}   [easing='linear']   变化速率
	 * */
	constructor(duration, progress, easing='linear'){
		this.duration = duration;
		this.progress = progress;

		this._animate = null;

		// 设置动画变化速率
		if( typeof easing === 'function' ){
			this.easing = easing;
		}
		else if( typeof easing === 'string' && easing in Animator.timing ){
			this.easing = Animator.timing[easing];
		}
		else{
			this.easing = Animator.timing.linear;
		}
	}

	/**
	 * @param   {Boolean|Function}  [finished]  Boolean 值时表示是否继续运行，Function 时为运行结束的回调函数
	 * @desc    运行动画
	 * */
	run(finished){
		let startTime = Date.now()
			, duration = this.duration
			, self = this
			;

		this._animate = requestAnimationFrame(function step(){
			let p = (Date.now() - startTime) / duration
				, next = true
				;

			if( p < 1.0 ){
				self.progress(self.easing(p), p);
			}
			else{
				if( typeof finished === 'function' ){
					next = finished() === false;
				}
				else{
					next = finished === false;
				}

				if( !next ){
					self.progress(self.easing(1.0), 1.0);
				}
				else{
					startTime += duration;
					self.progress(self.easing(p), p);
				}
			}

			if( next ){
				self._animate = requestAnimationFrame( step );
			}
			else{
				self._animate = null;
			}
		});
	}
	/**
	 * @desc    停止动画
	 * */
	stop(){
		if( this._animate ){
			cancelAnimationFrame( this._animate );

			this._animate = null;
		}
	}

	/**
	 * @desc    将动画代码渲染为 CSS 动画
	 * */
	renderCSS(){

	}
}

Animator.timing = {
	linear: function(p){
		return p;
	}
	, easing: function(p){

	}
	, easingIn: function(p){

	}
	, easingInOut: function(p){

	}
	, easingOut: function(p){

	}
};

export default Animator;