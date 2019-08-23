<template>    
<el-container>
    <el-header>
        <!-- <el-row class="container"> -->
        <!-- <h1>222</h1> -->
        <router-link to="/home">
            <img height="60" width="60" src="../assets/logo.png">
        </router-link>
        <!-- <h1>23444444444444444433</h1> -->
    </el-header>
    <el-container>
        <el-aside width="220px">
            <el-menu router 
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/home">Home</el-menu-item>
            <el-menu-item index="/todo">TODO</el-menu-item>
            <el-menu-item index="/test">test</el-menu-item>
            <el-menu-item index="/about">About</el-menu-item>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>天气情况</template>
                <el-menu-item index="/weather/hot">热热热</el-menu-item>
                <el-menu-item index="/weather/cold">冷冷冷</el-menu-item>
            </el-submenu>

            </el-menu>
        </el-aside>
        <el-container>
        <el-main>
            <router-view/>
        </el-main>
        </el-container>
    </el-container>
</el-container>
</template>

<script>
export default {
    methods: {
    handleOpen() {

    },
    handleClose() {

    },
  },
  computed: {
    
  }
}
</script>


<style>
.el-header {
    background-color: #545c64;
}

.el-aside {
    top: 1px;
    left: 1px;
    display: block;
    position: relative;
    overflow-y: scroll;
    background-color: #545c64 !important;
}
</style>