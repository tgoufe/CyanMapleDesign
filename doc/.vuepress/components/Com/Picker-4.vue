<template>
    <div>
        <div class="btn red" @click="showPicker"> Click show picker</div>
        <cmui-picker title="时间选择器" :data="baseData" :visible.sync="visible" @select="select"></cmui-picker>
    </div>
</template>

<script>
  function timeData() {
    return _.times(10, i => {
      return {
        text: 2010 + i,
        value: 2010 + i,
        children: []
      };
    }).map(item => {
      item.children = _.times(12, i => {
        let days;
        if (i === 1) {
          days = item.value % 4 ? 28 : 29;
        } else {
          days = _.includes([0, 2, 4, 6, 7, 9, 11], i) ? 31 : 30;
        }
        return {
          text: i + 1,
          value: i + 1,
          children: _.times(days, i => i + 1)
        };
      });
      return item;
    });
  }

  export default {
    name: "Picker-2",
    data() {
      return {
        baseData: timeData(),
        visible: false
      };
    },
    created() {
    },
    methods: {
      showPicker() {
        this.visible = true;
      },
      select(data) {
        alert(`You have been selected '${data[0].value} ${data[1].value} ${data[2].value}'`);
      }
    }
  };
</script>
