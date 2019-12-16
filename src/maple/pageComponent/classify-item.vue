<template>
    <div class="cmui-classify-item">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'cmui-classify-item',
  inject: ['cmuiClassify']
}
</script>
