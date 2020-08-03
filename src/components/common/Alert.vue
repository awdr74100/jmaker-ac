<template>
  <div class="alert">
    <ul class="list">
      <li
        class="list__item mt-2"
        :class="`list__item--${item.status}`"
        v-for="(item, index) in messages"
        :key="index"
      >
        <div class="icon text-white">
          <span>
            <font-awesome-icon :icon="['fas', 'check']" v-if="item.status === 'success'" />
          </span>
          <span>
            <font-awesome-icon :icon="['fas', 'times']" v-if="item.status === 'danger'" />
          </span>
          <span>
            <font-awesome-icon :icon="['fas', 'exclamation']" v-if="item.status === 'warning'" />
          </span>
        </div>
        <p class="mx-3">{{ item.message }}</p>
        <button class="close mr-3" @click.prevent="removeMessage(index)">
          <font-awesome-icon :icon="['fas', 'times']" />
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
