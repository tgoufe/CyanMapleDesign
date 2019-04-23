function isInView(dom){
    let {top,left}=$(dom).offset();
    let {clientHeight,clientWidth}=document.documentElement;
    let offsetY=top - (document.body.scrollTop||document.documentElement.scrollTop);
    let offsetX=left - (document.body.scrollLeft||document.documentElement.scrollLeft);
    let inY=offsetY>=0 && offsetY<clientHeight;
    let inX=offsetX>=0 && offsetX<clientWidth;
    return inY&&inX;
}
export {isInView};