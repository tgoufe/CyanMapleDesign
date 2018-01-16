/**
 * Created by chenqifeng on 2016/8/26.
 */

function Maple(selector,options){
    return new Maple.prototype.init(selector,options);
}
Maple.prototype.init=function(selector,options){};
Maple.prototype.init.prototype=Maple.prototype;


export default Maple;




