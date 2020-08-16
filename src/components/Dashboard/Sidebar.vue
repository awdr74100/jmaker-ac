<template>
  <div class="sidebar text-secondary">
    <div class="sidebar__account p-3">
      <span><font-awesome-icon :icon="['fas', 'user']" size="lg"/></span>
      <div class="ml-3">
        <p>{{ account.nickname === 'root' ? '系統管理員' : account.nickname }}</p>
        <p class="mt-1">{{ account.email }}</p>
      </div>
    </div>
    <nav class="sidebar__nav">
      <ul class="sidebar__list">
        <li class="sidebar__item">
          <router-link
            to="/admin/register"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': visibility === 'Register' }"
            @click.native="sidebarToggle"
          >
            <span class="py-3 ml-3"><font-awesome-icon :icon="['fas', 'check']"/></span>
            <p class="ml-3">實體用戶註冊</p>
          </router-link>
        </li>
        <li class="sidebar__item">
          <router-link
            to="/admin/adjust"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': visibility === 'Adjust' }"
            @click.native="sidebarToggle"
          >
            <span class="py-3 ml-3"><font-awesome-icon :icon="['fas', 'tasks']"/></span>
            <p class="ml-3">調整用戶權限</p>
          </router-link>
        </li>
      </ul>
      <ul class="sidebar__list">
        <li class="sidebar__item">
          <router-link
            to="/admin/send"
            class="sidebar__link"
            :class="{ 'sidebar__link--active': visibility === 'Send' }"
            @click.native="sidebarToggle"
          >
            <span class="py-3 ml-3"
              ><font-awesome-icon :icon="['fas', 'envelope-open-text']"
            /></span>
            <p class="ml-3">違規訊息推播</p>
          </router-link>
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
    account() {
      return JSON.parse(localStorage.getItem('account'));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss-scoped/components/Dashboard/sidebar.scss';
</style>
