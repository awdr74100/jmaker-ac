<template>
  <div class="data-table">
    <!-- register -->
    <table class="table" v-if="view === 'register'">
      <thead class="bg-primary text-white">
        <tr>
          <th width="60">No</th>
          <th width="160">識別碼</th>
          <th width="200">
            <div class="d-flex align-items-center">
              <p>加入時間</p>
              <span class="sort pl-2" @click="toggleSort">
                <font-awesome-icon :icon="['fas', 'arrow-down']" v-if="sort === 'sortDown'" />
                <font-awesome-icon :icon="['fas', 'arrow-up']" v-else />
              </span>
            </div>
          </th>
          <th width="140">學號</th>
          <th width="100">姓名</th>
          <th width="130">狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="skeletonActive">
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
          <tr v-for="(item, index) in sliceAndSortUsers" :key="index">
            <td>{{ (page - 1) * row + (index + 1) }}</td>
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
      <tfoot>
        <tr>
          <td colspan="7">
            <div class="d-flex align-items-center justify-content-end my-1">
              <div class="mr-4">
                <Select @callToggleRow="toggleRow" />
              </div>
              <div>
                <Pagination
                  :length="filterUsers.length"
                  :row="row"
                  @callTogglePage="togglePage"
                />
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
    <!-- adjust -->
    <table class="table text-info" v-if="view === 'adjust'">
      <thead class="bg-primary text-white">
        <tr>
          <th width="60">No</th>
          <th width="160">識別碼</th>
          <th width="200">
            <div class="d-flex align-items-center">
              <p>註冊時間</p>
              <span class="sort pl-2" @click="toggleSort">
                <font-awesome-icon :icon="['fas', 'arrow-down']" v-if="sort === 'sortDown'" />
                <font-awesome-icon :icon="['fas', 'arrow-up']" v-else />
              </span>
            </div>
          </th>
          <th width="140">學號</th>
          <th width="100">姓名</th>
          <th width="130">狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="skeletonActive">
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
          <tr v-for="(item, index) in sliceAndSortUsers" :key="index">
            <td>{{ (page - 1) * row + (index + 1) }}</td>
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
      <tfoot>
        <tr>
          <td colspan="7">
            <div class="d-flex align-items-center justify-content-end my-1">
              <div class="mr-4">
                <Select @callToggleRow="toggleRow" />
              </div>
              <div>
                <Pagination
                  :length="filterUsers.length"
                  :row="row"
                  @callTogglePage="togglePage"
                />
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Pagination from '@/components/common/Pagination.vue';
import Select from '@/components/common/Select.vue';

export default {
  components: {
    Pagination,
    Select,
  },
  props: {
    users: Array,
    view: String,
  },
  data() {
    return {
      sort: 'sortDown',
      page: 1,
      row: 8,
    };
  },
  methods: {
    open(modal, user) {
      this.$store.commit('modal/OPENMODAL', { modal, user });
    },
    toggleSort() {
      this.sort = this.sort === 'sortUp' ? 'sortDown' : 'sortUp';
    },
    togglePage(page) {
      this.page = page;
    },
    toggleRow(row) {
      this.row = row;
    },
  },
  computed: {
    ...mapState(['skeletonActive']),
    filterUsers() {
      const vm = this;
      if (vm.view === 'adjust') return vm.users.filter((item) => item.register_at !== null);
      return vm.users.filter((item) => item.register_at === null);
    },
    sliceAndSortUsers() {
      const vm = this;
      const users = JSON.parse(JSON.stringify(vm.users));
      const [sortA, sortB] = vm.sort === 'sortUp' ? [1, -1] : [-1, 1];
      const [startIndex, endIndex] = [(vm.page - 1) * vm.row, vm.page * vm.row];
      return users
        .filter((item) => {
          if (vm.view === 'adjust') return item.register_at !== null;
          return item.register_at === null;
        })
        .sort((a, b) => {
          if (vm.view === 'adjust') return a.register_at > b.register_at ? sortA : sortB;
          return a.created_at > b.created_at ? sortA : sortB;
        })
        .slice(startIndex, endIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss-scoped/components/Dashboard/data-table.scss';
</style>
