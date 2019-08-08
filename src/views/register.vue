<template>
    <el-row type="flex" justify="center">
        <el-col :span="12">
            <el-form :model="user" status-icon :rules="rules" ref="user" label-width="100px" class="demo-user">
                <el-form-item label="头像" prop="usrAvatar">
                  <el-upload
                    class="avatar-uploader"
                    action="api/stu/fileUpload"
                    ref="upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleAvatarError"
                    :before-upload="beforeAvatarUpload"
                    :auto-upload="false"
                    :on-change="handleAvatarChange"
                  >
                    <el-avatar v-if="imageUrl"  shape="square" :fit="cover" :src="imageUrl"  class="avatar"></el-avatar>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="用户名" prop="usrName">
                    <el-input v-model="user.usrName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="usrPwd">
                    <el-input placeholder="请输入密码" v-model="user.usrPwd" show-password autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="usrPwd2">
                    <el-input placeholder="请再次输入密码" v-model="user.usrPwd2" show-password autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="usrRealname">
                    <el-input v-model="user.usrRealname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="usrTel">
                    <el-input placeholder="请输入手机号" v-model="user.usrTel" show-password autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('user')">立即注册</el-button>
                    <el-button @click="resetForm('user')">清空</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
import axios from "axios";

export default {
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.usrPwd !== '') {
            this.$refs.user.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.usrPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        imageUrl: '',
        user: {
          usrName: '',
          usrPwd:'',
          usrPwd2:'',
          usrRealname: '',
          usrTel: '',
          usrAvatar:''
        },
        rules: {
          usrName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          usrPwd: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
            { validator: validatePass}
          ],
          usrPwd2: [
            { required: true, message: '请再次输入用户密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
            { validator: validatePass2}
          ],
          usrRealname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          usrTel:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 6, max: 11, message: '长度在 3 到 20 个字符', trigger: 'blur' },
            // { type: 'number', message: '手机号必须为数字值'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var _this = this;
          //console.log(_this.user);
          var file = this.$refs.upload._data.uploadFiles[0]
          console.log(this.user);
          axios({
            method: "post",
            url: "/api/user/register",
            data: {
              user:this.user,
              file:file
            },
            // params:{
            //   file:file
            // }
          })
          .then(res => {
            console.log(res.data);
            _this.tableData = res.data;
            if(res.data.code=="0"){
                _this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success"
              });
              _this.$router.push('/');
            }else{
              _this.$message({
                showClose: true,
                message: res.data.msg,
                type: "success"
              });
            }
            
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
              message: "注册失败",
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
    handleAvatarSuccess(res) {
      var _this = this;
      _this.user.usrAvatar = res;
      console.log(res);

    },
    handleAvatarError(error) {
      console.log(error);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === ('image/jpeg'||'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarChange(file){
      var _this = this;
      _this.imageUrl = URL.createObjectURL(file.raw);
      console.log(_this.imageUrl);
    },
  }
}
</script>

<style>
  .txtInput {
      margin: 0.5rem 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
