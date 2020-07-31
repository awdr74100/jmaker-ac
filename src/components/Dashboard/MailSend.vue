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
        @drop="drop('mail', $event)"
      >
        <div class="mailSend__inner">
          <input type="file" class="file" @change="inputChnage" />
          <span><i class="far fa-image fa-5x"></i></span>
          <span class="mt-2">Drop image here</span>
          <small class="mt-4 mx-3">Accepted file types: JPG, PNG, GIF. Up to 1MB </small>
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
      const regex = /\.(gif|jpg?g|png)$/i;
      if (!regex.test(file.name)) {
        this.$store.dispatch('alert/updateMessage', {
          message: '不支援的檔案格式',
          status: 'danger',
        });
        return;
      }
      if (file.size > 1024 * 1024) {
        this.$store.dispatch('alert/updateMessage', {
          message: '超過圖片限制大小',
          status: 'danger',
        });
        return;
      }
      await this.$store.dispatch('image/dataTransfer', { file });
      const modal = 'mail';
      this.$store.commit('modal/OPENMODAL', { modal });
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
    async drop(modal, e) {
      e.preventDefault();
      e.stopPropagation();
      this.uploadActive = false;
      const file = e.dataTransfer.files[0];
      const regex = /\.(gif|jpg?g|png)$/i;
      if (!regex.test(file.name)) {
        this.$store.dispatch('alert/updateMessage', {
          message: '不支援的檔案格式',
          status: 'danger',
        });
        return;
      }
      if (file.size > 1024 * 1024) {
        this.$store.dispatch('alert/updateMessage', {
          message: '超過圖片限制大小',
          status: 'danger',
        });
        return;
      }
      await this.$store.dispatch('image/dataTransfer', { file });
      this.$store.commit('modal/OPENMODAL', { modal });
    },
  },
};
</script>
