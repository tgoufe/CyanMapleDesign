export default{
	methods:{
		handleFocus(){
			const target=event.target;
	    	const value = target.value;
			this.$emit('focus',value,target,this)
		},
	    handleInput(){
	    	const target=event.target;
	    	const value = target.value;
	        this.$emit('input', value,target,this);
	        this.$nextTick(this.rendered)
	    },
		handleChange(){
			const target=event.target;
	    	const value = target.value;
			this.$emit('change',value,target,this)
		},
		handleBlur(){
			const target=event.target;
	    	const value = target.value;
			this.$emit('blur',value,target,this)
		},
		rendered(){
			const target=event.target;
	    	const value = target.value;
			this.$emit('rendered',value,target,this)
		}
	},
	props:{
		disabled:{type:Boolean,default:false},
		radius:{type:Boolean,default:true},
		placeholder:String,
		value:String,
		name:String,
		target:Object,
		calssName:String,
	}
}