<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-input v-model="txtSearch" placeholder="请输入关键字"></el-input>
      <el-button v-model="search" type="danger" @click="search">搜索</el-button>
      <template>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="stuNum" label="学号" width="180"></el-table-column>
          <el-table-column prop="stuName" label="学生名字" width="180"></el-table-column>
          <el-table-column prop="stuSex" label="性别" width="180"></el-table-column>
          <el-table-column prop="stuBirthday" label="学生生日"></el-table-column>
        </el-table>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import moment from "moment";
moment.locale("zh-cn");

export default {
  data() {
    return {
      tableData: [],
      txtSearch: ""
    };
  },
  computed: {},
  watch: {
    // 如果 `tableData` 发生改变，这个函数就会运行
    tableData: function(tableData) {
      tableData.forEach(e => {
        if (e.stuSex == "1") e.stuSex = "男";
        else {
          e.stuSex = "女";
        }
        e.stuBirthday = moment(e.stuBirthday).format("YYYY-MM-DD");
      });
    }
  },
  methods: {
    search() {
      var _this = this;
      axios
        .get("api/stu/search", {
          params: {
            key: _this.txtSearch
          }
        })
        .then(res => {
          console.log(res.data);
          _this.tableData = res.data;
          _this.$message({
            showClose: true,
            message: "获取成功",
            type: "success"
          });
          // _this.tableData.forEach(element => {
          //     element.sex = this.sexDesc(element.sex);
          // });
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          _this.$message({
            showClose: true,
            message: "获取失败",
            type: "error"
          });
        });
    },
    getUsers() {
      var _this = this;
      axios
        .get("api/stu/all")
        .then(res => {
          console.log(res.data);
          _this.tableData = res.data;
          _this.$message({
            showClose: true,
            message: "获取成功",
            type: "success"
          });
          // _this.tableData.forEach(element => {
          //     element.sex = this.sexDesc(element.sex);
          // });
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);

          _this.$message({
            showClose: true,
            message: "获取失败",
            type: "error"
          });
        });
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style>
</style>
