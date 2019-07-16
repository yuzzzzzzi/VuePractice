<template>
    <div id="app">
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">
            <router-link to="/login">登陆</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/register">注册</router-link>
        </el-menu-item>
        <el-submenu index="3">
          <template slot="title">TEST</template>
          <el-menu-item index="2-1"><router-link to="/add">add</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/user">user</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/users">users</router-link></el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">
               
            </template>
            <el-menu-item index="2-4-1"><router-link to="/gettime">gettime</router-link></el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="4" disabled>消息中心</el-menu-item>
      </el-menu>
      
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view style="margin-top:1rem"></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    components: {},
    data() {
        return {
            activeIndex: '1',
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
