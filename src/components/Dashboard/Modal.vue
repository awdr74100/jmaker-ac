<template>
  <div>
    <modal
      name="register"
      @before-open="beforeOpen"
      :adaptive="true"
      :shiftY="0.2"
      height="auto"
      :width="500"
      :max-width="maxWidth"
      :clickToClose="false"
      ><div class="container-fluid px-0">
        <div class="row no-gutters">
          <div class="modal__header text-white bg-primary p-3">
            <h5>實體用戶註冊</h5>
            <i class="fas fa-times ml-auto" @click.prevent="close('register')"></i>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__body p-3">
            <form action="#">
              <label for="id" class="modal__label mb-2">識別碼</label>
              <input type="text" id="id" class="modal__input mb-3" :value="id" disabled />
              <label for="userName" class="modal__label mb-2">姓名</label>
              <input type="text" id="userName" class="modal__input mb-3" v-model="user.username" />
              <label for="userId" class="modal__label mb-2">學號</label>
              <input type="text" id="userId" class="modal__input" v-model="toUpperCase" />
            </form>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__footer px-3 py-2">
            <button class="btn btn--outline--secondary" @click.prevent="close('register')">
              取消
            </button>
            <button class="btn btn--primary ml-2" @click.prevent="registerUser('register')">
              確認
            </button>
          </div>
        </div>
      </div>
    </modal>
    <modal
      name="delete"
      @before-open="beforeOpen"
      :adaptive="true"
      :shiftY="0.2"
      height="auto"
      :width="500"
      :max-width="maxWidth"
      :clickToClose="false"
      ><div class="container-fluid px-0">
        <div class="row no-gutters">
          <div class="modal__header text-white bg-danger p-3">
            <h5>刪除指定用戶</h5>
            <i class="fas fa-times ml-auto" @click.prevent="close('delete')"></i>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__body p-3">
            <p>
              確認刪除識別碼為<span class="text-danger mx-2">{{ id }}</span
              >用戶嗎？
            </p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__footer px-3 py-2">
            <button class="btn btn--outline--secondary" @click.prevent="close('delete')">
              取消
            </button>
            <button class="btn btn--danger ml-2" @click.prevent="deleteUser('delete')">確認</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      maxWidth: 0,
      user: {
        username: '',
        userid: '',
      },
    };
  },
  methods: {
    beforeOpen() {
      this.maxWidth = window.innerWidth - 30;
    },
    close(modal) {
      this.$store.dispatch('modal/closeModal', modal);
      this.user = { username: '', userid: '' };
    },
    async registerUser(modal) {
      const { id } = this;
      const { username, userid } = this.user;
      await this.$store.dispatch('users/registerUser', { id, username, userid });
      this.$store.dispatch('modal/closeModal', modal);
      this.user = { username: '', userid: '' };
    },
    async deleteUser(modal) {
      const { id } = this;
      await this.$store.dispatch('users/deleteUser', id);
      this.$store.dispatch('modal/closeModal', modal);
    },
  },
  computed: {
    ...mapState('modal', ['id']),
    toUpperCase: {
      get() {
        return this.user.userid;
      },
      set(val) {
        this.user.userid = val.toUpperCase();
      },
    },
  },
};
</script>
