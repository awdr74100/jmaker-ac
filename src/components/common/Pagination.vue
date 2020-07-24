<template>
  <div class="pagination">
    <ul class="list">
      <li class="list__item">
        <a
          href="#"
          class="prev"
          :class="{ 'prev--disabled': nowPage === 1 }"
          @click.prevent="togglePage(nowPage - 1)"
          ><i class="fas fa-chevron-left"></i
        ></a>
      </li>
      <li class="list__item" v-for="index in pages" :key="index">
        <a
          href="#"
          class="page"
          :class="{ 'page--active': index === nowPage }"
          @click.prevent="togglePage(index)"
          >{{ index }}</a
        >
      </li>
      <li class="list__item">
        <a
          href="#"
          class="next"
          :class="{ 'next--disabled': nowPage === pages }"
          @click.prevent="togglePage(nowPage + 1)"
          ><i class="fas fa-chevron-right"></i
        ></a>
      </li>
    </ul>
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
