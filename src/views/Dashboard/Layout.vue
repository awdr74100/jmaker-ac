<template>
  <div class="container-fluid px-0" :class="{ openSidebar: openSidebar }">
    <div class="dashboardHeaderLayout">
      <Header />
    </div>
    <div class="row no-gutters">
      <div class="dashboardSidebarLayout">
        <Sidebar />
      </div>
      <div class="dashboardMainLayout">
        <router-view></router-view>
      </div>
    </div>
    <!-- Drawer -->
    <div class="dashboardDrawer" @click="sidebarToggle"></div>
    <!-- Modal -->
    <Modal />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Modal from '@/components/Dashboard/Modal.vue';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Sidebar,
    Modal,
  },
  methods: {
    sidebarToggle() {
      const status = this.$store.state.openSidebar;
      this.$store.commit('SIDEBARTOGGLE', !status);
    },
  },
  computed: mapState(['openSidebar']),
};
</script>
