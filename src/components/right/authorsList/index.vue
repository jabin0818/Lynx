<template>
  <div class="aside-authorsList">
    <div class="aside-authorsList-header">
      <span class="aside-authorsList-title">
        <!-- <i class=""></i> -->
        <span>推荐关注</span>
      </span>
      <!-- <span class="aside-authorsList-more">
        <span>更多</span>
        <i class="el-icon-arrow-right"></i>
      </span> -->
    </div>
    <div class="aside-authorsList-nested">
      <div class="aside-authorsList-main" ref="authorsLists">
        <div class="aside-authorsList-list">
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/1.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">拾光少年的麦</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">这个人没有填简介~~~</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/2.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">谭庆波1</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「互联网」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/3.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">六边形战士</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「互联网」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/4.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">JerryWang</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「科技」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
        </div>
        <div class="aside-authorsList-list">
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/5.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">谭庆波</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「互联网」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/2.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">JerryWang</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「科技」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/4.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">Jerry45</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「科技」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/2.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">极客时间</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「互联网」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
        </div>
        <div class="aside-authorsList-list">
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/5.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">蜗牛学苑​</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「互联网」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/4.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">魔术师卡颂</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「互联网」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/2.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">windliang</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「互联网」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
          <div class="aside-authorsList-item">
            <div class="item-authorInfo">
              <span class="authorInfo-avatarWrapper">
                <img src="../../../assets/img/avatar/3.jpg" />
              </span>
              <div class="authorInfo-content">
                <div class="authorInfo-head">
                  <span class="authorInfo-name">
                    <a class="user-link">條山本间柳</a>
                    <a class="user-gender">
                      <i class="el-icon-male"></i>
                      <!-- <i class="el-icon-female"></i> -->
                    </a>
                  </span>
                </div>
                <div class="authorInfo-detail">「互联网」领域答主</div>
              </div>
            </div>
            <div class="item-button">
              <i class="el-icon-plus"></i>
              <span class="follow">关注</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="aside-authorsList-footer">
      <button
        class="left-button"
        disabled
        ref="leftButton"
        @click="rollingLeft"
      >
        <i class="el-icon-arrow-left"></i>
      </button>
      <div class="page-number">{{ pageIndex + 1 }}/3</div>
      <button class="right-button" ref="rightButton" @click="rollingRight">
        <i class="el-icon-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthorsList",
  data() {
    return {
      pageIndex: 0,
    };
  },
  methods: {
    rollingLeft() {
      if (this.pageIndex == 0) {
        console.log("first");
        this.$refs.leftButton.disabled = true;
        return;
      }
      this.$refs.authorsLists.scrollLeft -= 260;
      this.pageIndex--;
    },
    rollingRight() {
      if (this.pageIndex == 2) {
        return;
      }

      // if(this.pageIndex == 1) {
      //     this.$refs.rightButton.disabled = true
      // }

      this.$refs.authorsLists.scrollLeft += 260;
      this.pageIndex++;
    },
  },
  watch: {
    pageIndex: {
      // immediate: true,
      handler(newValue) {
        if (newValue == 0) {
          this.$refs.leftButton.disabled = true;
        } else {
          this.$refs.leftButton.disabled = false;
        }
        if (newValue == 2) {
          this.$refs.rightButton.disabled = true;
        } else {
          this.$refs.rightButton.disabled = false;
        }
      },
    },
  },
};
</script>

<style lang="less">
.aside-authorsList {
  height: 292px;
  border-radius: 6px;
  border: 1px solid @levelThree-border-color;
  margin-bottom: 20px;
  background-color: #fff;

  .aside-authorsList-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid @levelOne-border-color;
    padding: 0 10px;

    .aside-authorsList-title {
      display: flex;
      align-content: center;

      span {
        font-size: 16px;
        font-weight: 600;
        color: @main-text-color;
      }
    }

    .aside-authorsList-more {
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

  .aside-authorsList-nested {
    padding-bottom: 6px;

    .aside-authorsList-main {
      position: relative;
      display: flex;
      flex-wrap: nowrap;
      overflow: auto hidden;
      scroll-snap-type: x mandatory;
      width: 100%;
      scroll-behavior: smooth;
      transition: all 1s;

      &::-webkit-scrollbar {
        display: none;
      }
      .aside-authorsList-list {
        margin: 0px;
        min-width: 0px;
        flex-shrink: 0;
        box-sizing: border-box;
        scroll-snap-align: center;
        width: 100%;

        .aside-authorsList-item {
          height: 38px;
          padding: 8px 10px;
          min-width: 0px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 6px;
          transition: background-color 0.1s;
          box-sizing: content-box;

          &:hover {
            background-color: #e3e5e7;
          }

          &:last-child {
            margin: 0;
          }

          .item-authorInfo {
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            max-width: 654px;
            position: relative;

            .authorInfo-avatarWrapper {
              height: 38px;
              cursor: pointer;

              img {
                box-sizing: border-box;
                margin: 0px;
                min-width: 38px;
                max-width: 100%;
                background-color: rgb(255, 255, 255);
                width: 38px;
                height: 38px;
                border-radius: 50%;
              }
            }

            .authorInfo-content {
              margin-left: 8px;

              .authorInfo-head {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                font-size: 15px;
                line-height: 1.1;
                -ms-flex-negative: 0;
                flex-shrink: 0;
                font-size: 13px;
                font-weight: normal;
                cursor: pointer;

                .user-gender {
                  box-sizing: border-box;
                  margin: 0px 0px 0px 0.3em;
                  min-width: 0px;
                  color: rgb(23, 81, 153);
                  display: inline-block;

                  .el-icon-male {
                    color: @primary-color;
                  }

                  .el-icon-female {
                    color: @danger-color;
                  }
                }
              }

              .authorInfo-detail {
                box-sizing: border-box;
                margin: 0px;
                min-width: 0px;
                font-size: 12px;
                color: rgb(153, 153, 153);
                display: -webkit-box;
                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
              }
            }
          }

          .item-button {
            min-width: 58px;
            padding: 0px;
            margin-left: auto;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &:hover i {
              transform: rotate(-90deg);
              color: @primary-color;
              // color: #145ff5;
            }
            &:hover .follow {
              color: @primary-color;
              // color: #145ff5;
            }

            i {
              margin-right: 3px;
              font-size: 14px;
              color: rgba(66, 129, 255, 0.8);
              font-weight: 600;
              transition: all 0.5s;
            }

            .follow {
              font-size: 13px;
              color: rgba(66, 129, 255, 0.8);
              transition: all 0.5s;
            }
          }
        }
      }
    }
  }

  .aside-authorsList-footer {
    box-sizing: border-box;
    min-width: 0px;
    font-size: 10px;
    padding-top: 2px;
    color: rgb(133, 144, 166);
    margin: 0px auto;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    display: flex;
    user-select: none;
    padding-bottom: 10px;

    .left-button,
    .right-button {
      font-size: 14px;
      line-height: 32px;
      color: rgb(133, 144, 166);
      text-align: center;
      cursor: pointer;
      background: none rgba(133, 144, 166, 0.1);
      border: 1px solid transparent;
      border-radius: 99em;
      width: 16px;
      height: 16px;
      line-height: 16px;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      padding: 0px;

      &:disabled {
        cursor: default;
        opacity: 0.5;
        pointer-events: none;
      }

      i {
        font-size: 12px;
      }
    }

    .page-number {
      box-sizing: border-box;
      min-width: 0px;
      width: 30px;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      margin: 0px 8px;
      display: flex;
    }
  }
}
</style>