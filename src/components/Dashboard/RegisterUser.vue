<template>
  <main class="container-fluid">
    <div class="row">
      <h1 class="registerUser__title">實體用戶註冊</h1>
    </div>
    <div class="row no-gutters">
      <PanelGroup :users="users" />
    </div>
    <div class="row no-gutters mt-3 mb-5">
      <UserTable :users="users" view="register" />
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import PanelGroup from './PanelGroup.vue';
import UserTable from './UserTable.vue';

export default {
  components: {
    PanelGroup,
    UserTable,
  },
  methods: {
    ...mapActions('users', ['getUsers']),
  },
  computed: {
    ...mapState('users', ['users']),
  },
  created() {
    this.getUsers();
  },
};
</script>
