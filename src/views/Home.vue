<template>    
<el-container>
    <el-header>
        <Vheader/>
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
            <!-- <el-menu-item index="/login">登录</el-menu-item> -->

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
import Vheader from '../components/Header.vue'

export default {
    methods: {
    handleOpen() {

    },
    handleClose() {

    },
    logout() {
            this.axios.get("/auth/logout").then((response) =>{
                console.log(response.data)
                // this.getData()
                this.$message({message: "退出登录",type: 'success',showClose: true,})
                this.$router.push("/login")
            })
        }
  },
  computed: {
    
  },
    components: {Vheader}
}
</script>


<style>
.el-header {
    background-color: #505255;
}
.el-header .frr {
    float: right;
}
.el-header .bigtext {
    font-size:14px
}

.el-aside {
    top: 0px;
    left: 0px;
    /* display: block; */
    position: relative;
    /* overflow-y: scroll; */
    background-color: #545c64 !important;
}
</style>