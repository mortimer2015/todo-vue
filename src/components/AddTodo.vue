<template>
    <div>
        <span>2333333</span>
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
export default {
    name: 'AddTodo',
    props: {
        dialogVisible: Boolean(false)
    }
    // data() {
    //     return {
    //         dialogVisible: true
    //     }
        
    // }
}
</script>
