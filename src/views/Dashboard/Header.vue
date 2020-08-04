<template>
  <header class="dashboardHeader bg-primary">
    <div class="dashboardHeader__menu mr-2 mr-md-0" @click="sidebarToggle">
      <Hamburger />
    </div>
    <div href="#" class="dashboardHeader__logo mr-2"></div>
    <div class="dashboardHeader__input ml-md-5">
      <input
        type="text"
        placeholder="檢查學號的當前狀態"
        v-model="useridToUpperCase"
        @keypress.enter="searchUser('search')"
      />
      <span><font-awesome-icon :icon="['fas', 'search']"/></span>
    </div>
    <a href="#" class="dashboardHeader__btn ml-auto ml-2" @click.prevent="logout">
      <span class="mr-2">登出</span>
      <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
    </a>
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
      if (!this.userid) {
        this.$store.dispatch('alert/updateMessage', { message: '禁止輸入為空', status: 'danger' });
        return;
      }
      const { userid } = this;
      await this.$store.dispatch('users/getUser', { userid });
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
