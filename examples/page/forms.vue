<template>
    <div class="list">
        <div v-for="item in list" :key="item.name" class="list-item">
            <router-link :to="item.path" class="padding30 flex-container text-dark">
                <span>{{ item.name }}</span>
                <i class="baseIcon baseIcon-right" />
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Form',
  data() {
    return {
      list: [
        'checkbox',
        'input',
        'number',
        'radio',
        'select',
        'textarea'
      ].map(item => ({ name: item, path: `form/${item}` }))

    }
  }
}
</script>

<style scoped>

</style>
