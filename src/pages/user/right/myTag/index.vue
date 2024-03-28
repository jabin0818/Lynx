<template>
  <div id="user-tag">
    <div class="user-tag-header">
      <span class="user-tag-title">
        <!-- <i class=""></i> -->

        <span class="text">关注标签</span>
        <span class="num"
          >&#40;{{ this.myTag.length ? this.myTag.length : "0" }}&#41;</span
        >
      </span>
      <span class="user-tag-more" @click="toTag">
        <span>查看</span>
        <i class="el-icon-arrow-right"></i>
      </span>
    </div>
    <div class="user-tag-main">
      <div class="user-tag-list">
        <span class="user-tag-item" v-for="item in myTag" :key="item.id">{{
          item.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { selectTags } from "@/api/tag.js";
export default {
  name: "MyTag",
  data() {
    return {
      myTag: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    toTag() {
      this.$router.push({
        path: "/tags/my",
      });
    },
    async getData(name) {
      let res = await selectTags(name, this.userInfo.id);
      if (res.code === 200) {
        this.myTag = res.data.filter((item) => {
          return item.isSelect === 1;
        });
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
#user-tag {
  border-radius: 4px;
  margin-top: 10px;
  background-color: #fff;

  .user-tag-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    border-bottom: 1px solid #f6f6f6;

    .user-tag-title {
      display: flex;
      align-items: center;

      .text {
        font-size: 14px;
        font-weight: 600;
        color: @main-text-color;
      }

      .num {
        color: @minor-text-color;
        font-size: 12px;
        font-weight: 400;
      }
    }

    .user-tag-more {
      display: flex;
      align-items: center;
      color: @minor-text-color;
      font-size: 12px;
      cursor: pointer;

      i {
        font-size: 12px;
      }
    }
  }

  .user-tag-main {
    padding: 10px 18px;

    .user-tag-list {
      display: flex;
      align-content: center;
      flex-wrap: wrap;

      .user-tag-item {
        padding: 4px 8px;
        background-color: rgba(66, 129, 255, 0.1);
        color: @primary-color;
        border-radius: 4px;
        font-size: 16px;
        margin: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>