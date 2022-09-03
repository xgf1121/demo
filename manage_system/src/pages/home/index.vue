<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px">
        <el-card shadow="hover">
          <div class="user">
              <img :src="userImg" />
              <div class="userinfo">
                <p class="name">Admin</p>
                <p class="access">超级管理员</p>
              </div>
          </div>
          <div class="login-info">
            <p>上次登录的时间：<span>2022-7-19</span></p>
            <p>上次登录的地点：<span>北京</span></p>
          </div>
        </el-card>
        <el-card style="margin-top:20px; height:400px">
          <el-table :data="tableData">
            <el-table-column v-for="(val,key) in tableLabel" 
              :key="key" 
              :prop="key" 
              :label="val">
            </el-table-column>
          </el-table>
        </el-card>
    </el-col>
    <el-col style="margin-top:20px" :span="16">
      <div class="num">
        <el-card style="height:80px" v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background : item.color}"></i>
          <div class="detail">
            <p class="num1">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
        <el-card style="height:280px">
          <!-- <div style="height:280px;"  ref="echarts">
          </div> -->
          <echart  :chartData="charData.order" style="height:280px" ></echart>
        </el-card>
        <div class="graph"> 
          <el-card style="height:260px">
            <!-- <div style="height:240px;width:100%" ref="userEcharts"></div> -->
            <echart  :chartData="charData.user" style="height:240px;width:100%" ></echart>
          </el-card>
          <el-card style="height:260px">
            <!-- <div style="height:240px" ref="videoEcharts"></div> -->
            <echart :chartData="charData.video"  style="height:240px;width:100%" ></echart>
          </el-card> 
        </div>
    </el-col>
  </el-row>
</template>

<script>
import { getDate } from '@/api/data.js'
// import * as echarts from 'echarts'
import Echart from '../../components/Echarts.vue'
export default {
  name:"home",
  components:{Echart},
  data() {
    return {
      userImg:require('../../assets/user/user.png'),
      tableData: [],
      tableLabel:{
        name:'课程',
        todayBuy:'今日购买',
        monthBuy:'本月购买',
        totalBuy:'总购买'
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      charData:{
        order:{
          xData:[],
          series:[]
        },
        user:{
          xData:[],
          series:[]
        },
        video:{
          series:[]
        }
      }
    }
  },
  mounted() {
    //获取mock数据
    getDate().then( res => {
      // console.log(res);
      const {code,data} = res.data
      if(code === 20000) {
        this.tableData = data.tableData
        const order = data.orderData
        //x坐标数据
        const xDate = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach((key) => {
          series.push({
            name:key,
            data:order.data.map(item => item[key]),
            type:'line'
          })
        })
        //折线图
        // console.log(xDate);
        this.charData.order.xData = xDate
        // console.log(series);
        this.charData.order.series = series
        //用户图
        //获取X轴日期数据
        this.charData.user.xData = data.userData.map(item => item.date),
          console.log(data.userData);
        this.charData.user.series =  {
              name:'新增用户',
              data:data.userData.map(item => item.new),
              type:"bar"
            },
            {
              name:'活跃用户',
              data:data.userData.map(item => item.active),
              type:'bar'
            }
        // const U =  echarts.init(this.$refs.userEcharts)
        // U.setOption(userOprion)
        //饼图
        this.charData.video.series = [
          {
            data:data.videoData,
            type:'pie'
          }
        ]
      }
    })
  }
}
</script>

<style  lang="less" scoped>
  @import '@/assets/css/home.less';
</style>