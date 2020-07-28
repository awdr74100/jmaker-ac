<template>
  <div>
    <!-- register -->
    <modal
      v-if="user"
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
              <input type="text" id="id" class="modal__input mb-3" :value="user._id" disabled />
              <label for="userName" class="modal__label mb-2">姓名</label>
              <input type="text" id="userName" class="modal__input mb-3" v-model="input.username" />
              <label for="userId" class="modal__label mb-2">學號</label>
              <input type="text" id="userId" class="modal__input" v-model="useridToUpperCase" />
            </form>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__footer px-3 py-2">
            <button class="btn btn--gray" @click.prevent="close('register')">
              取消
            </button>
            <button class="btn btn--primary ml-2" @click.prevent="registerUser('register')">
              確認
            </button>
          </div>
        </div>
      </div>
    </modal>
    <!-- delete -->
    <modal
      v-if="user"
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
              確認刪除識別碼為<span class="text-danger mx-2">{{ user._id }}</span
              >用戶嗎？
            </p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__footer px-3 py-2">
            <button class="btn btn--gray" @click.prevent="close('delete')">
              取消
            </button>
            <button class="btn btn--danger ml-2" @click.prevent="deleteUser('delete')">確認</button>
          </div>
        </div>
      </div>
    </modal>
    <!-- adjust -->
    <modal
      v-if="user"
      name="adjust"
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
            <h5>調整指定用戶</h5>
            <i class="fas fa-times ml-auto" @click.prevent="close('adjust')"></i>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__body p-3">
            <p>
              將識別碼<span class="text-primary mx-2">{{ user._id }}</span
              >用戶調整權限為<span class="text-warning ml-2" v-if="user.auth">移除權限</span
              ><span class="text-success ml-2" v-else>實體用戶</span>
            </p>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__footer px-3 py-2">
            <button class="btn btn--gray" @click.prevent="close('adjust')">
              取消
            </button>
            <button class="btn btn--primary ml-2" @click.prevent="adjustUser('adjust')">
              確認
            </button>
          </div>
        </div>
      </div>
    </modal>
    <!-- search -->
    <modal
      name="search"
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
            <h5>搜尋結果</h5>
            <i class="fas fa-times ml-auto" @click.prevent="close('search')"></i>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__body p-3">
            <form action="#" v-if="user">
              <label for="id" class="modal__label mb-2">識別碼</label>
              <input type="text" id="id" class="modal__input mb-3" :value="user._id" disabled />
              <label for="userName" class="modal__label mb-2">姓名</label>
              <input
                type="text"
                id="userName"
                class="modal__input mb-3"
                v-model="user.username"
                disabled
              />
              <label for="userId" class="modal__label mb-2">學號</label>
              <input
                type="text"
                id="userId"
                class="modal__input mb-3"
                :value="user.userid"
                disabled
              />
              <label for="created_at" class="modal__label mb-2">加入日期</label>
              <input
                type="text"
                id="created_at"
                class="modal__input mb-3"
                :value="user.created_at | datetime"
                disabled
              />
              <label for="register_at" class="modal__label mb-2">註冊日期</label>
              <input
                type="text"
                id="register_at"
                class="modal__input"
                :value="user.register_at | datetime"
                disabled
              />
            </form>
            <p class="text-center my-3" v-else>User not found</p>
          </div>
        </div>
      </div>
    </modal>
    <!-- mail -->
    <modal
      name="mail"
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
            <h5>撰寫收件人資料</h5>
            <i class="fas fa-times ml-auto" @click.prevent="close('mail')"></i>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__body p-3">
            <form action="#">
              <label for="adminName" class="modal__label mb-2">管理員名稱</label>
              <input
                type="text"
                id="adminName"
                class="modal__input mb-3"
                v-model="mail.nickname"
                disabled
              />
              <label for="userid" class="modal__label mb-2">信箱</label>
              <div class="modal__group  mb-3">
                <input
                  type="text"
                  id="userid"
                  class="modal__input left"
                  v-model="mailUseridToUpperCase"
                />
                <input type="text" class="modal__input right" :value="mail.domain" disabled />
              </div>
              <label for="subject" class="modal__label mb-2">標題</label>
              <input type="text" id="subject" class="modal__input mb-3" v-model="mail.subject" />
              <label for="content" class="modal__label mb-2">內容</label>
              <textarea
                id="content"
                class="modal__textarea"
                cols="30"
                rows="5"
                v-model="mail.content"
              ></textarea>
            </form>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__footer px-3 py-2">
            <button class="btn btn--gray" @click.prevent="close('mail')">
              取消
            </button>
            <button class="btn btn--primary ml-2" @click.prevent="mailSend('mail')">
              確認
            </button>
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
      input: {
        username: '',
        userid: '',
      },
      mail: {
        nickname: JSON.parse(localStorage.getItem('account')).nickname,
        userid: '',
        domain: '@stust.edu.tw',
        subject: '',
        content: '',
      },
    };
  },
  methods: {
    beforeOpen() {
      this.maxWidth = window.innerWidth - 30;
    },
    close(modal) {
      this.$store.dispatch('modal/closeModal', modal);
      this.input = { username: '', userid: '' };
    },
    async registerUser(modal) {
      // eslint-disable-next-line dot-notation
      const id = this.user['_id'];
      const { username, userid } = this.input;
      await this.$store.dispatch('users/registerUser', { id, username, userid });
      this.$store.dispatch('modal/closeModal', modal);
      this.input = { username: '', userid: '' };
    },
    async deleteUser(modal) {
      // eslint-disable-next-line dot-notation
      const id = this.user['_id'];
      await this.$store.dispatch('users/deleteUser', id);
      this.$store.dispatch('modal/closeModal', modal);
    },
    async adjustUser(modal) {
      // eslint-disable-next-line dot-notation
      const id = this.user['_id'];
      const auth = !this.user.auth;
      await this.$store.dispatch('users/adjustAuth', { id, auth });
      this.$store.dispatch('modal/closeModal', modal);
    },
    async mailSend(modal) {
      await this.$store.dispatch('image/uploadImage', this.file);
      const payload = {
        nickname: this.mail.nickname,
        email: this.mail.userid + this.mail.domain,
        subject: this.mail.subject,
        imgUrl: this.imgUrl,
        content: this.mail.content,
      };
      await this.$store.dispatch('mail/mailSend', payload);
      this.mail = {
        nickname: JSON.parse(localStorage.getItem('account')).nickname,
        userid: '',
        domain: '@stust.edu.tw',
        subject: '',
        content: '',
      };
      this.$store.dispatch('modal/closeModal', modal);
    },
  },
  computed: {
    ...mapState('modal', ['user']),
    ...mapState('image', ['file', 'imgUrl']),
    useridToUpperCase: {
      get() {
        return this.input.userid;
      },
      set(val) {
        this.input.userid = val.toUpperCase();
      },
    },
    mailUseridToUpperCase: {
      get() {
        return this.mail.userid;
      },
      set(val) {
        this.mail.userid = val.toUpperCase();
      },
    },
  },
};
</script>
