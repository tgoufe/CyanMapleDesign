<template>
  <div class="cmui-collapse">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'CMUICollapse',
    componentName: 'CMUICollapse',
    props: {
      onlyone: Boolean,
      activeIndex: {
        type: [Array, Number],
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        activeNames: [].concat(this.activeIndex)
      };
    },
    watch: {
      activeIndex(value) {
        this.activeNames = [].concat(value);
      }
    },
    methods: {
      setActiveNames(activeNames) {
        activeNames = [].concat(activeNames);
        let value = this.onlyone ? activeNames[0] : activeNames;
        this.activeNames = activeNames;
      },
      itemClick(item) {
        if (this.onlyone) {
          this.setActiveNames(
            (this.activeNames[0] || this.activeNames[0] === 0) &&
            this.activeNames[0] === item.name
            ? '' : item.name
          );
        } else {
          let activeNames = this.activeNames.slice(0);
          let index = activeNames.indexOf(item.name);
          if (index > -1) {
            activeNames.splice(index, 1);
          } else {
            activeNames.push(item.name);
          }
          this.setActiveNames(activeNames);
        }
      }
    },
    created() {
      this.$on('item-click', this.itemClick);
    }
  };
</script>