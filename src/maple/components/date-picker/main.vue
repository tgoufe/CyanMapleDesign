<template>
  <div class="fixed-bottom  pos-r bordert cmui-datePicker">
    <div class="flex-container paddingv10">
      <div class="flex1 flex-container">
        <i class="baseIcon baseIcon-back paddingh20" @click="subYear" />
        <span class="flex1 text-center" @click="showYearList = true">{{ year }}年</span>
        <i class="baseIcon baseIcon-right paddingh20" @click="addYear" />
      </div>
      <div class="flex1 flex-container">
        <i class="baseIcon baseIcon-back paddingh20" @click="subMonth" />
        <span class="flex1 text-center" @click="showMonthList = true">{{ month + 1 }}月</span>
        <i class="baseIcon baseIcon-right paddingh20" @click="addMonth" />
      </div>
    </div>
    <div class="flex-container paddingv10">
      <div
        v-for="(item, key) in ['日', '一', '二', '三', '四', '五', '六']"
        :key="key"
        class="text-center flex1"
      >
        <span v-text="item" />
      </div>
    </div>
    <cmui-list :col="7" :border="border" class="dayList">
      <cmui-list-item v-for="(item, key) in dayList" :key="key">
        <div class="dayItem" :class="item.className">
          <span
            class="flex-container center"
            @click="select(item)"
            v-text="item.string"
          />
        </div>
      </cmui-list-item>
    </cmui-list>
    <transition name="fade">
      <div v-show="showYearList" class="abs-full  scroll-container-y yearList">
        <div
          v-for="(year, key) in yearList"
          :key="key"
          class="yearItem"
          @click="setYear(year)"
        >
          <span>{{ year }}</span>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-show="showMonthList"
        class="abs-full  scroll-container-y monthList"
      >
        <div v-for="i in 12" :key="i" class="monthItem">
          <span @click="setMonth(i - 1)">{{ i }}月</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import cmuiList from '../list/main.vue'
import cmuiListItem from '../list-item/main.vue'
import day from 'dayjs'
export default {
  name: 'cmui-data-picker',
  components: { cmuiList, cmuiListItem },
  props: {
    from: { type: Number, default: 1970 },
    to: { type: Number, default: new Date().getFullYear() },
    now: { type: [String, Number], default: new Date() },
    border: { type: [String, Boolean], default: true }
  },
  data: function() {
    return {
      showYearList: false,
      showMonthList: false,
      selfDate: new Date(this.now)
    }
  },
  computed: {
    yearList() {
      return _.times(this.to - this.from, index => {
        return this.from + index
      })
    },
    year() {
      return new Date(this.now).getFullYear()
    },
    month() {
      return new Date(this.now).getMonth()
    },
    dayList() {
      const NOW = day(this.now)
      const NOWMONTH = NOW.$M
      let preMonthDay = 8 + NOW.$W - (NOW.$D % 7)
      preMonthDay = preMonthDay > 7 ? preMonthDay % 7 : preMonthDay
      const STARTDAY = NOW.subtract(preMonthDay + NOW.$D - 1, 'days')
      return _.times(42, index => {
        const DATE = STARTDAY.add(index, 'day')
        let className = [`week${DATE.$W}`]
        if (index > preMonthDay - 1 && DATE.$M === NOWMONTH) {
          className.push('thisMonth')
        }
        return {
          string: DATE.$D,
          className,
          value: DATE
        }
      })
    }
  },
  methods: {
    setYear(year) {
      console.log(this.year, year)
      this.now = new Date(this.now).setFullYear(year)
      this.showYearList = false
    },
    setMonth(month) {
      this.now = new Date(this.now).setMonth(month)
      this.showMonthList = false
    },
    addYear() {
      this.setYear(this.year + 1)
    },
    subYear() {
      this.setYear(this.year - 1)
    },
    addMonth() {
      this.setMonth(this.month + 1)
    },
    subMonth() {
      this.setMonth(this.month - 1)
    },
    select(item) {
      this.$emit('select', item.value)
    }
  }
}
</script>
