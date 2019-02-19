
function ImagePreView(ImageList,index=0,options){
    let vm=this;
	const id=_.uniqueId('preView_');
	const tpl=`
        <transition name="fade" id="${id}">
		    <div class="fixed-full flex-container cmui-image-preView" v-if="show" @click="preViewListClick($event)" @touchmove.stop.prevent="function(){}">
		        <cmui-slider :watch="preViewList_temp" :page="true" :auto="0" :loop="preViewList_temp.length>1" :options="options">
		            <cmui-slider-item v-for="item in preViewList_temp" >
		                <img :src="item" alt="" style="max-height: 100vh">
		            </cmui-slider-item>
		        </cmui-slider>
		    </div>
	    </transition>
	`;
    $('body').append(tpl);

    new Vue({
        el:'#'+id,
        data:{
            preViewList_temp:[].concat(ImageList),
            show:false,
            options:_.assign({initialSlide:index},options)
        },
        methods:{
            preViewListClick:function(event){
                event.stopPropagation();
                if(!_.includes(_.get(event,'target.classList'),'swiper-pagination-bullet')&&_.get(this,'$children[0]')){
                    this.$children[0].$destroy();
                    this.show=false;
                    this.$nextTick(function(){
                        vm.$emit('preview',false);
                		$(this.$el).remove();
                	});
                }
            }
        },
        mounted(){
            _.defer(()=>{
                this.show=true;
                vm.$emit('preview',true);
            });
        }
    });
}
export default ImagePreView;