<template>
    <el-row type="flex" justify="center">
        <el-col :span="12">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="头像" prop="avatar">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="用户名" prop="uname">
                    <el-input v-model="ruleForm.uname"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd1">
                    <el-input placeholder="请输入密码" v-model="ruleForm.pwd1" show-password autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="pwd2">
                    <el-input placeholder="请再次输入密码" v-model="ruleForm.pwd2" show-password autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="生日" required>
                    <el-form-item prop="birthday">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="ruleForm.sex">
                        <el-radio label="男" value="1"></el-radio>
                        <el-radio label="女" value="2"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="个人简介" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="密保问题" prop="question">
                    <el-select v-model="ruleForm.question" placeholder="请选择密保问题">
                        <el-option label="你的爱人的名字?" value="1"></el-option>
                        <el-option label="你的儿时玩伴的名字?" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密保答案" prop="answer">
                    <el-input v-model="ruleForm.answer"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
                    <el-button @click="resetForm('ruleForm')">清空</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.pwd2 !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pwd1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          imageUrl: '',
          uname: '',
          pwd1:'',
          pwd2:'',
          birthday: '',
          sex: '',
          desc: '',
          question:'',
          answer:''
        },
        rules: {
          uname: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
          pwd1: [
            { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
            { validator: validatePass}
          ],
          pwd2: [
            { required: true, message: '请再次输入用户密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
            { validator: validatePass2}
          ],
          birthday: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写个人简介', trigger: 'blur' }
          ],
          question: [
            { required: true, message: '请选择密保问题', trigger: 'change' }
          ],
          answer: [
            { required: true, message: '请填写密保问题答案', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file) {
        alert(this.ruleForm.imageUrl)
        this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
        alert(this.ruleForm.imageUrl);
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
          this.$message.error('OK!');
        return isJPG && isLt2M;
      }
    
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
