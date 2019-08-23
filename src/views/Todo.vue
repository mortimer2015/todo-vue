<template>
    <div>
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <el-form :inline="true" :model="form">
            <el-form-item label="名称">
                <el-input v-model="form.id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-button @click="pushData">新增</el-button>
        </el-form>
        
        <el-table :data="tableData">
            <el-table-column prop="i" label="ID"></el-table-column>
            <el-table-column prop="id" label="名称"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="showEdit(scope.row)">修改</el-button>
                    <el-button class="el-delete-button" @click="deleteOne(scope.row.i)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <el-form :model="form1">
                
                <el-form-item label="名称" :inline="true">
                    <el-input v-model="form1.id" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form1.status" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="editOne" type="primary">修改</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
        </el-dialog>
    </div>
</template>



<script>
// import { constants } from 'crypto';
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import AddTodo from '@/components/AddTodo.vue'
export default {
    name: 'test',
    data() {
        return {
            msg: '2333',
            dialogVisible: false,
            tableData: [],
            form: {
                id: ""
            },
            form1: {
                i: "",
                id: "",
                status: ""
            }
        }
    },
    components: {
    // AddTodo,
    // HelloWorld
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.axios.get("/todo/list").then((response) => {
            console.log(response.data)
            this.tableData = response.data.data
            })
        },
        pushData() {
            this.axios.post("/todo/add", {
                id: this.form.id,
                status: "wait"
            }).then((response) =>{
                console.log(response.data)
                this.getData()
            })
            this.$message({message: "添加成功",type: 'success',showClose: true,})
            // this.tableData.push({id:this.form.id, status:'wait'})
            
        },
        deleteOne(i) {
            this.axios.post("/todo/delete", {i: i}).then((response) => {
                console.log(response.data)
                this.getData()
            })
            // for (var i in this.tableData) {
            //     if (this.tableData[i].id === id) {
            //         this.tableData.splice(i, 1)
            //     }
            // }
        },
        showEdit(row) {
            this.form1.i = row.i
            this.form1.id = row.id
            this.form1.status = row.status
            this.dialogVisible = true
            console.log(this.form1)
            console.log(this.dialogVisible)
        },
        editOne() {
            // for (var i in this.tableData) {
            //     if (this.tableData[i].id === this.form1.id) {
            //         this.tableData[i].status = this.form1.status
                    
            //     }
            // }
            this.axios.post("/todo/edit", {
                i: this.form1.i,
                id: this.form1.id,
                status: this.form1.status
            }).then((response) => {
                console.log(response.data)
                this.getData()
            })
            this.dialogVisible = false
            // console.log(this.tableData)
        },
        handleClose() {
            this.dialogVisible = false
        }

    }
}
</script>

<style scoped>
.el-delete-button{
    color: red;
}
</style>
