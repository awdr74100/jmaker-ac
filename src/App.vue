<template>
  <div id="app">
    <Loading />
    <Alert />
    <ProgressBar />
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue';
import Alert from '@/components/common/Alert.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';

export default {
  components: {
    Loading,
    Alert,
    ProgressBar,
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/all.scss';
</style>
