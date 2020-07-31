<template>
  <loading :active.sync="isLoading" :opacity="opacity" :is-full-page="fullPage">
    <div class="loading">
      <div class="loading__square"></div>
      <div class="loading__square"></div>
      <div class="loading__square"></div>
      <div class="loading__square"></div>
      <div class="loading__square"></div>
    </div>
  </loading>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      fullPage: true,
      opacity: 0.7,
    };
  },
  computed: mapState(['isLoading']),
};
</script>
