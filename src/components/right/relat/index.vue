<template>
  <div class="aside-relatNotes" id="relatNotes" v-if="data">
    <div class="aside-relatNotes-header">
      <span class="aside-relatNotes-title">
        <i class="el-icon-files"></i>
        <span>{{ title }}</span>
      </span>
      <!-- <span class="aside-relatNotes-more">
            <span>更多</span>
            <i class="el-icon-arrow-right"></i>
        </span> -->
    </div>
    <div class="aside-relatNotes-main">
      <div class="aside-relatNotes-list">
        <span
          class="aside-relatNotes-item"
          v-for="(item, index) in data.slice(0, 6)"
          :key="index"
        >
          <div class="entry-title">{{ item?.title }}</div>
          <div class="entry-meta-box">
            <div class="entry-meta">19点赞</div>
            <div class="entry-meta">&nbsp;·&nbsp;</div>
            <div class="entry-meta">{{ item?.count }}评论</div>
            <div class="entry-meta">&nbsp;·&nbsp;</div>
            <div class="entry-meta">{{ item?.count }}收藏</div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Array },
    title: { type: String, default: "相关笔记" },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.aside-relatNotes {
  // height: 475px;
  border-radius: 6px;
  border: 1px solid @levelThree-border-color;
  margin-bottom: 20px;
  background-color: #fff;

  .aside-relatNotes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid @levelOne-border-color;
    padding: 0 10px;

    .aside-relatNotes-title {
      display: flex;
      align-content: center;
      padding: 10px;
      line-height: 18px;

      i {
        font-size: 20px;
        margin-right: 10px;
      }

      span {
        font-size: 16px;
        font-weight: 600;
        color: @main-text-color;
      }
    }

    .aside-relatNotes-more {
      display: flex;
      align-items: center;
      color: @minor-text-color;
      font-size: 14px;
      cursor: pointer;

      i {
        font-size: 14px;
      }
    }
  }

  .aside-relatNotes-main {
    padding: 10px 18px;

    .aside-relatNotes-list {
      display: flex;
      align-content: center;
      flex-wrap: wrap;

      .aside-relatNotes-item {
        width: 100%;
        padding: 10px 0;
        cursor: pointer;

        .entry-title {
          line-height: 22px;
          font-size: 16px;
          font-weight: 400;
          color: #252933;
          overflow: hidden;
          white-space: normal;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;

          &:hover {
            color: @primary-color;
          }
        }

        .entry-meta-box {
          margin-top: 4px;

          .entry-meta {
            display: inline-block;
            font-size: 14px;
            line-height: 22px;
            color: #8a919f;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>