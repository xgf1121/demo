<template>
  <div class="manage">
    <el-dialog
      :title="operatetype === 'add' ? '新增用户' : '更新用户'"
      :visible.sync='isShow'
    >
      <common-form 
        :formLabel="operateFormLabel" 
        :form="operateForm" 
        :inline="true"
        ref="form"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <common-form  
        :formLabel="formLabel" 
        :form="searchForm" 
        :inline="true" ref="form"
        >
        <el-button type="primary" @click="getList">搜索</el-button>
      </common-form>
    </div>
    <common-table 
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="ediUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm.vue'
import CommonTable from '@/components/CommonTable.vue'
import {getUser} from '@/api/data'
import { Message } from 'element-ui'
export default {
  components: { CommonForm , CommonTable},
  name:'User',
  data () {
    return {
      operatetype:'',
      isShow:false,
      operateFormLabel:[
        {
          model:'name',
          label:'姓名',
          type:'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
        ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm:{
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:''
      },
      operateInline:true,
      formLabel:[
        {
          model:"keyword",
          label:'',
          type:'input'
        }
      ],
      searchForm:{
        keyword:''
      },
      tableData:[],
      tableLabel:[
        {
          prop:'name',
          label:'姓名'
        },
        {
          prop:'age',
          label:'年龄'
        },
        {
          prop:'sexLable',
          label:'性别'
        },
        {
          prop:'birth',
          label:'出生日期',
          width:200
        },
        {
          prop:'addr',
          label:'地址',
          width:320
        }
      ],
      config:{
        page:1,
        total:20
      }
    }
  },
  methods: {
    confirm() {
      if(this.operatetype === 'edit') {
        this.$http.post('/user/edit',this.operateForm).then(res => {
          // console.log(res);
          this.isShow = false
          this.getList()
        })
      }else{
        this.$http.post('/user/add',this.operateForm).then(res => {
          // console.log(res);
          this.isShow = false
          this.getList()
        })
      } 
    },
    addUser() {
      this.isShow = true
      this.operatetype = 'add'
      this.operateForm = {
        name:'',
        addr:'',
        age:'',
        birth:'',
        sex:''
      }
    },
    //获取列表数据
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page:this.config.page,
        name
      }).then(({data:res}) => {
        // console.log("sd",res);
        this.tableData = res.list.map(item => {
          item.sexLable = item.sex === 0 ? '女' : "男"
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })
    },
    //编辑
    ediUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      //之前表格里面已经有的数据通过json反回去 生成表单应有的格式
      this.operateForm = JSON.parse(JSON.stringify(row))
      this.getList();
    },
    //删除
    delUser(row) {
      // 使用$confirm来完成二次弹窗的确认工作
      this.$confirm("此操作将永久删除该文件，是否继续？","提示",{
        confirmButtonText:"确认",
        cancelButtonText:"取消",
        type:"warning",
      }).then(() => { //在这里可以调接口
      // console.log(row);
        const id = row.id
        this.$http.get("user/del",{
          params:{ id }
        }).then(() => {
          // 消息提示框
          this.$message({
            type:"success",
            message:"删除成功"
          })
          this.getList()
          // console.log("22");
        })
      }).catch(() => {
        this.$message({
          type:"info",
          message:"已取消删除"
        })
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.manage{
    height: 90%;
    padding-bottom: 20px;
    overflow: hidden;
    &header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
  }
</style>