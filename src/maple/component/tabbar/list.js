let tabbarList=[];
export default class List{
	constructor(){
		let lenght=0;
		_.forEach(tabbarList,item=>{
			this[lenght++]=item
		})
		Object.defineProperty(this, "length", {
		    value: lenght,
		    writable: true,
		    enumerable: false
		})
	}
	add(vm){
		tabbarList.push(vm)
	}
	remove(){
		_.forEach(this,item=>{
			item.$destroy();
			_.remove(tabbarList,o=>o===item)
		})
	}
}
