<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="" />
      <img slot="item-icon-active" src="~assets/img/tabbar/home-active.png" alt="" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/class" activeCollor="red">
      <img slot="item-icon" src="~assets/img/tabbar/class.png" alt="" />
      <img slot="item-icon-active" src="~assets/img/tabbar/class-active.png" alt="" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/collect" activeCollor="red">
      <img slot="item-icon" src="~assets/img/tabbar/shopping-cart.png" alt="" />
      <img slot="item-icon-active" src="~assets/img/tabbar/shopping-cart-active.png" alt="" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/personal" activeCollor="red">
      <img slot="item-icon" src="~assets/img/tabbar/personal.png" alt="" />
      <img slot="item-icon-active" src="~assets/img/tabbar/personal-active.png" alt="" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/tabbar/TabBar";
import TabBarItem from "components/tabbar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>
<style lang="scss">
  
</style>