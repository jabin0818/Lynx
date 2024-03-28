<template>
  <div id="main-card-index">
    <div class="cardsIndex-header">
      <div class="cardsIndex-title">
        <span class="title">卡片</span>
      </div>
      <div class="cardsIndex-more">
        <span class="more" @click="toCardsList">
          <span>更多</span>
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
    </div>
    <div class="cardsIndex-main">
      <div class="cardsIndex-list">
        <div class="set-item" v-for="(item, index) in cardSet" :key="index">
          <a class="set-item-container" @click="toCardDetail(item.cardSetId)">
            <div>
              <div class="set-item-cover">
                <img
                  :src="
                    item.firstImg ||
                    require('@/assets/img/card/cardDefaultCover.jpg')
                  "
                />
              </div>
              <div class="set-item-info">
                <div class="set-item-author">
                  <div class="author-text">
                    <i class="iconfont icon-UPzhu"></i>
                    <span class="name">{{ item.username }}</span>
                  </div>
                  <div class="auhtor-avatar">
                    <img :src="item.avatar" />
                    <div class="follow">
                      <i class="el-icon-circle-plus"></i>
                    </div>
                  </div>
                </div>
                <div class="set-item-title">
                  <span class="title-text">{{ item.title }}</span>
                </div>
                <div class="set-detail">
                  <!-- <span class="author">
                  <img :src="item.avatar" />
                  <span class="name">{{ item.username }}</span>
                </span> -->
                  <span class="analytics">
                    <span class="like" title="点赞数量">
                      <i class="iconfont icon-good"></i>
                      {{ item.collection }}
                    </span>
                    <span class="" title="收藏数量">
                      <i class="el-icon-star-off"></i>
                      {{ item.collection }}
                    </span>
                    <span class="" title="卡片数量">
                      <i class="el-icon-postcard"></i>
                      {{ item.cardsNum }}
                    </span>
                  </span>
                </div>
                <div class="set-item-intro">
                  <p>
                    {{ item.intro || "暂无简介" }}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { randomCardSets } from "@/api/index";

export default {
  name: "cardsListIndex",
  data() {
    return {
      cardSet: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    toCardDetail(id) {
      let routeData = this.$router.resolve("/card/detail/" + id);
      window.open(routeData.href, "_blank");
    },
    toCardsList() {
      this.$router.push({
        path: "/card",
      });
    },
    async getData() {
      let res = await randomCardSets();
      if (res.code === 200) {
        this.cardSet = res.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#main-card-index {
  .cardsIndex-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cardsIndex-title {
      width: 56px;
      height: 54px;
      line-height: 40px;
      margin-right: 25px;
      font-size: 28px;

      @media screen and (max-width: 840px) {
        // margin-right: 0.446rem;
        display: none;
        font-size: 0.5rem;
        width: 1.2rem;
        margin-right: 0.446rem;
      }

      @media screen and (max-width: 480px) {
        // margin-right: 0.446rem;
        font-size: 18px;
        width: 40px;
      }

      .title {
        display: block;
        color: #000;
      }
    }

    .cardsIndex-more {
      .more {
        font-size: 14px;
        color: #666;
        cursor: pointer;
      }
    }
  }

  .cardsIndex-main {
    .cardsIndex-list {
      display: grid;
      grid-gap: 24px 24px;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      .set-item {
        background-color: #fff;
        position: relative;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 8px;

        .set-item-container {
          color: #303032;
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          height: 224px;
          // box-shadow: inset 0 0 0 1px rgb(0 0 0 / 10%), 0 5px 15px rgb(0 1 3 / 4%);
          box-shadow: inset 0 0 0 1px rgb(0 0 0 / 5%), 0 0px 9px rgb(0 1 3 / 4%);
          cursor: pointer;
          transition: all 0.25s;
          overflow: hidden;

          &:hover {
            box-shadow: inset 0 0 0 1px rgb(0 0 0 / 5%),
              0 1px 15px rgb(0 1 3 / 8%);
            .set-item-info {
              transform: translateY(0%);
              border-radius: 8px 8px 0 0;
              & .set-item-author .auhtor-avatar {
                top: 16px;
              }

              .set-item-intro {
                visibility: initial;
              }
            }
          }

          & > div {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            .set-item-cover {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0px;
              left: 0;
              width: 100%;
              height: 128px;
              background-position: center;
              background-size: cover;
              transition: bottom 300ms ease;
              img {
                width: 100%;
                height: 100%;
                border-radius: 8px 8px 0 0;
              }
            }
            .set-item-info {
              padding: 10px 20px;
              // height: 96px;
              background-color: #fff;
              transition: 0.3s ease-in-out;
              transform: translateY(calc(224px - 96px));
              z-index: 10;

              .set-item-author {
                display: flex;
                justify-content: space-between;
                height: 20px;
                margin-bottom: 8px;
                align-items: flex-end;
                .author-text {
                  color: @primary-color;
                  font-size: 14px;
                  i {
                    margin-right: 4px;
                  }
                }

                .auhtor-avatar {
                  position: relative;
                  top: 0;
                  width: 46px;
                  height: 46px;
                  margin-right: 10px;
                  transition: top 0.25s ease-in-out;
                  img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                  }

                  .follow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    right: -4px;
                    bottom: 0px;
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    background-color: #fff;
                    i {
                      font-size: 20px;
                      color: @primary-color;
                      // border: 2px solid #fff;
                      border-radius: 50%;
                    }
                  }
                }
              }
              .set-item-title {
                padding-bottom: 2px;
                box-sizing: border-box;
                position: relative;
                width: 100%;
                .title-text {
                  width: 100%;
                  height: 1.5em;
                  line-height: 1.5em;
                  font-size: 15px;
                  font-weight: 600;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  word-break: break-all;
                }
              }
              .set-detail {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                box-sizing: border-box;
                height: 24px;

                .analytics {
                  display: flex;
                  align-items: center;
                  color: #404042;
                  font-size: 13px;

                  & > span {
                    display: flex;
                    flex-wrap: nowrap;
                    align-items: center;
                    margin-right: 15px;

                    i {
                      margin-right: 4px;
                    }
                  }
                }
              }

              .set-item-intro {
                height: 116px;
                background-color: white;
                color: #666;
                overflow-y: auto;
                font-size: 14px;
                border-top: 1px solid #dcdfe6;
                padding-top: 6px;
                margin-top: 4px;
                visibility: hidden;
                transition: visibility 0.25s ease-in-out;

                &::-webkit-scrollbar {
                  width: 6px;
                  height: 6px;
                  border-radius: 8px;
                  background-color: rgba(255, 255, 255, 0.1);
                }

                /*定义滚动条轨道 内阴影+圆角*/
                &::-webkit-scrollbar-track {
                  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
                  border-radius: 8px;
                  background-color: #f5f5f5;
                }

                /*定义滑块 内阴影+圆角*/
                &::-webkit-scrollbar-thumb {
                  border-radius: 8px;
                  box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
                  background-color: #c8c8c8;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>