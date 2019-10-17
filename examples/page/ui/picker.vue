<template>
    <div>
        <cmui-list :space="20" class="margin20">
            <cmui-list-item v-for="(item,key) in buttonList" :key="key">
                <a href="javascript:void(0)"
                   class="btn block radius reverse"
                   @click="showPicker(`${item}Data`)"
>{{ item }} picker</a>
            </cmui-list-item>
        </cmui-list>
        <cmui-picker :visible.sync="visible" :data="pickerData" @select="select"></cmui-picker>
    </div>
</template>
<script>
import cityData from './city.json'
function fromatCity(data) {
  return _.map(data, (value, key) => {
    if (_.isPlainObject(value)) {
      return {
        text: value.name,
        value: key,
        children: value.child ? fromatCity(value.child) : undefined
      }
    }
    if (_.isString(value)) {
      return {
        text: value,
        value: key
      }
    }
  })
}
let timeData = _.times(10, i => {
  return {
    text: 2010 + i,
    value: 2010 + i,
    children: []
  }
}).map(item => {
  item.children = _.times(12, i => {
    let days
    if (i === 1) {
      days = item.value % 4 ? 28 : 29
    } else {
      days = _.includes([0, 2, 4, 6, 7, 9, 11], i) ? 31 : 30
    }
    return {
      text: i + 1,
      value: i + 1,
      children: _.times(days, i => i + 1)
    }
  })
  return item
})
let fullTimeData = [timeData, [], [], _.times(24), _.times(60)]
let dataList = {
  baseData: _.times(10),
  aloneData: [['上午', '下午'], _.times(12, index => `${index}点`)],
  childrenData: [fromatCity(cityData)],
  timeData,
  fullTimeData
}
export default {
  data: function() {
    let buttonList = ['base', 'alone', 'children', 'time', 'fullTime']
    let visible = false
    return { pickerData: [], visible, buttonList }
  },
  methods: {
    showPicker(name) {
      this.visible = true
      this.pickerData = dataList[name]
    },
    select(data) {
      maple.alert(JSON.stringify(data))
    }
  }
}
</script>
