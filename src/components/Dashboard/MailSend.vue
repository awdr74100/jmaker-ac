<template>
  <main class="container-fluid">
    <div class="row">
      <h1 class="mailSend__title">違規訊息推播</h1>
    </div>
    <div class="row no-gutters mt-3 copy">
      <div
        class="mailSend__section p-4"
        :class="{ 'mailSend__section--active': uploadActive }"
        @click="inputClick"
        @dragleave="dragLeave"
        @dragover="dragOver"
        @drop="drop"
      >
        <div class="mailSend__inner">
          <input type="file" class="file" @change="inputChnage" />
          <span><i class="far fa-image fa-5x"></i></span>
          <span class="mt-2">Drop image here</span>
          <small class="mt-4 mx-3">Accepted file types: jpeg, png, gif. Up to 5MB </small>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      uploadActive: false,
    };
  },
  methods: {
    inputClick() {
      document.querySelector('.file').click();
    },
    async inputChnage(e) {
      const file = e.target.files[0];
      await this.$store.dispatch('image/dataTransfer', file);
      const modal = 'mail';
      this.$store.dispatch('modal/openModal', { modal });
    },
    dragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      this.uploadActive = false;
    },
    dragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      this.uploadActive = true;
    },
    async drop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.uploadActive = false;
      const file = e.dataTransfer.files[0];
      await this.$store.dispatch('image/dataTransfer', file);
      const modal = 'mail';
      this.$store.dispatch('modal/openModal', { modal });
    },
  },
};
</script>
