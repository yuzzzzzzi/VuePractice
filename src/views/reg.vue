<template>
    <div>
        账号：<el-input v-model="SysUsers.usrName"></el-input>
        密码：<el-input show-password v-model="SysUsers.usrPwd"></el-input>
        确认密码：<el-input show-password v-model="SysUsers.usrRePwd"></el-input>
        <el-button type="primary" @click="reg">注册</el-button>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            SysUsers: {
                usrName: "",
                usrPwd: "",
                usrRePwd:""
            },
        }
    },
    methods:{
        reg(){
            //判断表单都不为空
            //账号长度在3-16之间
            //密码长度在3-16之间
            //密码和确认密码相同
            //账号不能重复
            if(!this.SysUsers.usrName&&!this.SysUsers.usrPwd&&!this.SysUsers.usrRePwd){
                alert("表单不能用空项！");
                return false;
            }
            if(this.SysUsers.usrPwd!=this.SysUsers.usrRePwd){
                alert("密码与确认密码不一致！");
                return false;
            }
            axios.get("/api/user/exists/"+this.SysUsers.usrName)
            .then(res=>{
                if(res.data){
                    alert("用户名已存在");
                }
                else{
                    axios({
                        method: "post",
                        url: "/api/user",
                        data: this.SysUsers
                    })
                    .then(res=>{
                        if(res){
                            console.log(res);
                        }
                    });
                }
            });
        }  
    }
}
</script>

<style>

</style>
