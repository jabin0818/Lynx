<template>
  <div id="userTab-list">
    <div class="userTab-list-header">
      <div class="header-content" v-show="!showSearch">
        <router-link
          :to="`/user/${$route.params.id}/notes`"
          active-class="active"
          class="nav-item"
        >
          <div class="nav-item-til">笔记</div>
        </router-link>
        <router-link
          :to="`/user/${$route.params.id}/cards`"
          active-class="active"
          class="nav-item"
        >
          <div class="nav-item-til">卡片</div>
        </router-link>
        <router-link
          :to="`/user/${$route.params.id}/videos`"
          active-class="active"
          class="nav-item"
        >
          <div class="nav-item-til">视频</div>
        </router-link>
        <router-link
          :to="`/user/${$route.params.id}/dynamic`"
          active-class="active"
          class="nav-item"
        >
          <div class="nav-item-til">动态</div>
        </router-link>
        <router-link
          :to="`/user/${$route.params.id}/star`"
          active-class="active"
          class="nav-item"
        >
          <div class="nav-item-til">收藏</div>
        </router-link>
        <router-link
          :to="`/user/${$route.params.id}/follow`"
          active-class="active"
          class="nav-item"
        >
          <div class="nav-item-til">关注</div>
        </router-link>
        <router-link
          :to="`/user/${$route.params.id}/fans`"
          active-class="active"
          class="nav-item"
        >
          <div class="nav-item-til">粉丝</div>
        </router-link>

        <router-link
          :to="`/user/${$route.params.id}/search`"
          class="nav-item search-item"
          @click.native="toUserSearch"
        >
          <i class="el-icon-search"></i>
        </router-link>
      </div>
      <div class="search-container" v-if="showSearch">
        <div class="return-content">
          <a class="return-btn" @click="backPage">
            <i class="el-icon-arrow-left"></i>
            <span>返回</span>
          </a>
          <div class="return-title">
            <div class="line">|</div>
            <div class="title">搜索</div>
          </div>
        </div>
        <transition name="el-fade-in-linear">
          <div class="search-input" v-show="showSearch">
            <el-input
              type="text"
              class="header-search-input"
              placeholder="笔记/卡片/视频/动态/收藏/关注"
            >
              <div slot="suffix" class="input-icon">
                <i class="el-icon-search"></i>
              </div>
            </el-input>
          </div>
        </transition>
      </div>
    </div>
    <div class="userTab-list-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserTab",
  data() {
    return {
      showSearch: false,
    };
  },
  mounted() {
    // if (this.$route.path === `/user/${this.$route.params.id}/search`) {
    //   this.showSearch = true;
    // } else {
    //   this.showSearch = false;
    // }
  },
  methods: {
    toUserSearch() {
      this.showSearch = true;
    },
    backPage() {
      this.$router.go(-1);
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue.path === `/user/${this.$route.params.id}/search`) {
          this.showSearch = true;
        } else {
          this.showSearch = false;
        }
      },
    },
  },
};
</script>

<style lang="less">
#userTab-list {
  margin-top: 10px;
  margin-right: 10px;

  .userTab-list-header {
    position: relative;
    margin: 0;
    padding: 0;
    height: 50px;
    background-color: #fff;
    border-radius: 3px 3px 0 0;
    border-bottom: 1px solid #e4e6eb;
    border-radius: 6px;
    margin-bottom: 10px;

    .header-content {
      display: flex;
      align-items: center;
      height: 100%;
      max-width: 960px;
      white-space: nowrap;
      position: relative;
      margin: 0 auto;

      .nav-item {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 72px;
        height: 100%;

        .nav-item-til {
          font-size: 16px;
          font-weight: 400;
          color: #515767;
        }
      }
      .active {
        .nav-item-til {
          color: @primary-color;
        }

        &::after {
          content: "";
          position: absolute;
          width: 16px;
          height: 3px;
          border-radius: 50px;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          z-index: 10;
          background-color: @primary-color;
        }
      }

      .search-item {
        margin-left: auto;
        i {
          font-size: 18px;
        }
      }
    }

    .search-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      max-width: 980px;
      margin: 0 auto;
      .return-content {
        display: flex;
        align-items: center;

        .return-btn {
          display: flex;
          align-items: center;
          margin-left: 20px;
          cursor: pointer;
          text-decoration: none;
          color: #909090;

          i {
            font-size: 20px;
          }
          span {
            font-size: 14px;
            margin-left: 4px;
            color: #515767;
          }
        }

        .return-title {
          position: relative;
          top: 1px;
          font-size: 14px;
          display: flex;
          align-items: center;

          .line {
            margin: 0 16px;
            color: #e4e6eb;
          }
          .title {
            font-weight: 500;
          }
        }
      }

      .search-input {
        margin-right: 20px;

        // .animation {
        //     animation: InputfadeIn 0.6s both;
        // }

        // @keyframes InputfadeIn {
        //     0% {
        //     width: 46px;
        //     }
        //     100% {
        //     width: 264px;
        //     }
        // }

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
  }

  .userTab-list-body {
    border-radius: 6px;
  }
}

.st-sort-popover {
  min-width: 100px !important;
}
</style>