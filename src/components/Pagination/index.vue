<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="previousPage">上一页</button>
    <button v-if="startAndEnd.start > 1" @click="firstPage">1</button>
    <button v-if="startAndEnd.start > 2">...</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startEndFilter"
      :key="index"
      @click="sendPage(page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="startAndEnd.end < totalPage"
      @click="lastPage"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="nextPage">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    //总共页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页面的起始数字与结束数字
    startAndEnd() {
      //解构赋值
      const { continues, pageNo, totalPage } = this;
      // 先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0;
      // 正常现象：连续页码5， 不正常现象：总页数没有连续页面数多

      // 不正常现象
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
      }
      // 把start出现 0 | 负数 纠正
      if (start < 1) {
        start = 1;
        end = continues;
      }
      // 把 end 大于  总页码 情况 纠正
      if (end > totalPage) {
        end = totalPage;
        start = end - continues + 1;
      }
      return { start, end };
    },
    // 过滤连续页面v-for不满足的数字
    startEndFilter() {
      const { start, end } = this.startAndEnd;
      let arr = [];
      for (let i = 1; i <= end; i++) {
        if (i >= start) {
          arr.push(i);
        }
      }
      return arr;
    },
  },
  methods: {
    previousPage() {
      this.$emit("getPageNo", this.pageNo - 1);
    },
    firstPage() {
      this.$emit("getPageNo", 1);
    },
    lastPage() {
      this.$emit("getPageNo", this.totalPage);
    },
    nextPage() {
      this.$emit("getPageNo", this.pageNo + 1);
    },
    sendPage(page) {
      this.$emit("getPageNo", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>