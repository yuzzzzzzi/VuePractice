<template>
    <el-row type="flex" justify="center">
        <el-col :span="12">
            <div>
                <p>用户名：{{user.uname}}</p>
                <p>性别：{{sexDesc}}</p>
                <p>简介：{{user.desc}}</p>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            user:{
                uname: '',
                desc:'',
                sex:0
            }
        }
    },
    computed:{
        sexDesc(){
            if(this.user.sex=="1")
                return "男";
            else{
                return "女";
            }    
        }
        
    },
    methods: {
        getUser(){
            var _this=this;
           
            axios.get("http://localhost:4000/getuser")
            .then( res=> {
                console.log(res);
                _this.user = res.data;
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
        }
    },
    mounted() {
      this.getUser(); 
    },
}
</script>

<style>

</style>
