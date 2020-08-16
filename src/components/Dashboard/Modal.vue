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
            <span class="ml-auto">
              <font-awesome-icon :icon="['fas', 'times']" @click.prevent="close('register')" />
            </span>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__body p-3">
            <ValidationObserver ref="registerForm">
              <form>
                <label for="id" class="modal__label mb-2">識別碼</label>
                <input type="text" id="id" class="modal__input mb-3" :value="user._id" disabled />
                <label for="userName" class="modal__label mb-2">姓名</label>
                <ValidationProvider tag="div" rules="required" name="userName" v-slot="{ failed }">
                  <input
                    type="text"
                    id="userName"
                    class="modal__input mb-3"
                    :class="{ 'modal__input--error': failed }"
                    v-model="input.username"
                  />
                </ValidationProvider>
                <label for="userId" class="modal__label mb-2">學號</label>
                <ValidationProvider tag="div" rules="required" name="userId" v-slot="{ failed }">
                  <input
                    type="text"
                    id="userId"
                    class="modal__input"
                    :class="{ 'modal__input--error': failed }"
                    v-model="useridToUpperCase"
                    @keypress.enter="registerUser('register')"
                  />
                </ValidationProvider>
              </form>
            </ValidationObserver>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__footer px-3 py-2">
            <button class="btn btn--gray" @click.prevent="close('register')">
              取消
            </button>
            <button class="btn btn--primary ml-2" @click.prevent="registerUser('register')">
              <span class="ml-1 mr-2" :class="{ 'd-none': !loading }">
                <font-awesome-icon :icon="['fas', 'spinner']" spin />
              </span>
              <span>確認</span>
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
            <span class="ml-auto">
              <font-awesome-icon :icon="['fas', 'times']" @click.prevent="close('delete')" />
            </span>
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
            <button class="btn btn--danger ml-2" @click.prevent="deleteUser('delete')">
              <span class="ml-1 mr-2" :class="{ 'd-none': !loading }">
                <font-awesome-icon :icon="['fas', 'spinner']" spin />
              </span>
              <span>確認</span>
            </button>
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
            <span class="ml-auto">
              <font-awesome-icon :icon="['fas', 'times']" @click.prevent="close('adjust')" />
            </span>
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
              <span class="ml-1 mr-2" :class="{ 'd-none': !loading }">
                <font-awesome-icon :icon="['fas', 'spinner']" spin />
              </span>
              <span>確認</span>
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
            <span class="ml-auto">
              <font-awesome-icon :icon="['fas', 'times']" @click.prevent="close('search')" />
            </span>
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
              <label for="auth" class="modal__label mb-2">狀態</label>
              <input
                type="text"
                id="auth"
                class="modal__input mb-3"
                :class="{ 'text-success': user.auth, 'text-warning': !user.auth }"
                :value="user.auth === true ? '實體用戶' : '移除權限'"
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
      ><div class="container-fluid px-0 modal">
        <div class="row no-gutters">
          <div class="modal__header text-white bg-primary p-3">
            <h5>撰寫收件人資料</h5>
            <span class="ml-auto">
              <font-awesome-icon :icon="['fas', 'times']" @click.prevent="close('mail')" />
            </span>
          </div>
        </div>
        <div class="row no-gutters">
          <div class="modal__body p-3">
            <div class="modal__group mb-3">
              <button
                class="btn left"
                :class="{
                  'btn--primary': view === 'addressee',
                  'btn--outline--primary': view === 'preview',
                }"
                @click.prevent="view = view === 'addressee' ? 'preview' : 'addressee'"
              >
                收件人
              </button>
              <button
                class="btn right"
                :class="{
                  'btn--primary': view === 'preview',
                  'btn--outline--primary': view === 'addressee',
                }"
                @click.prevent="view = view === 'addressee' ? 'preview' : 'addressee'"
              >
                預覽圖片
              </button>
            </div>
            <template v-if="view === 'addressee'">
              <ValidationObserver tag="div" ref="mailForm">
                <form>
                  <label for="adminName" class="modal__label mb-2">管理員名稱</label>
                  <input
                    type="text"
                    id="adminName"
                    class="modal__input mb-3"
                    v-model="mail.nickname"
                    disabled
                  />
                  <label for="userid" class="modal__label mb-2">信箱*</label>
                  <ValidationProvider tag="div" rules="required" name="userid" v-slot="{ failed }">
                    <div class="modal__group  mb-3">
                      <input
                        type="text"
                        id="userid"
                        class="modal__input left"
                        :class="{ 'modal__input--error': failed }"
                        v-model="mailUseridToUpperCase"
                      />
                      <input type="text" class="modal__input right" :value="mail.domain" disabled />
                    </div>
                  </ValidationProvider>
                  <label for="subject" class="modal__label mb-2">標題*</label>
                  <ValidationProvider tag="div" rules="required" name="subject" v-slot="{ failed }">
                    <input
                      type="text"
                      id="subject"
                      class="modal__input mb-3"
                      :class="{ 'modal__input--error': failed }"
                      v-model="mail.subject"
                    />
                  </ValidationProvider>
                  <label for="content" class="modal__label mb-2">內容</label>
                  <textarea
                    id="content"
                    class="modal__textarea"
                    cols="30"
                    rows="4"
                    v-model="mail.content"
                  ></textarea>
                </form>
              </ValidationObserver>
            </template>
            <div
              class="modal__preview"
              :style="{ 'background-image': `url('${base64}')` }"
              v-else
            ></div>
          </div>
        </div>
        <div class="row no-gutters" v-if="view === 'addressee'">
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
      loading: false,
      maxWidth: 0,
      view: 'addressee',
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
      this.$store.commit('modal/CLOSEMODAL', modal);
      this.input = { username: '', userid: '' };
      this.mail = {
        nickname: JSON.parse(localStorage.getItem('account')).nickname,
        userid: '',
        domain: '@stust.edu.tw',
        subject: '',
        content: '',
      };
    },
    async registerUser(modal) {
      const valid = await this.$refs.registerForm.validate();
      if (!valid) return;
      const id = this.user._id;
      const { username, userid } = this.input;
      this.loading = true;
      await this.$store.dispatch('users/registerUser', { id, username, userid });
      this.loading = false;
      this.$store.commit('modal/CLOSEMODAL', modal);
      this.input = { username: '', userid: '' };
    },
    async deleteUser(modal) {
      const id = this.user._id;
      this.loading = true;
      await this.$store.dispatch('users/deleteUser', { id });
      this.loading = false;
      this.$store.commit('modal/CLOSEMODAL', modal);
    },
    async adjustUser(modal) {
      const id = this.user._id;
      const auth = !this.user.auth;
      this.loading = true;
      await this.$store.dispatch('users/adjustAuth', { id, auth });
      this.loading = false;
      this.$store.commit('modal/CLOSEMODAL', modal);
    },
    async mailSend(modal) {
      const valid = await this.$refs.mailForm.validate();
      if (!valid) return;
      const { file } = this;
      await this.$store.dispatch('image/uploadImage', { file });
      const payload = {
        nickname: this.mail.nickname,
        email: this.mail.userid + this.mail.domain,
        subject: this.mail.subject,
        imgUrl: this.imgUrl,
        content: this.mail.content,
      };
      await this.$store.dispatch('mail/mailSend', { payload });
      this.mail = {
        nickname: JSON.parse(localStorage.getItem('account')).nickname,
        userid: '',
        domain: '@stust.edu.tw',
        subject: '',
        content: '',
      };
      this.$store.commit('modal/CLOSEMODAL', modal);
    },
  },
  computed: {
    ...mapState('modal', ['user']),
    ...mapState('image', ['file', 'base64', 'imgUrl']),
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

<style lang="scss" scoped>
@import '~@/assets/scss-scoped/components/Dashboard/modal.scss';
</style>
