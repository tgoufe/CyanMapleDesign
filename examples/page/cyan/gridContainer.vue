<template>
<div>
    <p>layout</p>
    <p>grid container</p>
    <div class="container">
        <div class="row">
            <div class="span4" v-for="item in 3">
                <div class="gridDemo">span4</div>
            </div>
        </div>
        <div class="row margint20">
            <div class="span3" v-for="item in 4">
                <div class="gridDemo">span3</div>
            </div>
        </div>
        <div class="row margint20">
            <div class="col3" v-for="item in 5">
                <div class="gridDemo">col3</div>
            </div>
        </div>
    </div>
    <p>box container</p>
    <div class="box-container">
        <div class="box-row">
            <div class="box-span4" v-for="item in 3">
                <div class="gridDemo">span4</div>
            </div>
        </div>
        <div class="box-row margint20">
            <div class="box-span3" v-for="item in 4">
                <div class="gridDemo">span3</div>
            </div>
        </div>
        <div class="box-row margint20">
            <div class="box-col3" v-for="item in 5">
                <div class="gridDemo">col3</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'gridContainer'
}
</script>

<style scoped>
    .gridDemo{
        background-color: #eeeeee;
        line-height:30px;
        text-align:center;
        box-shadow: 0 0 2px 0 #000000;
    }
</style>
