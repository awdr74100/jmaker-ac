<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="login p-3 mt-6 mb-6">
          <div class="logo"></div>
          <h1 class="login__title mt-4">登入管理員帳號</h1>
          <form action="#">
            <div class="login__section mt-4">
              <label
                for="inputEmail"
                class="login__label"
                :class="{ 'login__label--active': inputState.email }"
                >Email</label
              >
              <input
                type="email"
                class="login__input login__input--email"
                id="inputEmail"
                autocomplete="off"
                v-model="user.email"
                @focus="inputState.email = true"
                @blur="changeInputState('email')"
              />
            </div>
            <div class="login__section mt-4">
              <label
                for="inputPassword"
                class="login__label"
                :class="{ 'login__label--active': inputState.password }"
                >Password</label
              >
              <input
                :type="inputType"
                class="login__input login__input--password"
                id="inputPassword"
                autocomplete="off"
                v-model="user.password"
                @focus="inputState.password = true"
                @blur="changeInputState('password')"
              />
              <button class="hide-btn" @click.prevent="hidePassword = !hidePassword">
                <i class="far fa-eye-slash" v-if="hidePassword"></i>
                <i class="far fa-eye" v-else></i>
              </button>
            </div>
            <button class="btn btn--block btn--secondary login__btn mt-4" @click.prevent="login">
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hidePassword: true,
      inputState: {
        email: false,
        password: false,
      },
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    changeInputState(input) {
      const vm = this;
      if (vm.user[input] !== '') return;
      vm.inputState[input] = false;
    },
    login() {
      console.log(123);
    },
  },
  computed: {
    inputType() {
      const vm = this;
      if (vm.hidePassword) return 'password';
      return 'text';
    },
  },
};
</script>
