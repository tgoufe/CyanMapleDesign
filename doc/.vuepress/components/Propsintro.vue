<template>
    <div>
        <table>
            <thead><tr><th>属性名</th> <th>类型</th> <th>默认值</th> <th>作用</th></tr></thead>
            <tbody>
                <tr v-for="(value,key) in props">
                    <td>{{key}}</td>
                    <td>{{value.type | getType}}</td>
                    <td>{{value.default | getDefault}}</td>
                    <td>{{value.intro}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
  name: "Propsintro",
  props: {
    path:{type:String,default:''}
  },
  data(){
    return {
      props:{}
    }
  },
  filters:{
    getType(item){
      if(Array.isArray(item)){
        return item.map(item=>item.name)
      }
      else
        return item.name
    },
    getDefault(item){
      if(typeof item ==='function')
        return item()
      else if (item === null)
        return 'null'
      else if (item === '')
        return '-'
      else if(typeof item === 'string' && /data:image/.test(item))
        return 'CyanMaple占位图'
      return item
    }
  },
  created(){
    import('../../../src/maple/components/'+this.path).then(data=>{
      let {props,mixins}=data.default
      this.props=props||{}
      if(Array.isArray(mixins)){
        Object.assign(this.props,...mixins.map(item=>item.props))
      }
    })
  }
};
</script>
