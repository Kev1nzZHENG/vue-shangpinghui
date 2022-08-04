<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托| 事件委派 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
                @click="goSearch"
              >
                <h3 @mouseenter="enterIndex(index)">
                  <a
                    href="#"
                    @click.prevent
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div class="item-list clearfix" v-show="currentIndex == index">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          href="#"
                          @click.prevent
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            href="#"
                            @click.prevent
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // 节流
    enterIndex: throttle(function (index) {
      // index鼠标移动到某个一级分类位置的索引值
      this.currentIndex = index;
    }, 50),
    // 一级分类鼠标移出事件的回调
    enterShow() {
      // 当鼠标移入的时候，让商品分类列表进行展示
      this.show = true;
    },
    leaveShow() {
      // 鼠标移出currentIndex变为-1
      this.currentIndex = -1;
      if (this.$route.name != "home") {
        this.show = false;
      }
    },
    goSearch(event) {
      // 获取当前触发这个事件的节点
      let element = event.target;
      // console.log(element);

      // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理参数
        // 如果路由跳转的时候，带有params参数，传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
  },
  mounted() {
    // 当路径不为/home时，全部商品分类不展示
    if (this.$route.name != "home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画样式
    // 过渡开始状态(进入)
    .sort-enter,
    .sort-leave-to {
      height: 0px;
    }
    // 过渡结束状态(进入)
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    // 定义进入动画时间、速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.15s linear;
    }
  }
}
</style>
