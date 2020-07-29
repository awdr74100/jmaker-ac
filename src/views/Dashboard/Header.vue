<template>
  <header class="dashboardHeader bg-primary">
    <div class="dashboardHeader__menu mr-2 mr-md-0" @click="sidebarToggle">
      <Hamburger />
    </div>
    <a href="#" class="dashboardHeader__logo mr-2"></a>
    <input
      type="text"
      class="dashboardHeader__input ml-md-5"
      placeholder="檢查學號的當前狀態"
      v-model="useridToUpperCase"
      @keypress.enter="searchUser('search')"
    />
    <a href="#" class="dashboardHeader__btn ml-md-auto ml-2" @click.prevent="logout"
      ><span class="mr-2">登出</span><i class="fas fa-sign-out-alt"></i
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
  data() {
    return {
      userid: '',
    };
  },
  methods: {
    ...mapActions('admin', ['logout']),
    sidebarToggle() {
      const status = this.$store.state.openSidebar;
      this.$store.commit('SIDEBARTOGGLE', !status);
    },
    async searchUser(modal) {
      await this.$store.dispatch('users/getUser', this.userid);
      const { user } = this.$store.state.users;
      this.$store.commit('modal/OPENMODAL', { modal, user });
      this.userid = '';
    },
  },
  computed: {
    useridToUpperCase: {
      get() {
        return this.userid;
      },
      set(val) {
        this.userid = val.toUpperCase();
      },
    },
  },
};
</script>
