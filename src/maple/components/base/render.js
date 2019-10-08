export default {
    name: 'cmui-render',
    functional: true,
    props:{
    	data:{type:Object,default:{}}
    },
    render(h,ctx){
    	var {
    		tag,
    		data,
    		children
    	}=_.get(ctx,'props.data');
    	return h(tag,data,children)
    }
};