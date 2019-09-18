<template>
    <div>
        <div style="overflow: hidden;padding:1px;margin-top:20px">
            <span class="word" v-for="item in data">{{item}}</span>
        </div>

    </div>
</template>

<script>
    let data=('red orange yellow green cyan blue purple coffee' +
        ' margin padding top left bottom center full' +
        ' border item radius round light shadow' +
        ' flex container list item ratio img box btn badge big small reverse block' +
        ' form disabled square switch' +
        ' float pos clearfix overflow delete bolder justify limit fixed').split(' ').sort((a,b)=>a.length-b.length);
    export default {
        name: "Word",
        data(){
            return {
                data,
                text:'在下方的表格中点击你认识或者可以理解其作用的单词'
            }
        }
    }
</script>

<style scoped>
    .word{padding:5px;float:left;border:1px solid #ff913e;margin-left:-1px;margin-top:-1px;width:80px;text-align: center;
        position: relative;user-select: none;line-height:30px;}
    .word.active::before{
        content:'ok️';
        position: absolute;
        color:white;
        line-height: 40px;
        top:0;
        right:0;
        bottom:0;
        left:0;
        background-color: rgba(0,0,0,.9);
    }
</style>