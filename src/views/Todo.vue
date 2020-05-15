<template>
    <div>
        <el-card>
            <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
            <el-form :inline="true" :model="form">
                <el-form-item label="名称">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="数值">
                    <el-input v-model="form.value" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.describe" placeholder="请输入"></el-input>
                </el-form-item>
                <el-button @click="pushData" type="primary">新增</el-button>
            </el-form>
        </el-card>
        <el-card>
            <el-table :data="tableData">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="describe" label="描述"></el-table-column>
                
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showEdit(scope.row)">修改</el-button>
                        <el-button class="el-delete-button" @click="deleteOne(scope.row.id)" type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page=page.page_num
                :page-sizes="[2, 4, 6]"
                :page-size=page.page_size
                layout="total, sizes, prev, pager, next, jumper"
                :total=tableData.total>
            </el-pagination>
        </el-card>
        <el-dialog title="修改" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
            <el-form :model="form1">
                <el-form-item label="名称">
                    <el-input v-model="form1.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="数值">
                    <el-input v-model="form1.value" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form1.describe" placeholder="请输入"></el-input>
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
                id: "",
                name: "",
                value: "",
                describe: ""
            },
            form1: {
                id: "",
                name: "",
                value: "",
                describe: ""
            },
            page: {
                page_size: 2,
                page_num: 1,
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
            this.axios.get("http://localhost:8080/todo/list", {params: {
                page_size: this.page.page_size, 
                page_num:this.page.page_num
                }}).then((response) => {
            console.log(response.data)
            this.tableData = response.data.message
            })
        },
        pushData() {
            this.axios.post("http://localhost:8080/todo/add", {
                value: this.form.value,
                name: this.form.name,
                describe: this.form.describe
            }).then((response) =>{
                console.log(response.data)
                this.getData()
                this.$message({message: "添加成功",type: 'success',showClose: true,})
            })
            
            // this.tableData.push({id:this.form.id, status:'wait'})
            
        },
        deleteOne(i) {
            this.axios.post("http://localhost:8080/todo/delete", {id: i}).then((response) => {
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
            this.form1.id = row.id
            this.form1.name = row.name
            this.form1.value = row.value
            this.form1.describe = row.describe
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
            this.axios.post("http://localhost:8080/todo/edit", {
                id: this.form1.id,
                value: this.form1.value,
                name: this.form1.name,
                describe: this.form1.describe
            }).then((response) => {
                console.log(response.data)
                this.getData()
            })
            this.dialogVisible = false
            // console.log(this.tableData)
        },
        handleClose() {
            this.dialogVisible = false
        },
        handleCurrentChange(val){
            this.page.page_num = val;
            this.getData();
        },
        handleSizeChange(val){
            // let pages = Math.ceil(this.tableData.total / val);
            this.page.page_size = val;
            // if(this.page.page_size > pages ){
            //     this.page.page_size  = 1;
            // }
            this.getData()
        },

    }
}
</script>

<style scoped>
.el-delete-button{
    color: red;
}
.el-pagination {
    float: right;
}


</style>
