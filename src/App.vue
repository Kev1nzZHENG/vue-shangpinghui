<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>

    <!-- 底部：在home、search显示，在login、register隐藏 -->
    <!-- 根据$route.meta.show判断 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted(){
    // 派发一个action||获取商品分类的三级列表的数据
    this.$store.dispatch("home/getCategory");
  }
};
</script>

<style>
</style>
