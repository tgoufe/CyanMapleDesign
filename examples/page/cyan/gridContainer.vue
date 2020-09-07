<template>
<div>
    <p class="text-black fs-18 padding30">Layout</p>
    <p class="title paddingv20 paddingh30">Grid container</p>
    <div class="container fs-14 padding30" style="color: #00F8F8;">
        <div class="row">
            <div class="span4" v-for="item in 3">
                <div class="gridDemo" style="background: #00BABA;">Span4</div>
            </div>
        </div>
        <div class="row margint20">
            <div class="span3" v-for="item in 4">
                <div class="gridDemo" style="background: #007C7C;">Span3</div>
            </div>
        </div>
        <div class="row margint20">
            <div class="col3" v-for="item in 5">
                <div class="gridDemo" style="background: #003E3E;">Col3</div>
            </div>
        </div>
    </div>
    <p class="title paddingv20 paddingh30">Box container</p>
    <div class="container fs-14 padding30" style="color: #00F8F8;">
        <div class="box-row">
            <div class="box-span4" v-for="item in 3">
                <div class="gridDemo" style="background: #00BABA;">Span4</div>
            </div>
        </div>
        <div class="box-row margint20">
            <div class="box-span3" v-for="item in 4">
                <div class="gridDemo" style="background: #007C7C;">Span3</div>
            </div>
        </div>
        <div class="box-row margint20">
            <div class="box-col3" v-for="item in 5">
                <div class="gridDemo" style="background: #003E3E;">Col3</div>
            </div>
        </div>
    </div>
    <p class="title paddingv20 paddingh30">response container</p>
    <div class="response-container padding30" style="color: #00F8F8;">
      <div class="row">
        <div class="span4 gridDemo"><div class="gridDemo" style="background: #00baba;">Span4</div></div>
        <div class="span4 gridDemo"><div class="gridDemo" style="background: #00baba;">Span4</div></div>
        <div class="span4 gridDemo"><div class="gridDemo" style="background: #00baba;">Span4</div></div>
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
        line-height:32px;
        text-align:center;
    }
    .box-row>div[class|="box"]:not(:last-child){
        border-right:1px solid #00F8F8;
    }
</style>
