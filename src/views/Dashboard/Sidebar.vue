<template>
  <div class="dashboardSidebar text-secondary">
    <div class="dashboardSidebar__account">
      <i class="fa fa-user-circle"></i>
      <span class="ml-3">{{ nickname }}</span>
    </div>
    <nav class="dashboardSidebar__nav">
      <ul class="dashboardSidebar__list">
        <li class="dashboardSidebar__item">
          <router-link
            to="/admin"
            class="dashboardSidebar__link"
            :class="{ 'dashboardSidebar__link--active': visibility === 'RegisterUser' }"
            @click.native="sidebarToggle"
            ><i class="fas fa-check mr-3 pl-3 py-3"></i> 實體用戶註冊</router-link
          >
        </li>
        <li class="dashboardSidebar__item">
          <router-link
            to="/admin/adjust"
            class="dashboardSidebar__link"
            :class="{ 'dashboardSidebar__link--active': visibility === 'AdjustUser' }"
            @click.native="sidebarToggle"
            ><i class="fa fa-tasks mr-3 pl-3 py-3"></i> 調整用戶權限</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  methods: {
    sidebarToggle() {
      if (window.innerWidth >= 768) return;
      const status = this.$store.state.openSidebar;
      this.$store.commit('SIDEBARTOGGLE', !status);
    },
  },
  computed: {
    visibility() {
      return this.$route.name;
    },
    nickname() {
      const { nickname } = JSON.parse(localStorage.getItem('account'));
      if (nickname === 'root') return '系統管理員';
      return nickname;
    },
  },
};
</script>
