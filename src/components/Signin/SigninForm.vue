<template>
  <div class="signin-form p-4 mt-6 mb-6">
    <div class="logo"></div>
    <h1 class="signin-form__title mt-4">登入管理員帳號</h1>
    <ValidationObserver ref="signin-form" slim>
      <form @submit.prevent="signin">
        <div class="signin-form__section mt-4">
          <label
            for="inputEmail"
            class="signin-form__label"
            :class="{ 'signin-form__label--active': inputStatus.email }"
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
              class="signin-form__input signin-form__input--email"
              :class="{ 'signin-form__input--error': failed }"
              id="inputEmail"
              autocomplete="off"
              v-model="account.email"
              @focus="inputStatus.email = true"
              @blur="changeInputStatus('email')"
            />
            <span class="error-message mt-1">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="signin-form__section mt-4">
          <label
            for="inputPassword"
            class="signin-form__label"
            :class="{ 'signin-form__label--active': inputStatus.password }"
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
              class="signin-form__input signin-form__input--password"
              :class="{ 'signin-form__input--error': failed }"
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
              <font-awesome-icon :icon="['far', 'eye-slash']" v-if="passwordType === 'password'" />
              <font-awesome-icon :icon="['far', 'eye']" v-else />
            </span>
            <span class="error-message mt-1">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <button class="btn btn--block btn--secondary signin-form__btn mt-4" @click.prevent="signin">
          登入
        </button>
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
    async signin() {
      const valid = await this.$refs['signin-form'].validate();
      if (!valid) return;
      this.$store.dispatch('admin/signin', this.account);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss-scoped/components/Signin/signin-form.scss';
</style>
