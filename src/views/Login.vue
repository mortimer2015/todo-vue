<template>
    <div>
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <el-form :inline="true" :model="form">
            <el-form-item label="名称">
                <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-button @click="login">登录</el-button>
            <!-- <el-button @click="login">退出登录</el-button> -->
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                name: ""
            }
        }
    },
    methods: {
        login() {
            // this.axios.post("/auth/login", {
            //     user_name: this.form.name,
            // }).then((response) =>{
            //     console.log(response.data)
            //     // this.getData()
            //     this.$router.push("/home")
            //     this.$message({message: "登录成功",type: 'success',showClose: true,})
            // })
            localStorage.name = this.form.name;
            this.$router.push("/home")
            this.$message({message: "登录成功",type: 'success',showClose: true,})
        },
        
    }
}
</script>
