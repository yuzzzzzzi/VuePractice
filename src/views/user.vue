<template>
    <el-row style="margin:0 auto">
        <el-col :span="12" type="flex" justify="center">
            <el-card :body-style="{ padding: '0px' }">
                <el-col :span="10">
                    <div class="block"><el-avatar :size="200" :src="user.stuUrl" style="background-color:transparent"></el-avatar></div>
                    <!-- <img :src="'http://localhost:4000/'+user.stuUrl" class="image"> -->
                </el-col>
                <el-col :span="12">
                    <div style="padding: 14px;text-align:left">
                        <div v-for="(item,key,index) in user" :key="index" class="text item">
                            <el-col :span="6">{{key}}</el-col>
                            <el-col :span="12">{{item}}</el-col>
                            <div style="clear:both"></div>
                        </div>
                        <div class="bottom clearfix">
                            <el-button type="text" class="button">操作按钮</el-button>
                        </div>
                    </div>
                </el-col>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            user:{}
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
            axios.get("/api/stu/get/"+_this.$route.params.id)
            .then( res=> {
                console.log(res);
                _this.user = res.data;
                _this.user.stuUrl = "/api/"+_this.user.stuUrl ;
                console.log(_this.user);
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
                    message: '获取失败',
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
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>