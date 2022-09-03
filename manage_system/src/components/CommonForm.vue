<template>
  <div>
    <el-form ref="form" label-width="100px" :model="form" :inline="inline">
      <el-form-item v-for="item in formLabel" :key="item.label" :label="item.label">
        <el-input
          v-if="item.type === 'input'"
          :placeholder="'请输入' + item.label"
          v-model="form[item.model]"
        ></el-input>
        <el-switch v-if="item.type === 'switch'"  v-model="form[item.model]"></el-switch>
        <el-date-picker
          v-if="item.type === 'date'"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="form[item.model]"
        ></el-date-picker>
        <el-select
          v-if="item.type === 'select'"
          placeholder="请选择"
          v-model="form[item.model]"
        >
          <el-option
            v-for="item in item.opts" 
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        
      </el-form-item>
      <el-form-item>
        <!-- 预留一个插槽也同时是使用的列表组件的方式 也就是插入的内容也算列表组件里 -->
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'CommonForm',
  props:{
    formLabel:Array, //这个formLabe这个form表单里面各个输入框的头部和中间提示的文字装的数组
    form: Object, //这个form看到上面的绑定的model内 就是最终接收数据的对象 这里使用了对象的特殊赋值方式 
    inline:Boolean  //使用的Vue里面的一个指令:inline 内联样式 
  },
  data() {
    return {
      
    }
  },

}
</script>
<style lang="less" scoped>
  
</style>