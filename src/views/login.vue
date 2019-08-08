<template>
    <el-row type="flex" justify="center">
        <el-col :span="12">
            <div>
                <div class="txtInput">
                    <el-input placeholder="请输入账号" v-model="usrName">
                        <template slot="prepend">账号：</template>
                    </el-input>
                </div>
                <div class="txtInput">
                    <el-input placeholder="请输入密码" v-model="usrPwd" show-password>
                        <template slot="prepend">密码：</template>
                    </el-input>
                </div>
                <el-button plain type="primary" @click="btnLogin" size="small">登陆</el-button>
                <el-button plain size="small" @click="btnRegister">注册</el-button>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            usrName: '',
            usrPwd: ''
        }
    },
    methods: {
        btnLogin() {
            var _this = this;
            if (_this.usrName == '') {
                _this.$message({
                    showClose: true,
                    message: '请输入用户名',
                    type: 'warning'
                });
      
            }
            else{
                if(_this.usrPwd==""){
                    _this.$message({
                        showClose: true,
                        message: '密码不能为空',
                        type: 'warning'
                    });
            
                }
            }
            // 发送 POST 请求
            axios({
                method: 'post',
                url: '/api/user/login',
                params: {
                    'usrName': _this.usrName,
                    'usrPwd': _this.usrPwd
                }
            })
            .then(function (response) {
                console.log(response);
                if(response.data.code=="0"){
                    _this.$message({
                        showClose: true,
                        message: '登陆成功',
                        type: 'success'
                    });
        
                    _this.$router.push('/');
                }
                else{
                    _this.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'error'
                    });
                }
                
            })
            .catch(error=>{
                console.log(error);
                _this.$message({
                    showClose: true,
                    message: '登陆失败',
                    type: 'error'
                });
            });
        },
        btnRegister(){
            this.$router.push('/register');
        }
    }
}
</script>

<style>
.txtInput {
    margin: 0.5rem 0;
}
</style>
