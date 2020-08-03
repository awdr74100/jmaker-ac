<template>
  <div class="pagination">
    <button
      class="pagination__arrow left"
      :disabled="nowPage === 1"
      @click.prevent="togglePage(nowPage - 1)"
    >
      <i></i><i></i>
    </button>
    <div class="pagination__page">
      {{ pages === 0 ? 0 : nowPage }}
      <span class="mx-1">/</span>
      {{ pages }}
    </div>
    <button
      class="pagination__arrow right"
      :disabled="nowPage === pages || pages === 0"
      @click.prevent="togglePage(nowPage + 1)"
    >
      <i></i><i></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    count: Number,
  },
  data() {
    return {
      nowPage: 1,
    };
  },
  methods: {
    togglePage(index) {
      this.nowPage = index;
      this.$emit('callTogglePage', index);
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.count / 8);
    },
  },
};
</script>
