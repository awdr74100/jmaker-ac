<template>
  <div id="app">
    <Loading />
    <Alert />
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue';
import Alert from '@/components/common/Alert.vue';

export default {
  components: {
    Loading,
    Alert,
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/all.scss';
</style>
