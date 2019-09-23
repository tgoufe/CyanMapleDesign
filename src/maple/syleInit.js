/*(function flexible (window, document) {
	var docEl = document.documentElement
	var dpr = window.devicePixelRatio || 1

	// adjust body font size
	function setBodyFontSize () {
		if (document.body) {
			document.body.style.fontSize = (12 * dpr) + 'px'
		}
		else {
			document.addEventListener('DOMContentLoaded', setBodyFontSize)
		}
	}
	setBodyFontSize();

	// set 1rem = viewWidth / 10
	function setRemUnit () {
		var rem = docEl.clientWidth / 10
		docEl.style.fontSize = rem + 'px'
	}

	setRemUnit()

	// reset rem unit on page resize
	window.addEventListener('resize', setRemUnit)
	window.addEventListener('pageshow', function (e) {
		if (e.persisted) {
			setRemUnit()
		}
	})

	// detect 0.5px supports
	if (dpr >= 2) {
		var fakeBody = document.createElement('body')
		var testElement = document.createElement('div')
		testElement.style.border = '.5px solid transparent'
		fakeBody.appendChild(testElement)
		docEl.appendChild(fakeBody)
		if (testElement.offsetHeight === 1) {
			docEl.classList.add('hairlines')
		}
		docEl.removeChild(fakeBody)
	}
}(window, document));*/
let isMobile=/iphone|ipad|android|micromessenger/i.test(window.navigator.appVersion);
(function(window, document){
	if(!window||!document){
		return;
	}
	if(isMobile){
		document.scrollingElement.style.fontSize='10vw';
		document.body.style.fontSize='14px';
	}
})(window, document);
(function(window, document){
	if(!window||!document){
		return;
	}
	let cmuiStyle = document.createElement('style');
	document.head.appendChild(cmuiStyle);
	let cssRules=cmuiStyle.sheet.cssRules;
	let cssRulesLen=cssRules.length;
	let PMstore=new Set;
	let reg=/\b((padding|margin)[trblvh]?|top|bottom|right|left)(-n)?\d+\b/g;
	let nameObject={t:['Top'],l:['Left'],'r':['Right'],b:['Bottom'],v:['Top','Bottom'],h:['Left','Right']};
	function setStyle(selector,name,value){
		cmuiStyle.sheet.insertRule(selector+'{}', cssRulesLen);
		cmuiStyle.sheet.cssRules[cssRulesLen++].style[name]=value;
	}
	function setPMBySet(set){
		for(let item of set){
			let [key,name,pos,isN,value]=/(padding|margin)([trblvh])?(-n)?(\d+)/.exec(item)||
			/(top|left|right|bottom)()?(-n)?(\d+)/.exec(item);
			value=isMobile?`${value/75}rem`:`${value}px`;
			if(pos){
				nameObject[pos].forEach(posName=>{
					setStyle('.'+key,`${name}${posName}`,(isN?'-':'')+value);
				});
			}else {
				setStyle('.'+key,`${name}`,(isN?'-':'')+value);
			}
		}
	}
	function resetPM(dom=document){
		console.log(dom);
		let PMstore_temp=new Set;
		let domList=dom.querySelectorAll('[class*=padding],[class*=margin],[class*=top],[class*=right],[class*=left],[class*=bottom]')||[];
		[...domList].forEach(item=>{
			let match=item.className.match(reg);
			match&&match.forEach(item=>{
				if(!PMstore.has(item)){
					PMstore.add(item);
					PMstore_temp.add(item);
				}
			});
		});
		setPMBySet(PMstore_temp);
	}
	new MutationObserver(mutations => {
		console.log(mutations);
		let temp=new Set;
		mutations.reduce((rs,item)=>{
			if(item.type==='attributes'){
				temp.add(item.target.parentNode);
			}else if(item.type==='childList'&&item.addedNodes.length){
				temp.add(item.target);
			}
		},{});
		([...temp]).forEach(resetPM);
	}).observe(document.body, {
		childList: true,
		subtree: true,
		attributeFilter: ['class']
	});

	if(document.readyState === "complete"){
		// obs();
		resetPM();
	}
	else{
		document.addEventListener('DOMContentLoaded',()=>{
			// obs();
			resetPM();
		},false);
	}
})(window, document);