<template>
  <div id="app">
    <Loading />
    <Alert />
    <Progress />
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading.vue';
import Alert from '@/components/common/Alert.vue';
import Progress from '@/components/common/Progress.vue';

export default {
  components: {
    Loading,
    Alert,
    Progress,
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/all.scss';
</style>
