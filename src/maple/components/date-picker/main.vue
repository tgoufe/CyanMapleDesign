<template>
<cmui-popup position="bottom" :visible.sync="selfVisible" class="cmui-datePicker" target-class="cmui-datePicker__container">
  <div class="pos-r">
    <div class="flex-container">
      <div class="flex1 flex-container yearNow">
        <i class="baseIcon baseIcon-back " @click="subYear" />
        <span class="flex1 text-center" @click="showYearList = true">{{ year }}年</span>
        <i class="baseIcon baseIcon-right " @click="addYear" />
      </div>
      <div class="flex1 flex-container monthNow">
        <i class="baseIcon baseIcon-back " @click="subMonth" />
        <span class="flex1 text-center" @click="showMonthList = true">{{ month + 1 }}月</span>
        <i class="baseIcon baseIcon-right " @click="addMonth" />
      </div>
    </div>
    <div class="flex-container cmui-datePicker__weekList">
      <div
        v-for="(item, key) in ['日', '一', '二', '三', '四', '五', '六']"
        :key="key"
        class="text-center flex1 weekItem"
      >
        <span v-text="item" />
      </div>
    </div>
    <cmui-list :col="7" :border="border" class="cmui-datePicker__dayList">
      <cmui-list-item v-for="(item, key) in dayList" :key="key">
        <div class="dayItem" :class="item.className">
          <span
            class="flex-container center"
            @click="select(item)"
            v-text="item.string"
          ></span>
        </div>
      </cmui-list-item>
    </cmui-list>
    <transition name="fade">
      <div v-show="showYearList" class="abs-full  scroll-container-y yearList">
        <div
          v-for="(yearValue, key) in yearList"
          :key="key"
          class="yearItem"
          :class="{active:yearValue===year}"
          @click="setYear(yearValue)"
        >
          <span>{{ yearValue }}</span>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-show="showMonthList"
        class="abs-full  scroll-container-y monthList"
      >
        <div v-for="i in 12" :key="i" class="monthItem" :class="{active:i===month + 1}">
          <span @click="setMonth(i - 1)">{{ i }}月</span>
        </div>
      </div>
    </transition>
  </div>
</cmui-popup>
</template>

<script>
import cmuiPopup from '../popup/main.vue'
import cmuiList from '../list/main.vue'
import cmuiListItem from '../list-item/main.vue'
import _ from 'lodash'
import day from 'dayjs'
// ['甲乙丙丁戊己庚辛壬癸','子丑寅卯辰巳午未申酉戌亥','鼠牛虎兔龙蛇马羊猴鸡狗猪']

export default {
  name: 'cmui-date-picker',
  components: { cmuiList, cmuiListItem, cmuiPopup },
  props: {
    from: { type: Number, default: 1970 },
    to: { type: Number, default: new Date().getFullYear() },
    now: { type: Number, default: () => +new Date() },
    border: { type: [String, Boolean], default: true },
    visible: { type: Boolean, default: false }
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
      return new Date(this.selfDate).getFullYear()
    },
    month() {
      return new Date(this.selfDate).getMonth()
    },
    dayList() {
      const NOW = day(this.selfDate)
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
    },
    selfVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    }
  },
  methods: {
    setYear(year) {
      console.log(this.year, year)
      this.selfDate = new Date(this.selfDate).setFullYear(year)
      this.showYearList = false
    },
    setMonth(month) {
      this.selfDate = new Date(this.selfDate).setMonth(month)
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
