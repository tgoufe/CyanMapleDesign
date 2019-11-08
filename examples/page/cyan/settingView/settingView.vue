<template>

    <div class="padding20" id="">
        <h2>定制主题可视化</h2>
        <hr class="margin20">

        <div class="example tag-container form" v-for="option in settingList">
            <template v-if="option.type === 'color'">
                <cmui-checkbox
                        v-model="option.data"
                        :label="option.text"
                        path="value"
                        target-class="square reverse"
                ></cmui-checkbox>
                <br>
                <cmui-checkbox
                        :ref="option.key"
                        v-for="item in option.data"
                        :data-color="item.color"
                        v-model="item.value"
                        :label="item.label"
                        target-class="small square reverse custom"
                ></cmui-checkbox>

                <a href="javascript:void(0)" class="btn blue radius block" @click="alert(option)">
                    +
                </a>
            </template>

            <template v-else-if="option.type === 'number'">
                <cmui-input :append="option.append" :value="option.value">
                    <span class="marginr20">
                        {{option.text}}
                    </span>
                </cmui-input>

            </template>


            <hr class="marginb20 margint20">
        </div>

        <div class="example tag-container">
            <!--<cmui-input v-bind="options" :target-class="targetClass">
             <span :class="options.align==='left'?'marginr20':'marginl20'">
                 slot
             </span>
            </cmui-input>-->
            <!--<cmui-input  class="marginb20"-->
            <!--v-for="item in settingList"-->
            <!--:type="item.type"-->
            <!--:value="item.style"-->
            <!--&gt;-->
            <!--<span class="marginr20">-->
            <!--{{item.text}}-->
            <!--</span>-->
            <!--</cmui-input>-->

            <!--<cmui-checkbox
                    v-model="demoList"
                    label="全选"
                    path="value"
                    target-class="square reverse"
            ></cmui-checkbox>
            <br>
            <cmui-checkbox
                    v-for="item in demoList"
                    v-model="item.value"
                    :label="item.label"
                    target-class="small square reverse"
            ></cmui-checkbox>-->
        </div>
        <!--<div class="form tag-container config">
            <cmui-list :space="10">
                <cmui-list-item>
                    <cmui-checkbox v-model="options.reset" target-class="switch" :flex="true">
                        是否显示重置按钮
                    </cmui-checkbox>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.prependDisabled" target-class="switch" :flex="true">
                        禁用前置文本
                    </cmui-checkbox>
                    <cmui-input v-model="options.prepend" target-class="radius">
                        <span class="marginr20">文本内容</span>
                    </cmui-input>
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-checkbox v-model="options.appendDisabled" target-class="switch" :flex="true">
                        禁用后置文本
                    </cmui-checkbox>
                    <cmui-input v-model="options.append" target-class="radius">
                        <span class="marginr20">文本内容</span>
                    </cmui-input>
                </cmui-list-item>
                <cmui-list-item>
                    <div class="flex-container">
                        <label>文本显示位置</label>
                        <div class="">
                            <cmui-radio name="align" v-model="options.align" label="left">
                                左侧
                            </cmui-radio>
                            <cmui-radio name="align" v-model="options.align" label="right">
                                右侧
                            </cmui-radio>
                        </div>
                    </div>
                </cmui-list-item>
                <cmui-list-item>
                    <p>target-class</p>
                    &lt;!&ndash;<div class="flex-container">&ndash;&gt;
                        &lt;!&ndash;<cmui-checkbox v-for="(item,key) in targetClassList" :key="key" v-model="item.value">&ndash;&gt;
                            &lt;!&ndash;{{item.text}}&ndash;&gt;
                        &lt;!&ndash;</cmui-checkbox>&ndash;&gt;
                    &lt;!&ndash;</div>&ndash;&gt;
                </cmui-list-item>
                <cmui-list-item>
                    <cmui-select target-class="radius" :data="data" v-model="options.type">
                        <span class="marginr20">type</span>
                    </cmui-select>
                </cmui-list-item>
            </cmui-list>
        </div>
        <div class="tag-container otherExp margint20">
            <cmui-input target-class="" placeholder="www.bingshangroup.com">
                <cmui-select
                        slot="prepend"
                        :data="demo1.list"
                        v-model="demo1.value"
                        :picker="true"
                        target-class=""
                >
                </cmui-select>
                <select name="" id="" slot="append" style="width:70px">
                    <option :value="item" v-for="(item,key) in demo1.list2" :key="key" v-text="item"></option>
                </select>
            </cmui-input>
        </div>-->

        <button class="form btn blue" @click="sumbit">submit</button>
    </div>
