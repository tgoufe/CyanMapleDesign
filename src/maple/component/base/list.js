let ListObject={};
export default class List{
	constructor(name,vm){
		let lenght=0;
		ListObject[name]=ListObject[name]||[]
		if(vm&&vm._isVue){
			_.forEach(ListObject[name],item=>{
				if(item.$el===vm.$el){
					this[lenght++]=item
				}
			})
		}else{
			_.forEach(ListObject[name],item=>{
				this[lenght++]=item
			})
		}
		Object.defineProperty(this, "length", {
		    value: lenght,
		    writable: true,
		    enumerable: false
		})
		Object.defineProperty(this, "name", {
		    value: name,
		    enumerable: false
		})
	}
	add(vm){
		ListObject[this.name]=ListObject[this.name]||[];
		ListObject[this.name].push(vm)
		return this;
	}
	remove(){
		_.forEach(this,item=>{
			item.$destroy();
			_.remove(ListObject[this.name],o=>o.$el===item.$el)
		})
		return this;
	}
}