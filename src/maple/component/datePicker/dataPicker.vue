<template>
    <div class="fixed-bottom  pos-r bordert cmui-datePicker">
        <div class="flex-container paddingv10">
            <div class="flex1 flex-container">
                <i class="baseIcon baseIcon-back paddingh20" @click="subYear"></i>
                <span class="flex1 text-center" @click="showYearList=true">{{year}}年</span>
                <i class="baseIcon baseIcon-right paddingh20" @click="addYear"></i>
            </div>
            <div class="flex1 flex-container">
                <i class="baseIcon baseIcon-back paddingh20" @click="subMonth"></i>
                <span class="flex1 text-center" @click="showMonthList=true">{{month+1}}月</span>
                <i class="baseIcon baseIcon-right paddingh20" @click="addMonth"></i>
            </div>
        </div>
        <div class="flex-container paddingv10">
            <div :key="key" v-for="(item,key) in ['日','一','二','三','四','五','六']" class="text-center flex1">
                <span v-text="item"></span>
            </div>
        </div>
        <cmui-list :col="7" :border="border" class="dayList">
            <cmui-list-item :key="key" v-for="(item,key) in dayList">
                <div class="dayItem" :class="item.className">
                    <span v-text="item.string" class="flex-container center" @click="select(item)"></span>
                </div>
            </cmui-list-item>
        </cmui-list>
        <transition name="fade">
            <div class="abs-full  scroll-container-y yearList" v-show="showYearList">
                <div class="yearItem" @click="setYear(year)" :key="key" v-for="(year,key) in yearList">
                    <span>{{year}}</span>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="abs-full  scroll-container-y monthList" v-show="showMonthList">
                <div class="monthItem" v-for="i in 12" :key="i">
                    <span @click="setMonth(i-1)">{{i}}月</span>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import cmuiList from '../list/list.vue';
    import cmuiListItem from '../list/list-item.vue';
    import day from 'dayjs';
    export default {
        components:{cmuiList,cmuiListItem},
        name: "dataPicker",
        props:{
            from:{type:Number,default:1970},
            to:{type:Number,default:new Date().getFullYear()},
            now:{type:[String,Number],default:new Date},
            border:{type:[String,Boolean],default:true}
        },
        computed:{
            yearList(){
                return _.times(this.to-this.from,index=>{
                    return this.from+index;
                })
            },
            year(){
                return new Date(this.now).getFullYear();
            },
            month(){
                return new Date(this.now).getMonth()
            },
            dayList(){
                const NOW=day(this.now);
                const NOWMONTH=NOW.$M;
                let preMonthDay=8+NOW.$W-NOW.$D%7;
                preMonthDay=preMonthDay>7?preMonthDay%7:preMonthDay;
                const STARTDAY=NOW.subtract(preMonthDay+NOW.$D-1,'days');
                return _.times(42,index=>{
                    const DATE=STARTDAY.add(index,'day');
                    let className=[`week${DATE.$W}`];
                    if(index>preMonthDay-1&&DATE.$M===NOWMONTH){
                        className.push('thisMonth')
                    }
                    return{
                        string:DATE.$D,
                        className,
                        value:DATE
                    }
                })
            }
        },
        data:function(){
            return{
                showYearList:false,
                showMonthList:false,
                selfDate:new Date(this.now)
            }
        },
        methods:{
            setYear(year){
                this.now=new Date(this.now).setFullYear(year)
                this.showYearList=false;
            },
            setMonth(month){
                this.now=new Date(this.now).setMonth(month);
                this.showMonthList=false;
            },
            addYear(){
                this.setYear(this.year+1);
            },
            subYear(){
                this.setYear(this.year-1);
            },
            addMonth(){
                this.setMonth(this.month+1)
            },
            subMonth(){
                this.setMonth(this.month-1)
            },
            select(item){
                this.$emit('select',item.value);
            }

        }
    }
</script>

<style type="text/css" lang="scss">
.cmui-datePicker{
    .yearList{
        .yearItem{
        }
    }
    .monthList{
        .monthItem{

        }
    }
    .dayList{
        .dayItem{
            &.thisMonth{
                background-color: blue;
            }
        }
    }
}
</style>