function ImagePreView(...arg){
	const id=_.uniqueId('preView_');
	const tpl=`
        <transition name="fade" id="${id}">
		    <div class="fixed-full flex-container cmui-image-preView" v-if="show" @click="preViewListClick($event)">
		        <cmui-slider :items="preViewList_temp" :auto="0" :loop="preViewList_temp.length>1">
		            <cmui-slider-item v-for="item in preViewList_temp" >
		                <img :src="item" alt="">
		            </cmui-slider-item>
		        </cmui-slider>
		    </div>
	    </transition>
	`;
    $('body').append(tpl);
    var vm=new Vue({
        el:'#'+id,
        data:{
            preViewList_temp:[].concat(...arg),
            show:false
        },
        methods:{
            preViewListClick:function(event){
                event.stopPropagation()
                if(!_.includes(_.get(event,'target.classList'),'swiper-pagination-bullet')){
                    this.$children[0].$destroy()
                    vm.show=false;
                    vm.$nextTick(function(){
                		$(this.$el).remove();
                	})
                }
            }
        },
        mounted(){
            _.defer(function(){vm.show=true})
        }
    })
}
export default ImagePreView;