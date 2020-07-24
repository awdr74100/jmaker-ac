<template>
  <header class="dashboardHeader bg-primary">
    <div class="dashboardHeader__menu" @click="sidebarToggle">
      <Hamburger />
    </div>
    <a href="#" class="dashboardHeader__logo ml-3"></a>
    <input type="text" class="dashboardHeader__input ml-md-4" placeholder="檢查學號的當前狀態" />
    <a href="#" class="dashboardHeader__btn ml-auto" @click.prevent="logout"
      >登出<i class="fas fa-sign-out-alt ml-2"></i
    ></a>
  </header>
</template>

<script>
import { mapActions } from 'vuex';
import Hamburger from '@/components/common/Hamburger.vue';

export default {
  components: {
    Hamburger,
  },
  methods: {
    sidebarToggle() {
      const vm = this;
      const status = vm.$store.state.openSidebar;
      vm.$store.commit('SIDEBARTOGGLE', !status);
    },
    ...mapActions('admin', ['logout']),
  },
};
</script>
