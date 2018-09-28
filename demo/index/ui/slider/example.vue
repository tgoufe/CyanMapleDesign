<template>
	<div>
		<cmui-slider :col="4" :options="{slideToClickedSlide: true}">
	    	<cmui-slider-item v-for="i in imageList">
	    		<img :src="i">
	    	</cmui-slider-item>
	    </cmui-slider>
		<div class="example margin10 tag-container">
			<p>默认的滚动</p>
	        <cmui-slider>
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="ratio-container-5x2 bg-red">
	        			<div class="flex-container center">
	        				Slide {{i}}
	        			</div>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container">
			<p>导航：设置nav为true即可</p>
	        <cmui-slider :nav="true">
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="ratio-container-5x2 bg-red">
	        			<div class="flex-container center">
	        				Slide {{i}}
	        			</div>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container">
			<p>分页：设置page为true即可</p>
	        <cmui-slider :page="true">
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="ratio-container-5x2 bg-red">
	        			<div class="flex-container center">
	        				Slide {{i}}
	        			</div>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container">
			<p>动态分页：设置page为数字即可</p>
	        <cmui-slider :page="2">
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="ratio-container-5x2 bg-red">
	        			<div class="flex-container center">
	        				Slide {{i}}
	        			</div>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container">
			<p>动态分页：设置page为progress即可</p>
	        <cmui-slider page="progress">
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="ratio-container-5x2 bg-red">
	        			<div class="flex-container center">
	        				Slide {{i}}
	        			</div>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container">
			<p>动态分页：设置page为number即可</p>
	        <cmui-slider page="number">
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="ratio-container-5x2 bg-red">
	        			<div class="flex-container center">
	        				Slide {{i}}
	        			</div>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container">
			<p>显示数量：设置col属性为数字，设置space属性表示slider之间的间距</p>
	        <cmui-slider :col="3.5" :space="20">
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="ratio-container-2x3 bg-red">
	        			<div class="flex-container center">
	        				Slide {{i}}
	        			</div>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
		<div class="example margin10 tag-container">
			<p>自动跨度：将col属性设置为0，会以内容为宽度自动适应</p>
	        <cmui-slider :col="0" :space="20">
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="ratio-container-2x3 bg-red" :style="getRandomWidth()">
	        			<div class="flex-container center">
	        				{{i}}
	        			</div>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container">
			<p>freeMode模式：设置freeMode属性为true即可</p>
	        <cmui-slider :free-mode="true" :col="0" :space="20">
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="ratio-container-2x3 bg-red" :style="getRandomWidth()">
	        			<div class="flex-container center">
	        				{{i}}
	        			</div>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container">
			<p>垂直滚动：设置direction="vertical"同时设置height属性表示高度</p>
	        <cmui-slider direction="vertical" height="20px">
	        	<cmui-slider-item v-for="i in 10">
	        		<div class="bg-red" style="height:20px">
	        			滚动的文字
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container">
			<p>内容滚动：设置height="400px" :col="0" direction="vertical" :free-mode="true"</p>
	        <cmui-slider height="400px" direction="vertical" :col="0" :free-mode="true" :scrollbar="true">
	        	<cmui-slider-item  style="height:auto">
	        		<div class="content">
		        		<h4 class="title">乌合之众</h4>
			            <p>回答这个问题之前，我想我们应该首先定义如何判断一本书存不存在偏见。我觉得“一本书是否存在偏见”并不在于他所提出的观点本身是否荒诞或者离经叛道，而在于他得出结论的过程是否科学，是否存在缺乏推敲的主观臆断。如果结论拥有完整严谨的推导过程，那么即使答案再令人瞠目结舌，我们也无法说他存在着偏见；反过来说，如果一本书里的论据没有任何可信的来源，结论也是无本之木，即使他的观点让人感觉“好像真是那么回事呀”，那么这套理论也很难摆脱主观思维的限制。</p>
			            <p>以上是典型的理工思维。</p>
			            <p>我从书架上找到了《乌合之众》戴光年的译本，随便翻开了几页：
			              <blockquote> “又比如在亚洲一些野蛮人的部落中 流传着这样的风俗：当他们将骁勇善战的对手击败后，往往会吃下这个人的心脏，认为这样就可以得到他的全部力量和勇气。”（P61）
			              “毫不客气的说，在十个人里面，就有九个人在几年里把他们的时间和努力浪费掉了；而且可以说，这是非常重要的，甚至是决定性的几年。他们中间有一半甚至三分之二的人，是为了考试而活着，然后被残酷地淘汰掉。”（P86）
			              “就历史而言，尤其是文学和艺术的历史，实际上只是再重复那些毫无意义的东西。每个人都不想这样做，但是这些历史所具有的名望压迫着他们，每个人最后都会重复他从学校里学到的东西，直到这些东西变成了一些再没有人敢说三道四的称号和事物。”（P114）
			              </blockquote>
			            </p>
			            <p>在这本书里我们经常可以看到勒庞把各种小说桥段，英雄传说和坊间流言用具有主观性的叙述方式表达出来，用以佐证他的论点，论证的逻辑方式也常常语焉不详——我可以接受这种书籍成为富有趣味性的人文读物，但是说这是一本研究群体心理学方面的重要著作，似乎令人难以接受。如果说《乌合之众》不存在偏见，我会觉得非常奇怪。</p>
			            <br>
			            <p>不过我们可以换一个角度看待勒庞和他的《乌合之众》。对于一部具有重要意义的作品来说，严谨和逻辑不应该作为其主要价值评判标准。我们应该关注的是它发现了什么，创造了什么。一部伟大的作品之所以伟大，并不是因为他严格的遵守着范式，而在于那些闪耀着的具有鲜明色调的个人智慧的光芒——这些东西通常是无法通过逻辑去解释的。从这个层面上说，我们其实并不需要执着于这本书是否存在着偏见，只需要让我们觉得“好像真是那么回事呀”就已经足够了。我没法说出这本书之于心理学的具体意义，但只说他带给我的东西，我觉得已经足够丰富。</p>
			            <br>
			            <p>而上面这些，似乎又是一种人文思维了。</p>
	        		</div>
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	    <div class="example margin10 tag-container" id="controlDemo">
			<p>控制关联：将control属性指向一个固定的ref即可关联两个slider</p>
	        <cmui-slider class="bigSlider" ref="big" control="small">
	        	<cmui-slider-item v-for="i in imageList">
	        		<img :src="i">
	        	</cmui-slider-item>
	        </cmui-slider>
	        <cmui-slider class="smallSlider" ref="small" control="big" :col="0" :options="{centeredSlides: true,slideToClickedSlide: true}">
	        	<cmui-slider-item v-for="i in imageList" style="width:25%">
	        		<img :src="i">
	        	</cmui-slider-item>
	        </cmui-slider>
	    </div>
	</div>
</template>
<style type="text/css" lang="scss">
#controlDemo{
	.bigSlider{
		border-radius:8px 8px 0 0 ;
		overflow: hidden;
		.swiper-slide{

		}
	}
	.smallSlider{
		background-color: #484848;
		border-radius:0 0 8px 8px;
		overflow: hidden;
		.swiper-slide{
			opacity: .5;
			width:25%;
			transition: opacity .5s;
			&.swiper-slide-active{
				opacity: 1;
			}
		}
	}
}
</style>
<script type="text/javascript">
	export default{
		data:function(){
			let pageValue=true;
			let pageData=[
				{text:'分页',value:true},
				{text:'动态',value:2},
				{text:'数字型',value:'number'},
				{text:'分页',value:true},
				{text:'分页',value:true},
			]
			let imageList=_.times(6,i=>location.origin+'/image/white'+i+'.jpg')
			return {
				pageData,
				pageValue,
				imageList
			}
		},
		methods:{
			getRandomWidth(){
				return {
					width:_.random(30,150)+'px',
					height:'100px'
				}
			}
		}
	}
</script>