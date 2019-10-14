<template>
    <div>
        <div class="list">
            <div v-for="item in list" :key="item.name" class="list-item">
                <router-link :to="item.path" class="padding30 flex-container text-dark">
                    <span>{{ item.name }}</span>
                    <i class="baseIcon baseIcon-right" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import page from './index'
export default {
  name: 'ui',
  data() {
    return {
      list: page.folder.ui
    }
  }
}
</script>

<style scoped>

</style>
