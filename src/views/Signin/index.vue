<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <SigninForm />
      </div>
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
