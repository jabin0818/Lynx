<template>
  <div id="cards-management">
    <div class="main-conten">
      <div class="tab-list">
        <div class="nav-item-wrap">
          <el-tabs :value="$route.path" @tab-click="handleClick">
            <el-tab-pane
              label="卡片"
              name="/creator/content/card/essays"
            ></el-tab-pane>
            <el-tab-pane
              :label="'草稿箱(' + 0 + ')'"
              name="/creator/content/card/drafts"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="nav-extra">
          <el-input
            type="text"
            class="header-search-input"
            placeholder="请输入卡片标题关键字"
          >
            <div slot="suffix" class="input-icon">
              <i class="el-icon-search"></i>
            </div>
          </el-input>
        </div>
      </div>
      <div class="tab-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "essays",
    };
  },
  methods: {
    handleClick(tab, event) {
      // if (tab.$options.propsData.name == "/creator/content/notes/essays") {
      //   this.$router.push({
      //     path: "/creator/content/notes/essays",
      //   });
      // } else if (
      //   tab.$options.propsData.name == "/creator/content/notes/drafts"
      // ) {
      //   this.$router.push({
      //     path: "/creator/content/notes/drafts",
      //   });
      // }
      this.$router.push({
        path: tab.$options.propsData.name,
      });
    },
  },
};
</script>

<style lang="less">
#cards-management {
  min-height: calc(100vh - 108px);
  margin-bottom: 24px;

  .main-conten {
    .tab-list {
      position: relative;
      margin-bottom: 15px;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #e6e8eb;
      }

      .nav-item-wrap {
        .el-tabs__nav-wrap::after {
          height: 0;
          background-color: #e4e7ed;
        }

        .el-tabs__header {
          margin: 0;

          .el-tabs__nav {
            height: 56px;

            .el-tabs__item {
              line-height: 56px;
              font-size: 16px;
              padding: 0 20px;
            }
          }
        }
      }

      .nav-extra {
        display: flex;
        align-items: center;
        margin-right: 20px;

        .header-search-input {
          height: 32px;
          width: 264px;
          max-width: 264px;

          input {
            height: 100%;
            width: 100%;
          }

          .input-icon {
            height: 100%;
            display: flex;
            align-items: center;
            margin: 0 6px;
            cursor: pointer;

            i {
              font-size: 14px;
              color: #333;
              font-weight: 600;
            }
          }
        }
      }
    }

    .tab-content {
    }
  }
}
</style>