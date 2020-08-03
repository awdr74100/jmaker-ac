<template>
  <div class="panelGroup">
    <ul class="row">
      <li class="col-lg-3 col-6 mt-3">
        <div class="panelGroup__item p-3">
          <span><font-awesome-icon :icon="['fas', 'users']" size="2x"/></span>
          <div class="panelGroup__info">
            <p class="mb-2">註冊人數</p>
            <span>{{ allUsers }}</span>
          </div>
        </div>
      </li>
      <li class="col-lg-3 col-6 mt-3">
        <div class="panelGroup__item p-3">
          <span><font-awesome-icon :icon="['fas', 'user-check']" size="2x"/></span>
          <div class="panelGroup__info">
            <p class="mb-2">實體用戶</p>
            <span>{{ physicalUser }}</span>
          </div>
        </div>
      </li>
      <li class="col-lg-3 col-6 mt-3">
        <div class="panelGroup__item p-3">
          <span><font-awesome-icon :icon="['fas', 'user-minus']" size="2x"/></span>
          <div class="panelGroup__info">
            <p class="mb-2">匿名用戶</p>
            <span>{{ anonymousUser }}</span>
          </div>
        </div>
      </li>
      <li class="col-lg-3 col-6 mt-3">
        <div class="panelGroup__item p-3">
          <span><font-awesome-icon :icon="['fas', 'user-alt-slash']" size="2x"/></span>
          <div class="panelGroup__info">
            <p class="mb-2">移除權限</p>
            <span>{{ removeUser }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
  },
  computed: {
    allUsers() {
      const vm = this;
      return vm.users.length;
    },
    physicalUser() {
      const vm = this;
      return vm.users.filter((item) => item.register_at !== null).length;
    },
    anonymousUser() {
      const vm = this;
      return vm.users.filter((item) => item.register_at === null).length;
    },
    removeUser() {
      const vm = this;
      return vm.users.filter((item) => !item.auth).length;
    },
  },
};
</script>
