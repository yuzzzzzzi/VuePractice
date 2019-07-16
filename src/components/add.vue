<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="学生姓名" prop="stuName">
          <el-input v-model="ruleForm.stuName"></el-input>
        </el-form-item>
        <el-form-item label="学生学号" prop="stuNum">
          <el-input v-model="ruleForm.stuNum"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="stuSex">
          <el-radio-group v-model="ruleForm.stuSex">
            <el-radio label="男" value="1"></el-radio>
            <el-radio label="女" value="2"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" required>
          <el-form-item prop="stuBirthday">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.stuBirthday"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ruleForm: {
        imageUrl: "",
        stuNum: "",
        stuName: "",
        stuBirthday: "",
        stuSex: ""
      },
      rules: {
        stuName: [
          { required: true, message: "请输入学生姓名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        stuNum: [
          { required: true, message: "请输入学生学号", trigger: "blur" }
        ],
        stuBirthday: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        stuSex: [{ required: true, message: "请选择性别", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var _this = this;
          console.log(_this.ruleForm);
          axios({
            method: "post",
            url: "api/stu/insert",
            data: _this.ruleForm
          })
            .then(res => {
              console.log(res.data);
              _this.tableData = res.data;
              _this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
            })
            .catch(function(error) {
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log("Error", error.message);
              }
              console.log(error.config);

              _this.$message({
                showClose: true,
                message: "添加失败",
                type: "error"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      alert(this.ruleForm.imageUrl);
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
      alert(this.ruleForm.imageUrl);
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.$message.error("OK!");
      return isJPG && isLt2M;
    }
  }
};
</script>

<style>
</style>
