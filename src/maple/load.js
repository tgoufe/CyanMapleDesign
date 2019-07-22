import {forEach,isObject} from 'lodash';
function BaseLoad(src,tagName,props={}){
    return new Promise(resolve => {
        let dom =document.createElement(tagName);
        dom.src=src;
        (function loop(props,target){
            forEach(props,(value,key)=>{
                if(isObject(value)){
                    loop(value,target[key])
                }else{
                    target[key]=value;
                }
            })
        })(props,dom);
        dom.onload=function(){
            setTimeout(function(){
                resolve(dom);
            });
        };
        dom.onError=function(){
            resolve(null);
        };
        document.body.appendChild(dom);
    })
}
function load(options={}){
    let{type,url}=options;
    switch (type) {
        case 'js':
        case 'javascript':
            return BaseLoad(url,'javascript',{
                type:'text/javascript'
            });
        case 'css':
            return BaseLoad(url,'link',{
                ref:'stylesheet'
            });
        case 'img':
        case 'image':
            return BaseLoad(url,'img',{
                style:{
                    display:'none'
                }
            });
        case 'iframe':
            return BaseLoad(url,'iframe',{
                style:{
                    display:'none'
                }
            });
        default:
            return Promise.resolve(null)
    }
}
export default load;