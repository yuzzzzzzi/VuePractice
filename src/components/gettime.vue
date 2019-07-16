<template>
    <div>
        当前时间是:{{ time }}
        <el-button @click="gettime">获取当前时间</el-button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            time: ''
        }
    },
    mounted(){
        this.gettime();
    },
    methods: {
        gettime() {
            var _this = this;
            axios.get('api/user/gettime')
                .then(function(response) {
                    //console.log(response);
                    console.log(_this.time);
                    _this.time = response.data;
                })
                .catch(function(error) {
                    console.log(error);
                })
                .then(function() {

                });
        }
    }
}
</script>

<style>

</style>
