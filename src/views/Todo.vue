<template>
    <div>
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <el-form :inline="true" :model="form">
            <el-form-item label="名称">
                <el-input v-model="form.id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-button @click="pushData">新增</el-button>
        </el-form>
        
        <el-table :data="tableData.list">
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
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page=page.page_num
            :page-sizes="[2, 4, 6]"
            :page-size=page.page_size
            layout="total, sizes, prev, pager, next, jumper"
            :total=tableData.total>
        </el-pagination>

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
            this.axios.get("/todo/list", {params: {
                page_size: this.page.page_size, 
                page_num:this.page.page_num
                }}).then((response) => {
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
                this.$message({message: "添加成功",type: 'success',showClose: true,})
            })
            
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
