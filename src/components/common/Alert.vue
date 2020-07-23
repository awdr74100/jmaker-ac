<template>
  <div class="alert">
    <ul class="list">
      <li
        class="list__item list__item--danger mt-2"
        :class="`list__item--${item.status}`"
        v-for="(item, index) in messages"
        :key="index"
      >
        <div class="icon">
          <i class="fas fa-times text-white"></i>
        </div>
        <p class="mx-3">{{ item.message }}</p>
        <button class="close mr-3" @click.prevent="removeMessage(index)">
          <i class="fas fa-times"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  methods: mapMutations('alert', {
    removeMessage: 'REMOVEMESSAGE',
  }),
  computed: mapState('alert', ['messages']),
};
</script>
