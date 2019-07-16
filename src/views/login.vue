<template>
    <el-row type="flex" justify="center">
        <el-col :span="12">
            <div>
                <div class="txtInput">
                    <el-input placeholder="请输入账号" v-model="uname">
                        <template slot="prepend">账号：</template>
                    </el-input>
                </div>
                <div class="txtInput">
                    <el-input placeholder="请输入密码" v-model="pwd" show-password>
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
            uname: '',
            pwd: ''
        }
    },
    methods: {
        btnLogin() {
            var _this = this;
            if (_this.uname == '') {
                _this.$message({
                    showClose: true,
                    message: '请输入用户名',
                    type: 'warning'
                });
      
            }
            else{
                if(_this.pwd==""){
                    _this.$message({
                        showClose: true,
                        message: '密码不能为空',
                        type: 'warning'
                    });
            
                }
            }
            console.log(_this.uname+_this.pwd)
            // 发送 POST 请求
            axios({
                method: 'post',
                url: 'http://localhost:4000/login',
                params: {
                    'uname': _this.uname,
                    'pwd': _this.pwd
                }
            })
            .then(function (response) {
                console.log(response);
                if(response.data){
                    _this.$message({
                        showClose: true,
                        message: '登陆成功',
                        type: 'success'
                    });
                }
                else{
                    _this.$message({
                        showClose: true,
                        message: '登陆失败',
                        type: 'error'
                    });
                }
                
            })
            .catch(function (error) {
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
                console.log('Error', error.message);
                }
                console.log(error.config);
                
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
