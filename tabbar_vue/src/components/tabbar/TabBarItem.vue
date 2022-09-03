<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- <img src="@/assets/img/tabbar/home.png">
    <div>首页</div> -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active" />
    </div>
    <div :style="activeStyle">
      <slot name="item-text" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "#ff1515"
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 30px;
  height: 30px;
  margin-top: 5px;
}
.tab-bar-item div {
  margin-top: -5px;
}
</style>
