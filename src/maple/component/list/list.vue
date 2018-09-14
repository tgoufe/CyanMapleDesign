<script>
export default{
	name:'cmui-list',
	props:{
		col:{type:[Number,Array],default:1},
		space:{type:Number,default:0},
		border:{type:[Boolean,String],default:false},
		target:Object,
        index:{type:[Boolean,Function],default:true}
	},
  	render(h){
	  let children={
	    groups:[],
        items:[],
        all:[]
      };
	  let _this=this;
	  let slots=this.$slots.default;
      let indexItems=[];
      let indexScrollElm;
      slots.forEach((item,index)=>{
        let isGroup=item.tag==='cmui-list-group';
        let isList=_.get(item,'componentOptions.tag')==='cmui-list-item';
        if(isGroup){
          let listItemInGroup=item.children.filter(item=>_.get(item,'componentOptions.tag')==='cmui-list-item');
          let {border}=this;
          let groupTitle=_.get(item,'data.attrs.title');
          let titleDom=h('div',{"class":'cmui-list-item-title'},[groupTitle||'']);
          if(this.index){
            if(_.isFunction(this.index)){
              groupTitle=this.index(groupTitle)
            }
            let scrollData={};
            indexItems.push(h('span',{
            },[String(groupTitle)]))
          }
          let groupRender=h('cmui-list-item',{
            'class':'cmui-list-group'
          },[
            titleDom,
            h('cmui-list',{props:{border}},listItemInGroup)
          ]);
          children.groups.push(groupRender);
          children.all.push(groupRender)
        }else if(isList){
          children.items.push(item);
          children.all.push(item);
        }
      })
      let indexScrollDom=h('div',{
        "class":'indexWarp flex-container-col scroll-container-y',
        style:{maxHeight:'100%'}
      },indexItems);
      let indexDom=h('div',{
        "class":'fixed-right flex-container center cmui-list-index',
        style:{
          "z-index":21
        }
      },[indexScrollDom]);
      let cmuiListEvent={};
      if(indexItems.length){
        let listEventStartX;
        let listEventStartY;
        let index=0;
        let indexItemsDom;
        let indexItemHeight;
        let activeIndex;
        let startIndex;
        let oldIndex;
        let scrollToActiveGroup=function(current,old){
          if(old>-1){
            indexItems[old].elm.classList.remove('active')
          }
          indexItems[current].elm.classList.add('active')
          children.groups[current].elm.scrollIntoView();
          oldIndex=current;
        }
        _.delay(function(){
          if(!_this.index){
            return;
          }
          let parentNode=_this.$el;
          let baseNode=_this.$el.firstChild;
          while(parentNode.clientHeight>=baseNode.clientHeight){
            if(parentNode===document.body){
              parentNode=document
              break;
            }
            parentNode=parentNode.parentNode;
          }
          $(parentNode).on('scroll',function(){
            let currentIndex=children.groups.filter(item=>item.elm.getBoundingClientRect().top<0).length-1;
            if(indexItems[oldIndex]){
              indexItems[oldIndex].elm.classList.remove('active');
            }
            if(indexItems[currentIndex]){
              indexItems[currentIndex].elm.classList.add('active');
            }
            oldIndex=currentIndex
          })
        });
        cmuiListEvent.touchstart=function(e){
          let target=e.touches[0].target;
          oldIndex=_.isNumber(oldIndex)?oldIndex:indexItems.indexOf(item=>_.includes(item.elm.classList,'active'));
          indexItemsDom=indexItemsDom||indexItems.map(item=>item.elm);
          startIndex=activeIndex=indexItemsDom.indexOf(target);
          indexScrollElm=indexScrollElm||indexScrollDom.elm;
          // listEventStartX=e.touches[0].clientX;
          listEventStartY=e.touches[0].clientY;
          if(activeIndex>-1){//target is indexBar
            indexItemHeight=indexItemHeight||$(target).outerHeight();
            scrollToActiveGroup(activeIndex,oldIndex);
          }
        }
        cmuiListEvent.touchmove=function(e){
          // let disX=e.touches[0].clientX-listEventStartX;
          let disY=e.touches[0].clientY-listEventStartY;
          if(activeIndex>-1){//target is indexBar
            let disCount=parseInt(disY/indexItemHeight);
            if(activeIndex!==startIndex+disCount){
              activeIndex=startIndex+disCount;
              if(indexItems[activeIndex]){
                scrollToActiveGroup(activeIndex,oldIndex);
              }
            }
            if(disY>0&&indexScrollElm.scrollTop===0){//to down
                e.preventDefault();
            }else if(disY<0&&(indexScrollElm.scrollHeight-indexScrollElm.scrollTop===indexScrollElm.clientHeight)){//to up
                e.preventDefault();
            }
          }
          e.stopPropagation();
        }
      }
      let cmuiListDom= h('div',{
	    'class':['cmui-list',{'overflow-h':this.needOverHide}],
		style:this.boxShadow,
        on:_this.index?cmuiListEvent:undefined
	  },[
	    h('div',{'class':'clearfix',style:this.containerStyle},children.all)
	  ].concat(indexItems.length?indexDom:undefined))
      return cmuiListDom;
	},
	data:function(){
		var defaultBorderColor="#eeeeee"
		,	isColor=/^#[a-fA-F0-9]{6}$/.test(this.border)
		,	borderColor=isColor?this.border:defaultBorderColor
		;
		return {
			borderColor
		}
	},
	computed:{
		realSpace:function(){
			var value=parseInt(this.space);
	        if(_.isNumber(value)){
	        	if(_.inRange(value,-1,51)){
	        		return (value/75)||0
	        	}
	        }
	        return 0;
	    },
	    realCol(){
	    	var value=this.col;
	    	if(_.isNumber(value)){
				if(_.inRange(value,0,11)){
					return parseInt(value)||1
				}else{
					return 1;
				}
			}else if(_.isArray(value)&&_.every(value,_.isNumber)){
				return value.map(item=>parseInt(item)||1);
			}else{
				return parseInt(value)||1;
			}
	    },
	    containerStyle(){
	    	return {
	    		'margin-right':'-'+this.realSpace+'rem',
	    		'margin-bottom':'-'+this.realSpace+'rem'
	    	}
	    },
	    boxShadow(){
	    	if(this.border&&this.realSpace==0){
	    		return '0px 0px 0px 1px '+this.borderColor
	    	}
	    	return
	    },
	    needOverHide(){
	    	return _.get(this,'$parent.itemContainerStyle.boxShadow')&&this.border&&this.space;
	    }
	}
}
</script>