</template>

<script>
	export default {
		name: 'settingView',
		data() {
			return {
				settingList: [
					{
						text: '可选颜色列表',
						key: '$colorList',
						data: [
							{color: '#ff0ebc', className: 'red'},
							{color: '#ff9800', className: 'orange'},
							{color: '#ff6705', className: 'yellow'},
							{color: '#2eb252', className: 'green'},
							{color: '#853f3a', className: 'coffee'},
							{color: '#25aaff', className: 'blue'},
							{color: '#7000C8', className: 'purple'},
							{color: '#aa429d', className: 'pink'}].map(item => ({
                                label: item.className,
                                value: true,
                                color: item.color
                            })),
						type: 'color'
					},
					{
						text: '背景色',
						key: '$bg_colorList',
						data: [
							{color: '#ff0ebc', className: 'red'},
							{color: '#ff9800', className: 'orange'},
							{color: '#ff6705', className: 'yellow'},
							{color: '#2eb252', className: 'green'},
							{color: '#853f3a', className: 'coffee'},
							{color: '#25aaff', className: 'blue'},
							{color: '#7000C8', className: 'purple'},
							{color: '#aa429d', className: 'pink'},
							{color: '#000000', className: 'black'},
							{color: '#f5f5f5', className: 'whiteee'}].map(item => ({
							label: item.className,
							value: false,
							color: item.color
						})),
						type: 'color'
					},
					{
						text: '灰度',
						key: '$grayList',
						data: [
							{color: '#000', className: 'black'},
							{color: '#222', className: 'darker'},
							{color: '#666', className: 'dark'},
							{color: '#8a8a8a', className: 'gray'},
							{color: '#999', className: 'light'},
							{color: '#ccc', className: 'lighter'},
							{color: '#fff', className: 'white'}].map(item => ({
							label: item.className,
							value: false,
							color: item.color
						})),
						type: 'color'
					},
					{
						text: '容器padding',
						key: '$container_padding',
						value: 4,
						append: 'px',
						type: 'number'
					},
                    {
						text: '容器width',
						key: '$container_width',
	                    value: 4,
						append: 'px',
						type: 'number'
					},
                    {
						text: '比例',
						key: '$layoutNumber',
	                    value: 4,
						append: '个',
						type: 'number'
					},
                    {
						text: '$padding-base-vertical',
						key: '$padding-base-vertical',
						value: 4,
						append: 'px',
						type: 'number'
					},
                    {
						text: '$padding-base-horizontal',
						key: '$padding-base-horizontal',
						value: 4,
						append: 'px',
						type: 'number'
					},
                    {
						text: '字体',
						key: '$font-family-base',
						value: 4,
						append: '',
						type: 'number'
					},
                    {
						text: '字号',
						key: '$font-size-base',
						value: 4,
						append: 'px',
						type: 'number'
					},
                    {
						text: '行高',
						key: '$line-height-base',
						value: 4,
						append: 'px',
						type: 'number'
					},
                    {
						text: '边框圆角',
						key: '$border-radius-base',
						value: 4,
						append: 'px',
						type: 'number'
					},
                    {
						text: '边框颜色默认',
						key: '$border-color-default',
						data: [
							{color: '#ff0ebc', className: 'red'},
							{color: '#ff9800', className: 'orange'},
							{color: '#ff6705', className: 'yellow'},
							{color: '#2eb252', className: 'green'},
							{color: '#853f3a', className: 'coffee'},
							{color: '#25aaff', className: 'blue'},
							{color: '#7000C8', className: 'purple'},
							{color: '#aa429d', className: 'pink'}].map(item => ({
							label: item.className,
							value: false,
							color: item.color
						})),
						type: 'color'
					},
                    {
						text: 'btn大小',
						key: '$btn-size-list',
						value: 4,
						append: 'px',
						type: 'number'
					},
                    {
						text: '大小模式设定',
						key: '$badge-size-list',
						value: 4,
						append: 'px',
						type: 'number'
					},
                    {
						text: '表单默认颜色',
						key: '$form-color-base',
						data: [
							{color: '#ff0ebc', className: 'red'},
							{color: '#ff9800', className: 'orange'},
							{color: '#ff6705', className: 'yellow'},
							{color: '#2eb252', className: 'green'},
							{color: '#853f3a', className: 'coffee'},
							{color: '#25aaff', className: 'blue'},
							{color: '#7000C8', className: 'purple'},
							{color: '#aa429d', className: 'pink'}].map(item => ({
							label: item.className,
							value: false,
							color: item.color
						})),
						type: 'color'
					}
				],
				options: {
					type: "text",
					value: "input输入框",
					reset: true,
					prepend: "前置",
					append: "后置",
					prependDisabled: false,
					appendDisabled: false,
					placeholder: "请输入内容",
					label: "",
					align: "left",
				},
//				targetClassList: ['small', 'big', 'radius', 'reverse'].map(item => ({text: item, value: false})),
				data: ['color', 'date', 'datetime-local', 'datetime', 'email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'],
				demo1: {
					list: ['http://', 'https://'],
					value: 'http://',
					list2: ['.cn', '.com', '.net', '.org']
				}
			}
		},
		created: function () {

		},
		mounted() {
			this.settingList.map(item => {
				if (item.type === 'color') this.checkView(item)
            })
//			this.checkView(this.settingList);
        },
		methods: {
			alert(option) {
				const random = (Math.random() * 10000).toFixed(0);
				const vm = this;
				maple.confirm({
					content: `
                        <input class="${random}" type="color" value="#fff" />
                        <input class="${random}" type="text" value="">
                    `,
					okFn() {
                        const color = document.getElementsByClassName(random)[0].value;
                        const className = document.getElementsByClassName(random)[1].value;

						option.data.push({
							label: className,
							value: true,
							color: color
                        })
						console.log(option.data)

						vm.$nextTick(() => {
							vm.checkView(option);
                        })
					},
					callback() {
						console.log('callback')
					}
				})
			},

			sumbit() {
				console.log(this.settingList)
                let submitData = [];
				const itemMaps = {
					color: setColor,
					number: setType,
				};
                this.settingList.map(item => {
	                const data = item.type && itemMaps[item.type](item);
	                submitData.push(data);
                });

				function setColor(data) {
					let obj = {
						data: {},
                        key: ''
                    };
					obj['key'] = data.key;
					data.data.map(d => {
						if (d.value) obj['data'][d.label] = d.color;
					});
					return obj
				}

                function setType(data) {
	                let obj = {};
	                obj['key'] = data.key;
	                obj['value'] = data.value;
	                return obj
                }
                console.log(submitData)
            },

			checkView: function(option) {
				console.log(option)
                const refKey = option['key'];

				this.$refs[refKey].slice(0).map((item) => {
					let color = item.$attrs['data-color'];
					Array.prototype.slice.call(item.$el.children).map(node => {
						node.style = `color: ${color}`;
                    })
                });
			}
        }

	}
</script>

<style scoped>

</style>
