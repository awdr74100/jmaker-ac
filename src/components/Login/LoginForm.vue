<template>
  <div class="loginForm p-4 mt-6 mb-6">
    <div class="logo"></div>
    <h1 class="loginForm__title mt-4">登入管理員帳號</h1>
    <ValidationObserver ref="loginForm">
      <form @submit.prevent="login">
        <div class="loginForm__section mt-4">
          <label
            for="inputEmail"
            class="loginForm__label"
            :class="{ 'loginForm__label--active': inputStatus.email }"
            >Email</label
          >
          <ValidationProvider
            tag="div"
            rules="required|email"
            name="Email"
            v-slot="{ errors, failed }"
          >
            <input
              type="email"
              class="loginForm__input loginForm__input--email"
              :class="{ 'loginForm__input--error': failed }"
              id="inputEmail"
              autocomplete="off"
              v-model="account.email"
              @focus="inputStatus.email = true"
              @blur="changeInputStatus('email')"
            />
            <span class="error-message mt-1">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="loginForm__section mt-4">
          <label
            for="inputPassword"
            class="loginForm__label"
            :class="{ 'loginForm__label--active': inputStatus.password }"
            >Password</label
          >
          <ValidationProvider
            tag="div"
            rules="required"
            name="Password"
            v-slot="{ errors, failed }"
          >
            <input
              :type="passwordType"
              class="loginForm__input loginForm__input--password"
              :class="{ 'loginForm__input--error': failed }"
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
            <span class="error-message mt-1">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <button class="btn btn--block btn--secondary loginForm__btn mt-4" @click.prevent="login">
          登入
        </button>
        <button type="reset" style="display:none"></button>
      </form>
    </ValidationObserver>
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
    async login() {
      const valid = await this.$refs.loginForm.validate();
      if (!valid) return;
      this.$store.dispatch('admin/login', this.account);
    },
  },
};
</script>
