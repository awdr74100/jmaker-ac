<template>
  <div class="loginform p-3 mt-6 mb-6">
    <div class="logo"></div>
    <h1 class="loginform__title mt-4">登入管理員帳號</h1>
    <form @submit.prevent="login">
      <div class="loginform__section mt-4">
        <label
          for="inputEmail"
          class="loginform__label"
          :class="{ 'loginform__label--active': inputState.email }"
          >Email</label
        >
        <input
          type="email"
          class="loginform__input loginform__input--email"
          id="inputEmail"
          autocomplete="off"
          v-model="admin.email"
          @focus="inputState.email = true"
          @blur="changeInputState('email')"
        />
      </div>
      <div class="loginform__section mt-4">
        <label
          for="inputPassword"
          class="loginform__label"
          :class="{ 'loginform__label--active': inputState.password }"
          >Password</label
        >
        <input
          :type="passwordType"
          class="loginform__input loginform__input--password"
          id="inputPassword"
          autocomplete="off"
          v-model="admin.password"
          @focus="inputState.password = true"
          @blur="changeInputState('password')"
        />
        <span
          class="hide-btn"
          @click.prevent="passwordType = passwordType === 'password' ? 'text' : 'password'"
        >
          <i class="far fa-eye-slash" v-if="passwordType === 'password'"></i>
          <i class="far fa-eye" v-else></i>
        </span>
      </div>
      <button class="btn btn--block btn--secondary loginform__btn mt-4" @click.prevent="login">
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
      inputState: {
        email: false,
        password: false,
      },
      admin: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    changeInputState(input) {
      const vm = this;
      if (vm.admin[input] !== '') return;
      vm.inputState[input] = false;
    },
    login() {
      const vm = this;
      vm.$store.dispatch('admin/login', vm.admin);
    },
  },
};
</script>
