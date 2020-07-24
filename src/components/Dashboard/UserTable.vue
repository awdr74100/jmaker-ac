<template>
  <div class="userTable">
    <!-- register -->
    <table class="table text-info">
      <thead class="bg-primary text-white">
        <tr>
          <th width="60">No</th>
          <th width="160">識別碼</th>
          <th>註冊時間</th>
          <th>學號</th>
          <th>姓名</th>
          <th>狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item._id }}</td>
          <td>{{ item.created_at | datetime }}</td>
          <td>unknown</td>
          <td>unknown</td>
          <td class="text-danger">匿名用戶</td>
          <td class="text-center">
            <button class="btn btn--primary" @click.prevent="open">註冊</button>
            <button class="btn btn--danger ml-1" @click="close">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    users: Array,
  },
  methods: {
    open() {
      this.$modal.show('example');
    },
    close() {
      this.$modal.hide('example');
    },
  },
};
</script>
