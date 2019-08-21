<template>
    <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <el-table :data="tableData">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="操作">
                <el-button type="text">修改</el-button>
                <el-button class="table-del-btn" type="text">删除</el-button>
            </el-table-column>
        </el-table>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>



<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AddTodo from '@/components/AddTodo.vue'
export default {
    name: 'test',
    data() {
        return {
            msg: '2333',
            dialogVisible: false,
            tableData: [
            {
                "status": "run",
                'id': 1
            },
            {
                'status': 'end',
                'id': 2
            }
            ]
        }
    },
    components: {
    AddTodo,
    HelloWorld
    }
}
</script>
