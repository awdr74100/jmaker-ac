<template>
  <div class="userTable">
    <!-- register -->
    <table class="table text-info" v-if="registerUsers">
      <thead class="bg-primary text-white">
        <tr>
          <th width="60">No</th>
          <th width="160">識別碼</th>
          <th width="200" class="d-flex align-items-center">
            加入時間<span @click="toggleSort"
              ><i class="fas fa-arrow-down ml-2" v-if="sort === 'sortDown'"></i
              ><i class="fas fa-arrow-up ml-2" v-else></i
            ></span>
          </th>
          <th width="140">學號</th>
          <th width="100">姓名</th>
          <th width="130">狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in registerUsers" :key="index">
          <td>{{ index + 1 }}</td>
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
      </tbody>
    </table>
    <!-- adjust -->
    <table class="table text-info" v-if="adjustUsers">
      <thead class="bg-primary text-white">
        <tr>
          <th width="60">No</th>
          <th width="160">識別碼</th>
          <th width="200" class="d-flex align-items-center">
            註冊時間<span @click="toggleSort"
              ><i class="fas fa-arrow-down ml-2" v-if="sort === 'sortDown'"></i
              ><i class="fas fa-arrow-up ml-2" v-else></i
            ></span>
          </th>
          <th width="140">學號</th>
          <th width="100">姓名</th>
          <th width="130">狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in adjustUsers" :key="index">
          <td>{{ index + 1 }}</td>
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
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    registerUsers: Array,
    adjustUsers: Array,
  },
  data() {
    return {
      sort: 'sortDown',
    };
  },
  methods: {
    open(modal, user) {
      this.$store.dispatch('modal/openModal', { modal, user });
    },
    toggleSort() {
      this.sort = this.sort === 'sortDown' ? 'sortUp' : 'sortDown';
      this.$emit('callToggleSort');
    },
  },
};
</script>
