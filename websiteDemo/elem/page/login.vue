<template>
  <div class="flex-container-col paddingt180">
    <div class="img-container"
         style="height:56px"
>
      <img src="https://shadow.elemecdn.com/faas/h5/static/logo.ba876fd.png"
           alt
/>
    </div>
    <div class="form margint120">
      <input type="tel"
             class="radius big"
             placeholder="手机号"
             style="width:220px;"
/>
      <button class="btn blue big radius marginl10 margint-n10"
              disabled
>
获取验证码
</button>
    </div>
    <div class="form margint80 marginl20">
      <input type="tel"
             class="radius big margint20 marginl-n550"
             placeholder="验证码"
             style="width:220px;"
/>
    </div>
    <p class="marginh100 margint80 text-light fs-14 lh-20">
      新用户登录即自动注册，并表示已同意
      <a href="###"
         class="text-litblue fs-14"
>《用户服务协议》</a> 和
      <a href="###"
         class="text-litblue fs-14"
>《隐私政策》</a>
    </p>
    <div class="margint60">
      <a href
         class="btn litgreen"
         style="width:280px"
>登录</a>
    </div>
    <p class="text-light fs-11 margint30">
关于我们
</p>
  </div>
</template>
<script>
export default {
  name: 'inner'
}
</script>
<style>
input[type="text"]::-webkit-input-placeholder {
  color: rgb(211, 45, 45);
}
</style>
