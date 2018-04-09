let defaultOptions={
	parent:'body',
	topContent:'',
	content:'',
	bottomContent:'',
	style:{},
	contentWidth:'80%',
	contentHeight:'100%',
	position:'right'
}
function MaskPanel(options={}){
	let {
		parent,
		topContent,
		content,
		bottomContent,
		style,
		contentWidth,
		contentHeight,
		position,
	}=_.defaults(options,defaultOptions);
	$(function(){
		let template=$(`
			<cmui-mask-panel position="${position}" :style="style" :width="width" :height="height">
				<div slot="top">${topContent}</div>
				${content}
				<div slot="bottom">${bottomContent}</div>
			</cmui-mask-panel>
		`);
		parent=$(parent);
		if(parent.length){
			parent.append(template);
			new Vue({
				el:template[0],
				data:function(){
					return {
						style:style,
						width:contentWidth,
						height:contentHeight
					}
				}
			})
		}
	})
}
export default MaskPanel