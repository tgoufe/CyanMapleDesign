'use strict';

/**
 * @file    以 Vue 插件的形式提供 router 功能
 *          提供 v-router 命令以替代 v-show，可传入方法或值，也可以调用预设方法 router，如 v-router="router('/a/1.html')"
 *          提供 v-href 用于替代 a 标签的 href 属性，该命令仅作用于 a 标签上
 * */

import maple from '../base.js';

let router = new maple.Router({
		mode: maple.device.weixin ? 'hash' : 'history'
	})
	;

let install = {
		install(Vue){
			if( install.installed ){
				return;
			}

			install.installed = true;

			Vue.directive('router', (el, {value})=>{
				let rs
					;

				if( typeof value === 'function' ){
					rs = value();
				}
				else{
					rs = value;
				}

				// 判断路由
				if( rs ){
					el.style.display = '';
				}
				else{
					el.style.display = 'none';
				}
			});

			Vue.directive('href', (el, {value})=>{
				if( el.tagName === 'A' ){   // 为 a 标签
					if( !el.dataset.on ){
						el.addEventListener('click', ()=>{
							let rs = router.go( value )
								;

							if( !rs ){
								url.changePage( value );
							}
						});
						el.dataset.on = true;
					}
				}
				else{
					el.href = value;
				}
			});

			Vue.mixin({
				data(){
					return {
						currentRouter: ''
					};
				}
				, methods: {
					router(path){
						if( this.currentRouter ){
							return this.currentRouter === path;
						}

						return false;
					}
				}
			});
		}
		, installed: false
		, router
		, init(vm){
			router.init();

			router.on(function(){
				vm.currentRouter = this.currentPath;
			});

			vm.currentRouter = router.currentPath;

			maple.url.popState.add(function(){
				vm.currentRouter = router.currentPath;
			});
		}
	}
	;

export default install;