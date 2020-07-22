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
        <div class="dashboardMainLayout__drawer" @click="sidebarToggle"></div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';

export default {
  name: 'Dashboard',
  components: {
    Header,
    Sidebar,
  },
  methods: {
    sidebarToggle() {
      const vm = this;
      const status = vm.$store.state.openSidebar;
      vm.$store.commit('SIDEBARTOGGLE', !status);
    },
  },
  computed: mapState(['openSidebar']),
};
</script>
