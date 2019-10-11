/**
 * 摇一摇对应事件
 * 调用方式maple.shake
 * 参数使用方式1：
 * 		参数中的第一个函数[startFn]     => 摇动时要执行的函数
 * 		参数中的第二个函数[endFn]       => 摇动结束执行的函数
 * 		参数中的数字类型[interval]      => 连续两次触发事件的时间间隔，默认没有延时
 * 		参数中的布尔类型[continueEvent] => 连续摇动时是否连续触发事件，默认true
 * 	EXP:摇动时每2秒在的控制台打印一下，停止摇动时打印一下
 * 	maple.shake(function(){
 * 		console.log('begin')
 * 	},function(){
 * 		console.log('end')
 * 	},2000)
 * 参数使用方式2：
 * 		传入一个对象，对应结构如下
 * 		{
 * 			startFn=>function
 *		  	endFn=>function
 *		   	interval=>number
 *		    continueEvent=>boolean
 * 		}
 * 参数使用方式3：前两种方式混合使用，对象的优先级更高，会覆盖前面的参数
 * EXP：maple.shake(function(){console.log('begin')},{interval:2000})
 */
import _ from 'lodash';
let eventName=(function(){
    if('DeviceMotionEvent' in window){
        return 'devicemotion';
    }else if('DeviceOrientationEvent' in window){
        return 'deviceorientation';
    }else{
        return false;
    }
})();
class shakeHandle{
    constructor(options){
        this.handleList=_.filter(options,_.isFunction);
        this.handle=function(e){
            let acceleration = e.acceleration||e.accelerationIncludingGravity, x, y, z;
                if(acceleration){
                    x=acceleration.x;
                    y=acceleration.y;
                    z=acceleration.z;
                    if([x,y,z].some(item=>Math.abs(item)>15)){
                        clearTimeout(options.timer);
                        if(options.continueEvent){
                            options.startFn();
                        }else if(options.hasRun===false){
                            options.startFn();
                            options.hasRun=true;
                        }
                        options.timer=setTimeout(function(){
                                options.endFn();
                                if(!options.continueEvent){
                                    options.hasRun=false;
                                }
                        }, 500);
                    }
                }
        };
        if(eventName){
            window.addEventListener(eventName,this.handle,false);
        }
    }
    cancel(){
        window.removeEventListener(eventName,this.handle);
    }
}
export default function shake(){
	let options={
		startFn:_.filter(arguments,_.isFunction)[0]||new Function,
		endFn:_.filter(arguments,_.isFunction)[1]||new Function,
		interval:_.filter(arguments,_.isNumber)[0]||0,//每次触发startFn的时间间隔
		continueEvent:_.filter(arguments,_.isBoolean)[0]||true//摇动过程中是否持续执行startFn事件
	};
	_.assign(options,_.find(arguments,_.isPlainObject));
	if(!options.continueEvent){
		options.hasRun=false;
	}else if(options.interval>16){//针对16毫秒的时差做兼容
		options.startFn=_.throttle(options.startFn,options.interval,{ 'trailing': false });
	}
	return new shakeHandle(options);
}
