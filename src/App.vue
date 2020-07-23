<template>
  <div id="app">
    <Alert />
    <router-view></router-view>
  </div>
</template>

<script>
import Alert from '@/components/common/Alert.vue';

export default {
  components: {
    Alert,
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/all.scss';
</style>
