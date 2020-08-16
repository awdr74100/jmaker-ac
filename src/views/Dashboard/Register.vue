<template>
  <main class="container-fluid">
    <div class="row">
      <h1 class="title">實體用戶註冊</h1>
    </div>
    <div class="row no-gutters">
      <PanelGroup :users="users" />
    </div>
    <div class="row no-gutters mt-3 mb-5">
      <DataTable :users="users" view="register" />
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import PanelGroup from '@/components/Dashboard/PanelGroup.vue';
import DataTable from '@/components/Dashboard/DataTable.vue';

export default {
  components: {
    PanelGroup,
    DataTable,
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

<style lang="scss" scoped>
.title {
  color: theme-color('secondary');
  padding: 20px 20px 20px 15px;
  display: block;
  width: 100%;
  font-size: 20px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}
</style>
