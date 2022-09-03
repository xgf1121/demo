<template>
  <!-- //这里使用element ui中的组件 因此需要完全了解需要去看element的文档 -->
  <el-form 
  :model="form"
  status-icon
  :rules="rules"
  ref="form"
  label-width="100px"
  class="login-container"
  >
  <h3 class="login_title">系统登陆</h3>
    <el-form-item 
    label="用户名"
    label-width="80px"
    prop="username"
    class="username"
    >
    <el-input
      type="input"
      v-model="form.username"
      auto-complete="off"
      placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码"
    label-width="80px"
    prop="password"
    class="password">
      <el-input
      type="password"
      v-model="form.password"
      auto-complete="off"
      placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit">登陆</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import { getMenu } from '@/api/data' 
export default{
  name:'login',
  data() {
    return {
      form:{},
      rules:{
        username:[
          { required: true, message:'请输入用户名', trigger: 'blur' },
          {
            min:3,
            message:"用户名长度不能小于三位",
            trigger: 'blur'
          }
        ],
        password:[
          {required: true, message:'请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    login(){
      getMenu(this.form).then(({ data:res })=>{
        console.log(res,'res')
        if(res.code === 20000){
          //当受到服务器返回的数据之后 对这些数据进行一些列的处理 数据实际处理的地方在vuex中
          this.$store.commit('clearMenu')//删除原来的也就是上一个的数据 如果有的话 简单来说这里是为了去除上一个登入人的信息
          this.$store.commit('setMenu', res.data.menu)//把服务器中的应该属于这个用户的权限给他 有关这个用户的一些信息 
          this.$store.commit('setToken', res.data.token)//把服务器中应该属于这个用户的token给他
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        }else{
          this.$message.warning(res.data.message)
        }
      })
      // 通过mock模拟
      //const token= Mock.random.guid()
      //this.$store.commit('setToken'.token)
      // this.$router.push({ name:'home' })
    }
  }
}
</script>
<style lang="less" scoped>
.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: white;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_submit{
  margin: 10px auto 0px auto;
}
</style>