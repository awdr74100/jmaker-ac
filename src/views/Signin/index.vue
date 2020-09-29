<template>
  <div class="container">
    <div class="signin-form-layout mx-auto">
      <SigninForm />
    </div>
  </div>
</template>

<script>
import SigninForm from '@/components/Signin/SigninForm.vue';

export default {
  name: 'Signin',
  components: {
    SigninForm,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss-scoped/views/Signin/index.scss';
</style>
