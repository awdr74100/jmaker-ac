<template>
  <main class="container-fluid registerUser">
    <div class="row">
      <h1 class="registerUser__title">實體用戶註冊</h1>
    </div>
    <div class="row no-gutters">
      <PanelGroup :users="users" />
    </div>
    <div class="row no-gutters mt-3">
      <UserTable :users="sliceAndSortUsers" />
    </div>
    <div class="row no-gutters mt-3 mb-4">
      <Pagination :count="filterUsers.length" @callTogglePage="togglePage" />
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Pagination from '@/components/common/Pagination.vue';
import PanelGroup from './PanelGroup.vue';
import UserTable from './UserTable.vue';

export default {
  components: {
    PanelGroup,
    UserTable,
    Pagination,
  },
  data() {
    return {
      sort: 'toLow',
      page: 1,
    };
  },
  methods: {
    ...mapActions('users', ['getUsers']),
    togglePage(index) {
      this.page = index;
    },
  },
  computed: {
    ...mapState('users', ['users']),
    filterUsers() {
      const vm = this;
      return vm.users.filter((item) => item.register_at === null);
    },
    sliceAndSortUsers() {
      const vm = this;
      const users = JSON.parse(JSON.stringify(vm.users));
      const [sortA, sortB] = vm.sort === 'toLow' ? [1, -1] : [-1, 1];
      const [startIndex, endIndex] = [(vm.page - 1) * 8, vm.page * 8];
      return users
        .sort((a, b) => (a.register_at > b.register_at ? sortA : sortB))
        .filter((item) => item.register_at === null)
        .slice(startIndex, endIndex);
    },
  },
  created() {
    this.getUsers();
  },
};
</script>
