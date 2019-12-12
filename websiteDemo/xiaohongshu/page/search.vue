<template>
    <div class="fixed-full flex-container-col hfull">
        <header>top</header>
        <div class="flex1 pos-r">
            <div class="abs-full flex-container vfull">
                <aside class="scroll-container-y">left</aside>
                <main class="scroll-container-y flex1">center</main>
                <aside class="scroll-container-y">right</aside>
            </div>
        </div>
        <footer>bottom</footer>
    </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style scoped type="text/scss" lang="scss">
header{background-color: #fcff32;}
footer{background-color: #9aa5ff;}
aside{background-color: #9cfffa;}
main{background-color: #ff7f93;}
</style>
