(function flexible (window, document) {
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
}(window, document));
(function(window, document){
	if(!window||!document){
		return;
	}
	let cmuiStyle = document.createElement('style');
	document.head.appendChild(cmuiStyle);
	let cssRules=cmuiStyle.sheet.cssRules;
	let cssRulesLen=cssRules.length;
	let PMstore=new Set;
	function setStyle(selector,name,value){
		cmuiStyle.sheet.insertRule(selector+'{}', cssRulesLen);
		cmuiStyle.sheet.cssRules[cssRulesLen++].style[name]=value;
	}
	function resetPM(dom=document.body){
		let PMstore_temp=new Set;
		let domList=dom.querySelectorAll('[class*=padding],[class*=margin]');
		let nameObject={t:['Top'],l:['Left'],'r':['Right'],b:['Bottom'],v:['Top','Bottom'],h:['Left','Right']};
		[...domList].forEach(item=>{
			item.className.match(/\b(padding|margin)[trblvh]?(-n)?\d+\b/g)
				.forEach(item=>{
					if(!PMstore.has(item)){
						PMstore.add(item);
						PMstore_temp.add(item);
					}
				});
		});
		for(let item of PMstore_temp){
			let [key,name,pos,isN,value]=/(padding|margin)([trblvh])?(-n)?(\d+)/.exec(item);

			if(pos){
				nameObject[pos].forEach(posName=>{
					setStyle('.'+key,`${name}${posName}`,(isN?'-':'')+value+'px')
				});
			}else {
				setStyle('.'+key,`${name}`,(isN?'-':'')+value+'px')
			}
		}
	}
	const mutationObserver = new MutationObserver(mutations => {
		([...new Set(mutations.map(item=>item.target))]).forEach(resetPM);
	});
	function obs(){
		mutationObserver.observe(document.body, {
			childList: true,
			subtree: true,
			attributeFilter: ['class']
		});
	}
	document.addEventListener('DOMContentLoaded',()=>{
		obs();
		resetPM();
	}, false);
})(window, document);