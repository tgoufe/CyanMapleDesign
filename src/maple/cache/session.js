import {sessionStorage as supportSession} from '../support';
import {isObject} from '../util';

let sessionKey = 'tg_session_cache',
    cache = supportSession ? sessionStorage : false,
    data = supportSession?JSON.parse((cache.getItem(sessionKey) || JSON.stringify({}))) : {},
    sessionData = function(){
        let length = arguments.length;
        if(!length){
            return data;
        }else if(length === 1){
            if(isObject(arguments[0])){
                data = $.extend({},data,arguments[0]);
                cache && cache.setItem(sessionKey,JSON.stringify(data));
            }else{
                return data[arguments[0]]
            }
        }else if(length === 2){
            data[arguments[0]] = arguments[1];
            cache && cache.setItem(sessionKey,JSON.stringify(data));
        }
    };
sessionData.remove = function(key){
    let length = arguments.length;
    if(!length){
        this.removeAll();
    }else{
        for(let i = 0; i < length; i++){
            data[arguments[i]] = undefined;
            delete data[arguments[i]];
        }
        cache && cache.setItem(sessionKey,JSON.stringify(data));
    }
};
sessionData.removeAll = function(){
    data = {};
    cache && cache.setItem(sessionKey,JSON.stringify(data));
};

export {sessionData};