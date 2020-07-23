<template>
  <div class="userTable">
    <table class="table text-info">
      <thead class="bg-primary text-white">
        <tr>
          <th>ID</th>
          <th>識別碼</th>
          <th>註冊時間</th>
          <th>學號</th>
          <th>姓名</th>
          <th>狀態</th>
          <th class="text-center">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in 8" :key="index">
          <td>{{ index }}</td>
          <td>4dwd4wd4dw8</td>
          <td>2020-05-24 18:26:21</td>
          <td>4A6G0068</td>
          <td>藍奕濡</td>
          <td class="text-danger">匿名用戶</td>
          <td class="text-center">
            <button class="btn btn--primary">註冊</button>
            <button class="btn btn--danger ml-1">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
