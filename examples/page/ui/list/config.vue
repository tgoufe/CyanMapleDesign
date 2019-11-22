<template>
    <div>
        <div class="example tag-container">
            <cmui-list v-bind="options">
                <cmui-list-item v-for="(item,key) in blackList" :key="key" class="bg-white">
                    <div class="ratio-container">
                        <div class="img-container flex-x">
                            <img :src="item">
                        </div>
                    </div>
                </cmui-list-item>
            </cmui-list>
        </div>

        <div class="fixed-bottom bg-black paddingv25 paddingh50 fs-16 text-white" style="z-index:1">
            <div class="form NewStyle">
                <div class="flex-container">
                    <div class="flex1">
                        <cmui-checkbox
                        v-model="options.border"
                        target-class="switch"
                        :flex="true"
                        >显示边框</cmui-checkbox>
                    </div>
                </div>
            </div>
            <div class="flex-container paddingv10 form NewStyle">
                <div class="flex1">列数</div>
                <div class="flex1 paddingl50 paddingt10 themeSlidebar">
                    <cmui-number v-model="options.col" />
                </div>
            </div>
            <div class="flex-container paddingv10">
                <div class="flex1">间距</div>
                <div class="flex1 paddingl50 paddingt10 themeSlidebar">
                    <cmui-slidebar v-model="options.space" :step="1" class="marginb20" :range="50"></cmui-slidebar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import img from '@assets/img.js'
export default {
  data: function() {
    return {
      options: {
        border: true,
        col: 5,
        space: 10
      },
      blackList: img.cmList
    }
  }
}
</script>
<style lang="scss">
    .form.NewStyle{
        input[type="tel"]{
            background:rgba(102,102,102,.6);
            border:0;
            text-align:center;
            font-size:12px;
            padding:3px 12px;
        }
        .cmui-input__prepend,.cmui-input__append{
            background:rgba(102,102,102,.6);
            border:0;
            padding:4px;
            span{
                width:24px;
                height:24px;
                background: #02baba;
                border: 2px solid white;
                border-radius:50%;
                padding:0;
                line-height:16px;
                font-size:22px;
                text-align:center;
            }
        }
        .cmui-input__prepend{
            margin-right:0;
            border-top-left-radius:50%;
            border-bottom-left-radius:50%;
        }
        .cmui-input__append{
            margin-left:0;
            border-top-right-radius:50%;
            border-bottom-right-radius:50%;
        }
    }
</style>
