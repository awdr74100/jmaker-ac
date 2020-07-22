<template>
  <main class="container-fluid registerUser">
    <div class="row">
      <h1 class="registerUser__title">實體用戶註冊</h1>
    </div>
    <div class="row no-gutters">
      <PanelGroup />
    </div>
    <div class="row no-gutters mt-3">
      <UserTable />
    </div>
    <div class="row no-gutters mt-3 mb-4">
      <Pagination />
    </div>
  </main>
</template>

<script>
import Pagination from '@/components/common/Pagination.vue';
import PanelGroup from './PanelGroup.vue';
import UserTable from './UserTable.vue';

export default {
  components: {
    PanelGroup,
    UserTable,
    Pagination,
  },
};
</script>
