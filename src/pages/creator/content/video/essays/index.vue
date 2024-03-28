<template>
  <div id="content-video">
    <div class="filter-wrap">
      <span
        class="filter-item"
        :class="{ 'active-type': type === 'all' }"
        @click="videoFilter('all')"
      >
        <span>全部</span>
        <span class="total">(2)</span>
      </span>
      <span
        class="filter-item"
        :class="{ 'active-type': type === 'published' }"
        @click="videoFilter('published')"
      >
        <span>已发布</span>
        <span class="total">(2)</span>
      </span>
      <span
        class="filter-item"
        :class="{ 'active-type': type === 'inReview' }"
        @click="videoFilter('inReview')"
      >
        <span>审核中</span>
        <span class="total">(2)</span>
      </span>
      <span
        class="filter-item"
        :class="{ 'active-type': type === 'notPass' }"
        @click="videoFilter('notPass')"
      >
        <span>未通过</span>
        <span class="total">(2)</span>
      </span>
    </div>
    <div class="video-container">
      <div class="video-list">
        <div class="video-item">
          <div class="first-line">
            <!-- <a class="tag audit-fail">未通过</a> -->
            <a class="tag audit-success">已通过</a>
            <!-- <a class="tag audit-wait">审核中</a> -->
            <span class="title">标题测试</span>
            <div class="byte-dropdown">
              <el-popover placement="bottom" width="40" trigger="hover">
                <ul class="actions-info-more">
                  <li>
                    <i class="el-icon-edit"></i>
                    <span>编辑</span>
                  </li>
                  <li>
                    <i class="el-icon-delete"></i>
                    <span>删除</span>
                  </li>
                </ul>
                <!-- <el-button >click 激活</el-button> -->
                <span slot="reference">
                  <i class="el-icon-more"></i>
                </span>
              </el-popover>
            </div>
          </div>
          <div class="infos">
            <div class="infos-left">
              <span class="like">
                <i class="iconfont icon-good"></i>
                <span>0</span>
              </span>
              <span class="star">
                <i class="el-icon-star-off"></i>
                <span>0</span>
              </span>
            </div>
            <div class="infos-right">
              <span class="time">2022-1-2 10:11</span>
            </div>
            <!-- <span class="split-line"></span> -->
          </div>
        </div>
        <div class="video-item">
          <div class="first-line">
            <!-- <a class="tag audit-fail">未通过</a> -->
            <a class="tag audit-success">已通过</a>
            <!-- <a class="tag audit-wait">审核中</a> -->
            <span class="title">标题测试</span>
            <div class="byte-dropdown">
              <el-popover placement="bottom" width="40" trigger="hover">
                <ul class="actions-info-more">
                  <li>
                    <i class="el-icon-edit"></i>
                    <span>编辑</span>
                  </li>
                  <li>
                    <i class="el-icon-delete"></i>
                    <span>删除</span>
                  </li>
                </ul>
                <!-- <el-button >click 激活</el-button> -->
                <span slot="reference">
                  <i class="el-icon-more"></i>
                </span>
              </el-popover>
            </div>
          </div>
          <div class="infos">
            <div class="infos-left">
              <span class="like">
                <i class="iconfont icon-good"></i>
                <span>0</span>
              </span>
              <span class="star">
                <i class="el-icon-star-off"></i>
                <span>0</span>
              </span>
            </div>
            <div class="infos-right">
              <span class="time">2022-1-2 10:11</span>
            </div>
            <!-- <span class="split-line"></span> -->
          </div>
        </div>
        <div class="video-item">
          <div class="first-line">
            <!-- <a class="tag audit-fail">未通过</a> -->
            <a class="tag audit-success">已通过</a>
            <!-- <a class="tag audit-wait">审核中</a> -->
            <span class="title">标题测试</span>
            <div class="byte-dropdown">
              <el-popover placement="bottom" width="40" trigger="hover">
                <ul class="actions-info-more">
                  <li>
                    <i class="el-icon-edit"></i>
                    <span>编辑</span>
                  </li>
                  <li>
                    <i class="el-icon-delete"></i>
                    <span>删除</span>
                  </li>
                </ul>
                <!-- <el-button >click 激活</el-button> -->
                <span slot="reference">
                  <i class="el-icon-more"></i>
                </span>
              </el-popover>
            </div>
          </div>
          <div class="infos">
            <div class="infos-left">
              <span class="like">
                <i class="iconfont icon-good"></i>
                <span>0</span>
              </span>
              <span class="star">
                <i class="el-icon-star-off"></i>
                <span>0</span>
              </span>
            </div>
            <div class="infos-right">
              <span class="time">2022-1-2 10:11</span>
            </div>
            <!-- <span class="split-line"></span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "all",
    };
  },
  methods: {
    videoFilter(classify) {
      this.$router.push(`${this.$route.path}?type=${classify}`);
      this.type = classify;
    },
  },
};
</script>

<style lang="less" scoped>
#content-video {
  .filter-wrap {
    padding: 0 20px;
    margin-bottom: 16px;

    .filter-item {
      border-right: 1px solid #e5e6eb;
      display: inline-block;
      padding: 0 16px;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #86909c;
      cursor: pointer;
      &:first-child {
        padding-left: 0 !important;
      }
    }

    .active-type {
      color: @primary-color !important;
    }
  }

  .video-container {
    .video-list {
      .video-item {
        width: 100%;
        padding: 16px 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e6eb;
        cursor: pointer;

        &:hover {
          background: #fafafa;
        }
        .first-line {
          position: relative;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;

          .tag {
            flex: none;
            margin-right: 8px;
            display: inline-block;
            vertical-align: middle;
            box-sizing: border-box;
            padding: 0 4px;
            font-size: 12px;
            font-weight: 400;
            height: 20px;
            line-height: 20px;
            border-radius: 2px;
            white-space: nowrap;
          }

          .audit-fail {
            color: #f56c6c;
            background: #ffece8;
          }
          .audit-success {
            color: #67c23a;
            background: #e7ffdc;
          }
          .audit-wait {
            color: #e6a23c;
            background: #ffeed4;
          }

          .title {
            max-width: calc(100% - 20px);
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: #1d2129;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: auto;
          }

          .byte-dropdown {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            cursor: pointer;

            &:hover {
              background: #e5e6eb;
              border-radius: 2px;
            }
            i {
              font-size: 16px;
              color: #4e5969;

              display: inline-block;
              vertical-align: middle;
              line-height: 1;
            }
          }
        }

        .infos {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 400;
          font-size: 14px;
          height: 22px;
          line-height: 22px;
          color: #606266;
          .infos-left {
            display: flex;
            justify-content: space-between;
            align-items: center;
            & > span {
              display: flex;
              align-items: center;
              margin-right: 30px;

              i {
                margin-right: 2px;
                font-size: 15px;
              }
            }
          }

          .infos-right {
          }
        }
      }
    }
  }
}
</style>