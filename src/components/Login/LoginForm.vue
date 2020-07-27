<template>
  <div class="loginForm p-4 mt-6 mb-6">
    <div class="logo"></div>
    <h1 class="loginForm__title mt-4">登入管理員帳號</h1>
    <form @submit.prevent="login">
      <div class="loginForm__section mt-4">
        <label
          for="inputEmail"
          class="loginForm__label"
          :class="{ 'loginForm__label--active': inputStatus.email }"
          >Email</label
        >
        <input
          type="email"
          class="loginForm__input loginForm__input--email"
          id="inputEmail"
          autocomplete="off"
          v-model="account.email"
          @focus="inputStatus.email = true"
          @blur="changeInputStatus('email')"
        />
      </div>
      <div class="loginForm__section mt-4">
        <label
          for="inputPassword"
          class="loginForm__label"
          :class="{ 'loginForm__label--active': inputStatus.password }"
          >Password</label
        >
        <input
          :type="passwordType"
          class="loginForm__input loginForm__input--password"
          id="inputPassword"
          autocomplete="off"
          v-model="account.password"
          @focus="inputStatus.password = true"
          @blur="changeInputStatus('password')"
        />
        <span
          class="hide-btn"
          @click.prevent="passwordType = passwordType === 'password' ? 'text' : 'password'"
        >
          <i class="far fa-eye-slash" v-if="passwordType === 'password'"></i>
          <i class="far fa-eye" v-else></i>
        </span>
      </div>
      <button class="btn btn--block btn--secondary loginForm__btn mt-4" @click.prevent="login">
        登入
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      passwordType: 'password',
      inputStatus: {
        email: false,
        password: false,
      },
      account: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    changeInputStatus(input) {
      if (this.account[input] !== '') return;
      this.inputStatus[input] = false;
    },
    login() {
      this.$store.dispatch('admin/login', this.account);
    },
  },
};
</script>
