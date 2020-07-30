<template>
  <div class="alert">
    <ul class="list">
      <li
        class="list__item mt-2"
        :class="`list__item--${item.status}`"
        v-for="(item, index) in messages"
        :key="index"
      >
        <div class="icon">
          <i class="fas fa-check text-white" v-if="item.status === 'success'"></i>
          <i class="fas fa-times text-white" v-if="item.status === 'danger'"></i>
          <i class="fas fa-exclamation text-white" v-if="item.status === 'warning'"></i>
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
