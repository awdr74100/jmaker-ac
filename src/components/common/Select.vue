<template>
  <div class="select">
    <label for="select" class="text text-primary">每頁列數:</label>
    <select id="select" class="text-primary ml-2" @change="toggleColumn" v-model.number="column">
      <option value="8">8</option>
      <option value="16">16</option>
      <option value="32">32</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      column: 8,
    };
  },
  methods: {
    toggleColumn() {
      this.$emit('callToggleColumn', this.column);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss-scoped/components/common/select.scss';
</style>
