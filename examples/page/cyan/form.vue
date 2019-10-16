<template>
    <div class="form">
        <p>input</p>
        <input type="text">
        <p>input reverse</p>
        <input type="text" class="reverse">
        <p>checkbox</p>
        <input type="checkbox" checked>
        <p>checkbox reverse</p>
        <input type="checkbox" checked class="reverse">
        <p>checkbox square</p>
        <input type="checkbox" checked class="square">
        <p>checkbox square reverse</p>
        <input type="checkbox" checked class="square reverse">
        <p>checkbox switch</p>
        <input type="checkbox" class="switch" checked>
        <p>radio</p>
        <input type="radio" checked>
        <p>radio reverse</p>
        <input type="radio" checked class="reverse">
        <p>radio square</p>
        <input type="radio" checked class="square">
        <p>radio square reverse</p>
        <input type="radio" checked class="square reverse">
        <p>select</p>
        <select name="" id="">
            <option :value="i" v-for="i in 5">{{i}}</option>
        </select>
        <p>select reverse</p>
        <select name="" id="" class="reverse">
            <option :value="i" v-for="i in 5">{{i}}</option>
        </select>
        <p>textarea</p>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <p>textarea reverse</p>
        <textarea name="" id="" cols="30" rows="10" class="reverse"></textarea>
    </div>
</template>

<script>
export default {
  name: 'form'
}
</script>

<style scoped>

</style>
