<template>
  <div class="userTable">
    <!-- register -->
    <table class="table text-info" v-if="registerUsers">
      <thead class="bg-primary text-white">
        <tr>
          <th width="60">No</th>
          <th width="160">識別碼</th>
          <th width="200">
            加入時間<span class="pl-2" @click="toggleSort">
              <font-awesome-icon :icon="['fas', 'arrow-down']" v-if="sort === 'sortDown'" />
              <font-awesome-icon :icon="['fas', 'arrow-up']" v-else />
            </span>
          </th>
          <th width="140">學號</th>
          <th width="100">姓名</th>
          <th width="130">狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="skeleton">
          <tr style="height:52px" v-for="index in 8" :key="index">
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in registerUsers" :key="index">
            <td>{{ (nowPage - 1) * 8 + (index + 1) }}</td>
            <td>{{ item._id }}</td>
            <td>{{ item.created_at | datetime }}</td>
            <td>unknown</td>
            <td>unknown</td>
            <td class="text-danger">匿名用戶</td>
            <td class="text-center">
              <button class="btn btn--primary" @click.prevent="open('register', item)">
                註冊
              </button>
              <button class="btn btn--danger ml-1" @click.prevent="open('delete', item)">
                刪除
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <!-- adjust -->
    <table class="table text-info" v-if="adjustUsers">
      <thead class="bg-primary text-white">
        <tr>
          <th width="60">No</th>
          <th width="160">識別碼</th>
          <th width="200">
            註冊時間<span class="pl-2" @click="toggleSort">
              <font-awesome-icon :icon="['fas', 'arrow-down']" v-if="sort === 'sortDown'" />
              <font-awesome-icon :icon="['fas', 'arrow-up']" v-else />
            </span>
          </th>
          <th width="140">學號</th>
          <th width="100">姓名</th>
          <th width="130">狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="skeleton">
          <tr style="height:52px" v-for="index in 8" :key="index">
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
            <td><Skeleton /></td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(item, index) in adjustUsers" :key="index">
            <td>{{ (nowPage - 1) * 8 + (index + 1) }}</td>
            <td>{{ item._id }}</td>
            <td>{{ item.register_at | datetime }}</td>
            <td>{{ item.userid }}</td>
            <td>{{ item.username }}</td>
            <td class="text-success" v-if="item.auth">實體用戶</td>
            <td class="text-warning" v-else>移除權限</td>
            <td class="text-center">
              <button class="btn btn--primary" @click.prevent="open('adjust', item)">
                調整
              </button>
              <button class="btn btn--danger ml-1" @click.prevent="open('delete', item)">
                刪除
              </button>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    registerUsers: Array,
    adjustUsers: Array,
    nowPage: Number,
    skeleton: Boolean,
  },
  data() {
    return {
      sort: 'sortDown',
    };
  },
  methods: {
    open(modal, user) {
      this.$store.commit('modal/OPENMODAL', { modal, user });
    },
    toggleSort() {
      this.sort = this.sort === 'sortDown' ? 'sortUp' : 'sortDown';
      this.$emit('callToggleSort');
    },
  },
};
</script>
