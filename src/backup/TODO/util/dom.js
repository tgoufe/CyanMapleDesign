export function getDomView(dom=document.documentElement){
	let {top,height,left,right,bottom,width}=dom.getBoundingClientRect();
	let range=getViewRange(dom);
	let	total=width*height;
	let viewHeight=Math.min(range.bottom,bottom)-Math.max(range.top,top);
		viewHeight=(viewHeight>0)?viewHeight:0;
	let viewWidth=Math.min(range.right,right)-Math.max(range.left,left);
		viewWidth=(viewWidth>0)?viewWidth:0;
	let percent=viewHeight*viewWidth/total;
	let canView=!!percent;
	return{
		top:top-range.top,
		bottom:range.bottom-bottom,
		left:left-range.left,
		right:range.right-right,
		height:viewHeight,
		width:viewWidth,
		percent,
		canView
	}
}
export function getViewRange(dom=document.documentElement){
	let range={
		top:0,
		bottom:document.documentElement.clientHeight,
		left:0,
		right:document.documentElement.clientWidth
	};
	while(dom!==document.documentElement){
		dom=dom.parentNode
		let {top,height,left,right,bottom,width}=dom.getBoundingClientRect();
		if(height<dom.scrollHeight||width<dom.scrollWidth){
			let {paddingTop,
				paddingBottom,
				paddingLeft,
				paddingRight,
				borderLeftWidth,
				borderRightWidth,
				borderTopWidth,
				borderBottomWidth}=_.mapValues(window.getComputedStyle(dom),value=>parseFloat(value));
			range.top    = Math.max(range.top,top+paddingTop+borderTopWidth);
			range.bottom = Math.min(range.bottom,bottom-paddingBottom-borderBottomWidth);
			range.left   = Math.max(range.left,left+paddingLeft+borderLeftWidth);
			range.right  = Math.min(range.right,right-paddingRight-borderRightWidth);
		}

	}
	return range;
}