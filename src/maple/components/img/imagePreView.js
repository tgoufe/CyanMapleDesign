import _ from 'lodash'
import cmuiSlider from '../slider/main.vue'
import cmuiSliderItem from '../slider-item/main.vue'
function ImagePreView(ImageList, index = 0, options) {
  let vm = this
  const id = _.uniqueId('preView_')
  const tpl = `
        <transition name="fade" id="${id}">
		    <div class="fixed-full cmui-image-preView" v-if="show" @click="preViewListClick($event)" @touchmove.stop.prevent="function(){}">
		        <cmui-slider :watch="preViewList_temp" :page="true" :auto="0" :loop="preViewList_temp.length>1" :options="options">
		            <cmui-slider-item v-for="item in preViewList_temp" >
		                <img :src="item" alt="" style="max-height: 100vh">
		            </cmui-slider-item>
		        </cmui-slider>
		    </div>
	    </transition>
	`
  let dom = document.createElement('div')
  document.body.appendChild(dom)
  let Vue = this.$root.constructor
  return new Vue({
    components: { cmuiSlider, cmuiSliderItem },
    data: {
      preViewList_temp: [].concat(ImageList),
      show: false,
      options: _.assign({ initialSlide: index }, options)
    },
    mounted() {
      _.defer(() => {
        this.show = true
        vm.$emit('preview', true)
      })
    },
    methods: {
      preViewListClick: function(event) {
        event.stopPropagation()
        if (
          !_.includes(
            _.get(event, 'target.classList'),
            'swiper-pagination-bullet'
          ) &&
          _.get(this, '$children[0]')
        ) {
          this.$children[0].$destroy()
          this.show = false
          this.$nextTick(function() {
            vm.$emit('preview', false)
          })
        }
      }
    },
    template: tpl
  }).$mount(dom)
}
export default ImagePreView
