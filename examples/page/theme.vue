<template>
    <div>
        <div class="list">
            <div v-for="(item, index) in themeList" :key="index" class="list-item">
                <div class="btn block blue radius" @click="changeTheme(item)">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import page from './index'
export default {
  name: 'theme',
  data() {
    return {
      themeList: page.themeList
    }
  },
  methods: {
    changeTheme(theme) {
      console.log(theme)
    }
  }
}
</script>

<style scoped>

</style>
