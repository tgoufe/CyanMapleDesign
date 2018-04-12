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
let vm;
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
	let template=$(`
		<cmui-mask-panel position="${position}"
		:visible.sync="visible"
		:style="style"
		:width="width"
		:height="height"
		@hide="hide"
		>
			<div slot="top">${topContent}</div>
			${content}
			<div slot="bottom">${bottomContent}</div>
		</cmui-mask-panel>
	`);
	parent=$(parent);
	if(parent.length){
		parent.append(template);
		return new Vue({
			el:template[0],
			data:function(){
				return {
					style:style,
					width:contentWidth,
					height:contentHeight,
					visible:true
				}
			},
			methods:{
				hide(){
					$(this.$el).remove();
				}
			}
		})
	}
}
export default MaskPanel