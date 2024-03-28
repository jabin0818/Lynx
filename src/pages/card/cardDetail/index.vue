<template>
  <el-container id="detail-card">
    <el-header>
      <Header />
    </el-header>
    <el-main class="detail-card-main">
      <div class="card-left-buttons">
        <!-- 按钮 -->
        <LeftButtons :data="leftButtonsData" />
      </div>
      <el-row>
        <el-col :span="18" class="detailCard-left">
          <div class="info-container" ref="infoContainer">
            <div class="meta-cover">
              <div class="cover-view">
                <img
                  :src="
                    cardCover ||
                    require('@/assets/img/card/cardDefaultCover.jpg')
                  "
                  alt=""
                />
              </div>
            </div>
            <div class="meta-info-readonly">
              <div class="title-container">
                <div class="title">{{ cardTitle }}</div>
              </div>
              <div class="card-panel">
                <div class="card-read-info">
                  <span class="publish-text">
                    <i class="el-icon-time"></i>
                    {{ createTime }}
                  </span>
                  <span>1126阅读</span> · <span>37点赞</span> ·
                  <span>37评论</span>
                  <span
                    v-if="authorId === userInfo.id"
                    class="update-text"
                    @click="toCardSetEdit"
                    >编辑</span
                  >
                </div>
              </div>
              <div class="intro-container" v-show="cardIntro">
                <div class="intro-container-txt">
                  {{ cardIntro }}
                </div>
              </div>
              <div class="card-classify-tag">
                <div class="tag-list-box">
                  <div class="tag-list">
                    <div class="tag-list-title">分类：</div>
                    <a
                      class="category-item"
                      v-for="(item, index) in cardType"
                      :key="index"
                      ><span>{{ item }}</span></a
                    >
                  </div>
                  <div class="tag-list label-list">
                    <div class="tag-list-title">标签：</div>
                    <a
                      class="category-item"
                      v-for="(item, index) in cardTag"
                      :key="index"
                      ><span>{{ item }}</span></a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="set-info-analytics">
              <div class="analytics-wrapper">
                <div class="analytics-item">
                  <div class="item-name">待学习</div>
                  <div class="item-num waiting">{{ cardSetInfo.learn }}</div>
                </div>
                <div class="analytics-item analytics-remember">
                  <div class="item-name">已掌握</div>
                  <div class="item-num remember">
                    {{ cardSetInfo.graspNum }}
                  </div>
                </div>
                <div class="analytics-item analytics-remember">
                  <div class="item-name">需复习</div>
                  <div class="item-num learning">{{ cardSetInfo.review }}</div>
                </div>
              </div>
              <div class="study-start-container">
                <button class="study-start" @click="learnStar">开始学习</button>
              </div>
              <div class="progress-container">
                <div class="learn-progress-bar">
                  <el-progress
                    :percentage="percentage"
                    :stroke-width="8"
                    :show-text="false"
                  ></el-progress>
                </div>
                <div class="progress-text">
                  <div>
                    已掌握
                    {{ cardSetInfo.graspNum }}
                    <!-- {{ cardSetInfo.count - cardSetInfo.learn }}/{{
                      cardSetInfo.count
                    }} -->
                  </div>
                  <div>{{ percentage }}%</div>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-container">
            <div class="card-list-container" ref="cardList">
              <div
                :class="item.type !== 4 ? 'card-item' : 'card-item header-item'"
                v-for="(item, index) in cardList"
                :key="index"
                @click="macintoshCard($event, index, item.type)"
                @dblclick="item.type === 4 ? '' : learnCard()"
                :ref="'cardItem' + index"
                :id="'cardItem' + item.id"
              >
                <!-- 卡片 -->
                <template v-if="item.type !== 4">
                  <div
                    class="card-container card-theme-default"
                    :style="'background-color: ' + item.color"
                  >
                    <div class="card-content-text">
                      <div
                        class="content-front"
                        v-if="item.title"
                        v-html="item.title"
                      ></div>
                      <!-- <div class="card-content-split"></div> -->
                      <div class="content-back" v-html="item.content"></div>
                    </div>
                  </div>
                </template>
                <!-- 目录 -->
                <template v-else>
                  <div
                    class="card-container header-container"
                    :class="
                      item.tier === 1
                        ? 'header-level-one'
                        : item.tier === 2
                        ? 'header-level-two'
                        : 'header-level-three'
                    "
                  >
                    <div class="header-title-container">
                      <div
                        contenteditable="false"
                        placeholder="目录标题、章节段落、内容分类等"
                        class="header-title-text plain-text-editor"
                        @blur="blurDirectory($event)"
                        @input="changeDirectory($event)"
                      >
                        {{ item.title }}
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="detailCard-right">
          <div class="detailCard-right-wrapper">
            <AuthorBlock
              :authorId="authorId"
              class="authorBlock-card--container"
            />
            <RelatCardSet :title="'相关卡片集'" :data="relatCardSetData" />
            <div class="set-directory-container" :class="{ is_fixed: isFixed }">
              <el-collapse value="uniCollapse">
                <el-collapse-item name="uniCollapse">
                  <div class="directory-title" slot="title">
                    <i class="el-icon-postcard"></i>
                    <span>目录</span>
                  </div>
                  <div class="directory-list">
                    <div
                      class="directory-item"
                      v-for="(item, index) in directoryData"
                      :key="index"
                      :class="
                        item.tier === 1
                          ? 'list-dir-level-one'
                          : item.tier === 2
                          ? 'list-dir-level-two'
                          : 'list-dir-level-three'
                      "
                      @click="scrollDirectory(item.id)"
                    >
                      <div class="list-dir-btn">{{ item.title }}</div>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
    <CardLearnModal
      ref="cardLearnModal"
      :isMyself="false"
      :visible="cardLearnModalVisible"
      :cardList="learnCardData"
      :cardId="learnCardId"
      @closeCardLearnModal="
        () => {
          this.cardLearnModalVisible = false;
        }
      "
      @toEditorCardModal="fromLearnToeditor"
      @showCardLearnMode="showSettingOption"
    />
    <CardLearnMode
      :visible="isShowSetting"
      :learningStyle="learningStyle"
      @closeCardLearnMode="
        () => {
          this.isShowSetting = false;
        }
      "
      @changeLearningStyle="changeLearningStyle"
    />
    <ShareModal />
    <StarModal />
  </el-container>
</template>

<script>
import Header from "@/components/header";
import SideToolbar from "@/components/sideToolbar";
import CardModal from "@/components/cardModal";
import CardLearnModal from "@/components/cardLearnModal";
import CardLearnMode from "@/components/cardLearnMode";
import LeftButtons from "./leftButtons";
import ShareModal from "@/components/shareModal";
import StarModal from "@/components/starModal";
import AuthorBlock from "@/components/right/authorBlock/index.vue";
import RelatCardSet from "@/components/right/relat";

import { mapState } from "vuex";
import {
  getCardById,
  collectionCardSet,
  cancelCardSet,
  selectCardsSetInfo,
  getRelatCardSet,
} from "@/api/card.js";

export default {
  name: "CardDetail",
  components: {
    Header,
    SideToolbar,
    CardModal,
    CardLearnModal,
    CardLearnMode,
    LeftButtons,
    ShareModal,
    StarModal,
    AuthorBlock,
    RelatCardSet,
  },
  data() {
    return {
      leftButtonsData: {
        cardId: "",
        isLike: false,
        isStar: false,
        likeNum: "7",
        starNum: "5",
      },
      cardTitle: "",
      avatar: "",
      username: "",
      // showCardMenu: false,
      cardList: [
        //     {
        //     id: 0,
        //     type: 2,//1笔记，2问答，3主题，4目录
        //     title: '★常见的操作系统0', //type为2和3和4有效
        //     content: 'Android:是一种基于Linux 的自由及开放源代码的操作系统，主要用于移动设备。Mac OS：是一套运行在苹果公司的 Macintosh 系列计算机上的操作系统。Windows：是基于图形用户界面的操作系统Linux：是一种源代码开放的操作系统。',
        //     color: '#c2c4cc',
        //     tier: null,//type为4时有效，目标的层级1、2、3
        // },
      ],
      cardCover: null, //封面
      cardIntro: "", //介绍
      editorCardIndex: null, //当前处于编辑状态的卡片or目录
      cardLearnModalVisible: false, //学习卡片的modal是否显示
      top: false,
      isFixed: false,
      offsetTop: 0,
      cardSetInfo: {
        //卡片集学习信息
        count: 0,
        learn: 0,
        review: 0,
        lastTime: null,
        reviewTime: null,
        stuNum: null,
      },
      createTime: "",
      collectNum: 0,
      cardTag: [],
      cardType: [],
      isShowSetting: false,
      learningStyle: 0, // 学习模式
      authorId: "",
      relatCardSetData: [], //相关卡片集数据
    };
  },
  async mounted() {
    this.handleScroll.call(this);
    await this.getData();
    await this.getRelatData();
  },
  methods: {
    toCardSetEdit() {
      this.$router.push({
        path: "/card/creation/" + this.$route.params.id,
      });
    },
    handleScroll() {
      window.addEventListener(
        "scroll",
        () => {
          var scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
          if (scrollTop > 586) {
            this.isFixed = true;
          } else {
            this.isFixed = false;
          }
        },
        true
      );
    },
    macintoshCard(event, id, type) {
      if (event) {
        // if(type === 4 ){
        //     this.cardMenuColPx = event.currentTarget.offsetLeft + 404
        // } else {
        //     this.cardMenuColPx = event.currentTarget.offsetLeft + 130
        // }
        // this.cardMenuRowPx = event.currentTarget.offsetTop - 40
        let dom = document.querySelector(".card-selected");
        if (dom) {
          dom.classList.remove("card-selected");
        }
        event.currentTarget.classList.add("card-selected");
        // this.showCardMenu = true
      }
      this.editorCardIndex = id;
      this.cardBackgroundColor = this.cardList[id].color;
      // this.cardMenuCol = (id + 1) % 3
      // let row = Math.ceil(Id / 3)
      // this.cardMenuRow = row
    },
    //取消卡片的点击状态
    cancelCardClick() {
      let dom = document.querySelector(".card-selected");
      if (dom) {
        dom.classList.remove("card-selected");
      }
      this.editorCardIndex = null;
    },
    learnCard() {
      this.cardLearnModalVisible = true;
    },
    learnStar() {
      if (this.isLogin) {
        this.editorCardIndex = 0;
        this.cardLearnModalVisible = true;
      } else {
        this.$emit("请先登录！");
        this.$store.state.global.loginRegVisible = true;
      }
    },
    blurDirectory(event) {
      event.target.setAttribute("contenteditable", "false");

      if (event.target.innerText === "") {
        event.target.setAttribute(
          "placeholder",
          "目录标题、章节段落、内容分类等"
        );
      }
      let dom = event.target.parentElement.parentElement.parentElement;
      dom.classList.remove("header-editing");
      dom.classList.add("card-selected");

      this.isEditorDirectory = false;

      let index = this.editorCardIndex;
      this.cardList[index].title = event.target.innerText;
    },
    changeDirectory(event) {
      if (event.currentTarget.innerText === "") {
        event.currentTarget.setAttribute(
          "placeholder",
          "目录标题、章节段落、内容分类等"
        );
      }
    },
    receiveCardData(val) {
      if (val) {
        this.cardList.push({
          id: this.cardList.length,
          type: val.type,
          title: val.title, //type为2和3和4有效
          content: val.content,
          color: "#fff",
        });
      }
    },
    fromLearnToeditor(val) {
      if (!(typeof val == "undefined" || val == null)) {
        this.cancelCardClick();
        this.editorCardIndex = this.cardList.findIndex((item) => {
          return item.id === val;
        });
        this.changeCardModalVisible = true;
      }
    },
    scrollDirectory(id) {
      let height1 = this.$refs.infoContainer.offsetHeight;
      let height2 = document.getElementById("cardItem" + id).offsetTop;
      let offsetTop = height1 + height2;
      window.scrollTo(0, offsetTop);
    },
    async getData() {
      let cardSetId = this.$route.params.id;
      let res = await selectCardsSetInfo(cardSetId);
      console.log("获取卡片信息的接口：", res);
      if (res.code === 200) {
        if (res.data.title) {
          this.cardTitle = res.data.title;
          this.cardCover = res.data.firstImg;
          this.cardIntro = res.data.intro;
          this.avatar = res.data.avatar;
          this.username = res.data.username;

          this.cardSetInfo.count = res.data.cardsNum;
          this.cardSetInfo.learn = res.data.studyNum;
          this.cardSetInfo.review = res.data.reviewNum;
          this.cardSetInfo.graspNum = res.data.graspNum;

          this.cardSetInfo.lastTime = res.data.lastTime;
          this.cardSetInfo.reviewTime = res.data.reviewTime;
          this.cardSetInfo.stuNum = res.data.stuNum;

          this.createTime = res.data.createTime;
          this.collectNum = res.data.collectNum;

          this.cardTag = res.data.tags;
          this.cardType = res.data.types;

          this.leftButtonsData.isLike = res.data.thumbs;
          this.leftButtonsData.likeNum = res.data.thumbsUpNum;
          this.leftButtonsData.isStar = res.data.collect;
          this.leftButtonsData.starNum = res.data.collectNum;
          // await this.getCardData(res.data.studyCards);
          this.cardList = res.data.studyCards;
          this.authorId = res.data.uid;
        }
      }
    },
    async getRelatData() {
      let cardSetId = this.$route.params.id;
      let res = await getRelatCardSet(cardSetId);
      console.log("获取相关卡片集的接口：", res);
      if (res.code === 200) {
        this.relatCardSetData = res.data;
      }
    },
    showSettingOption() {
      this.isShowSetting = true;
    },
    changeLearningStyle(learningStyle) {
      this.learningStyle = learningStyle;
      this.$refs.cardLearnModal.reset();
      if (learningStyle === 0) {
      } else if (learningStyle === 1) {
      } else if (learningStyle === 2) {
      }
    },
  },
  computed: {
    ...mapState("user", ["token", "isLogin", "userInfo"]),
    isDirectoryTool() {
      if (this.editorCardIndex) {
        let index = Number(this.editorCardIndex);
        if (this.cardList[index].type === 4) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    directoryData() {
      let directoryData = this.cardList.filter((item, index) => {
        return item.type === 4;
      });

      return directoryData;
    },
    learnCardData() {
      if (this.learningStyle === 0) {
        return this.cardList.filter((item) => {
          return item.type === 1 || item.type === 2 || item.type === 3;
        });
      } else if (this.learningStyle === 1) {
        return this.cardList
          .filter((item) => {
            return item.type === 1 || item.type === 2 || item.type === 3;
          })
          .sort(() => {
            return Math.random() > 0.5 ? -1 : 1;
          });
      } else if (this.learningStyle === 2) {
        return this.cardList.filter((item) => {
          return (
            (item.type === 1 || item.type === 2 || item.type === 3) &&
            item.status === 5
          );
        });
      }
    },
    learnCardId() {
      if (
        typeof this.editorCardIndex == "undefined" ||
        this.editorCardIndex == null
      ) {
      } else {
        let id = this.cardList[this.editorCardIndex].id;
        return id;
      }
    },
    percentage() {
      // if (this.cardSetInfo.count) {
      //   return Math.round(
      //     ((this.cardSetInfo.count - this.cardSetInfo.learn) /
      //       this.cardSetInfo.count) *
      //       100
      //   );
      // }
      if (this.cardSetInfo.count) {
        return Math.round(
          (this.cardSetInfo.graspNum / this.cardSetInfo.count) * 100
        );
      }
    },
  },
};
</script>

<style lang="less">
#detail-card {
  font-size: 18px;
  background-color: #f6f7f9;
  .el-main {
    width: 1200px;
    overflow: hidden !important;
  }

  .detail-card-main {
    .card-left-buttons {
      position: fixed;
      margin-left: -82px;
      top: 140px;
      z-index: 2;
    }

    .detailCard-left {
      border-right: 20px solid #f6f7f9;

      .info-container {
        font-size: 16px;

        .meta-cover {
          width: 100%;
          height: 312px;
          position: relative;
          margin-bottom: 2em;

          .cover-view {
            position: absolute;
            width: 100%;
            height: 100%;

            img {
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 6px;
              object-fit: cover;
              object-position: center center;
            }

            .set-cover-delete {
              position: absolute;
              right: 15px;
              top: 15px;
              // display: none;
              width: 40px;
              height: 32px;
              background: rgba(0, 1, 3, 0.4);
              border-radius: 3px;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: all 0.3s;
              i {
                color: #fff;
              }

              &:hover {
                background: rgb(3 5 9 / 75%);
              }
            }
          }
        }

        .meta-info-readonly {
          margin-top: 1em;
          position: relative;

          .title-container {
            font-size: 2em;
            font-weight: 500;
            flex: 1;
            padding: 5px 0;
            border-radius: 8px;

            .title {
              width: 100%;
              display: inline-block;
              white-space: pre-wrap;
              overflow-wrap: break-word;
              height: 54px;
              font-size: 30px;
              line-height: 1.45em;
              min-height: 1.45em;
              border: 0;
              outline: none;
              position: relative;
            }
          }

          .card-panel {
            margin-bottom: 20px;
            color: #999;

            .card-read-info {
              font-weight: 400;
              font-size: 13px;

              & > span {
                margin: 0 3px;
                color: #999;
                transition: 0.3s;
              }

              .publish-text {
                display: inline-block;
                margin-right: 14px;
              }

              .update-text {
                color: @primary-color;
                margin-left: 10px;
                cursor: pointer;
              }
            }
          }

          .reader-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 0 14px 0;
            border-bottom: 1px solid #e9e4e4;

            .author-info-box {
              display: flex;

              .avatar {
                width: 42px;
                height: 42px;
                line-height: 42px;
                font-size: 18px;
                cursor: pointer;
                border-radius: 50%;
                border: 1px solid #ccc;
                img {
                  width: 100%;
                  height: 100%;
                  border-radius: 50%;
                }
              }

              .author-name-meta {
                .author-name {
                  font-size: 18px;

                  .username {
                    .name {
                      font-size: 16px;
                      color: @main-text-color;
                    }
                  }
                }

                .meta-box {
                  color: @general-text-color;
                  font-size: 14px;

                  .fans-num {
                    margin-right: 16px;
                  }
                }
              }
            }

            .follow-box {
              .follow {
                .follow-btn {
                  width: 76px;
                  height: 26px;
                  border-radius: 4px;
                  background-color: @primary-color;
                  color: #fff;
                  text-align: center;
                  font-size: 14px;
                  line-height: 26px;
                  cursor: pointer;

                  &:hover {
                    background-color: rgba(66, 129, 255, 0.8);
                    // border: 1px solid rgba(66, 129, 255, .6);
                  }
                }

                .follow-btn-close {
                  background: #37c701;
                  border: 1px solid rgba(55, 199, 1, 0.6) !important;
                  color: #fff !important;
                  /*width: 77px;*/
                  height: 27px;
                  border-radius: 2px;

                  &:hover {
                    background: #3ee002;
                    border: 1px solid rgba(55, 199, 1, 0.7) !important;
                  }
                }
              }
            }
          }

          .intro-container {
            position: relative;
            margin-top: 10px;
            padding: 10px 0;
            // background-color: #fff;
            border-radius: 8px;

            textarea {
              display: inline-block;
              white-space: pre-wrap;
              overflow-wrap: break-word;
              min-height: 1.45em;
              border: 0;
              outline: none;
              position: relative;
              line-height: 1.7;
              color: #454647;
              font-size: 16px;
              width: 100%;
            }

            .delete-intro-btn {
              position: absolute;
              top: 3px;
              right: 6px;
              width: 14px;
              height: 14px;
              line-height: 14px;
              text-align: center;
              border-radius: 50%;
              cursor: pointer;
              background: rgba(0, 1, 3, 0.4);

              &:hover {
                background: rgba(3, 5, 9, 0.75);
              }

              i {
                color: #fff;
                font-size: 12px;
              }
            }
          }

          .card-classify-tag {
            padding-top: 10px;
            border-radius: 0 0 4px 4px;
            padding-bottom: 20px;

            .tag-list-box {
              margin-bottom: -12px;

              .tag-list {
                display: flex;
                font-size: 16px;
                margin-right: 30px;
                flex-shrink: 0;
                line-height: 36px;

                .tag-list-title {
                  flex-shrink: 0;
                  margin-right: 8px;
                  font-size: 14px;
                  color: #515767;
                }

                .category-item {
                  background-color: #f2f3f5;
                  color: #515767;
                  display: flex;
                  align-items: center;
                  margin: 0 14px 14px 0;
                  padding: 0 14px;
                  border-radius: 4px;
                  transition: background-color 0.15s linear;
                  cursor: pointer;

                  &:hover {
                    background-color: #e4e6eb;
                  }

                  span {
                    white-space: nowrap;
                    line-height: 36px;
                  }
                }
              }

              .label-list {
                .category-item {
                  background-color: rgba(66, 129, 255, 0.1);
                  color: @primary-color;

                  &:hover {
                    background-color: rgba(66, 129, 255, 0.16);
                  }
                }
              }
            }
          }
        }

        .set-info-analytics {
          padding: 20px 10px;
          box-sizing: border-box;
          position: relative;
          background: #fff;
          margin-top: 20px;
          border-radius: 8px;

          .analytics-wrapper {
            border-radius: 5px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            justify-content: center;

            .analytics-item {
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;

              .item-name {
                color: #5f5f64;
                vertical-align: middle;
                height: 22px;
                line-height: 22px;
                white-space: nowrap;
              }

              .item-num {
                font-size: 18px;
                margin: 0 6px;
                vertical-align: middle;
                height: 22px;
                line-height: 22px;

                &.waiting {
                  color: #69abf0;
                }

                &.remember {
                  color: #81c78d;
                }

                &.learning {
                  color: #f2c866;
                }
              }
            }

            .analytics-remember {
              margin-left: 26px;
            }
          }

          .study-start-container {
            display: flex;
            margin-top: 20px;
            justify-content: center;

            .study-start {
              background-color: @primary-color;
              flex-shrink: 0;
              color: #fff;
              font-size: 16px;
              border: 0;
              border-radius: 5px;
              cursor: pointer;
              width: 180px;
              height: 42px;
              letter-spacing: 1px;
              transition: background-color 0.1s;
              box-shadow: inset 0 0 0 1px rgb(0 0 0 / 4%);
              margin-right: 20px;
              font-weight: 500;

              &:hover {
                background-color: #5a91ff;
              }
            }
          }

          .progress-container {
            margin: 0 10px;
            margin: 20px auto 0;
            width: 100%;
            max-width: 400px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .learn-progress-bar {
              width: 100%;
              height: 14px;
              border-radius: 3px;
            }

            .progress-text {
              width: 100%;
              // margin-top: 4px;
              font-size: 13px;
              color: #5f5f64;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }

      .detail-container {
        position: relative;
        padding: 20px 0 100px;

        .card-list-container {
          display: flex;
          width: calc(100% + 16px);
          margin-left: -8px;
          flex-wrap: wrap;

          .card-item {
            margin: 8px;
            position: relative;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            transition: transform 0.2s;
            width: calc(33.33333% - 16px);
            height: 164px;

            &::before {
              content: " ";
              display: block;
              position: absolute;
              left: -5px;
              top: -5px;
              height: calc(100% + 10px);
              width: calc(100% + 10px);
              border-radius: 5px;
              box-sizing: border-box;
              transition: box-shadow 0.2s;
            }

            &.card-selected::before {
              border: 1px solid #18a0fb;
              background: rgba(24, 160, 251, 0.12);
            }

            .card-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              border-radius: 8px;
              box-shadow: 0 3px 8px rgb(0 0 0 / 2%);
              user-select: none;
              height: 100%;
              box-sizing: border-box;
              overflow: hidden;
              display: flex;
              flex-direction: column;

              .card-content-text {
                padding: 16px 11px;
                height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                max-height: 100%;
                width: 100%;
                color: #000;
                line-height: 22px;
                font-size: 0.9em;
                -webkit-font-smoothing: initial;
                white-space: pre-wrap;
                word-wrap: break-word;
                .content-front {
                  height: 55px;
                  opacity: 0.8;
                  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                  padding-bottom: 10px;
                  margin-bottom: 10px;
                  overflow: hidden;
                  white-space: normal;
                  word-break: break-word;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                }

                // .card-content-split{
                //     height: 1px;
                //     background: rgba(0,0,0,.05);
                //     width: 100%;
                //     margin: 10px 0;
                // }

                .content-back {
                  opacity: 0.5;
                  overflow: hidden;
                  white-space: normal;
                  word-break: break-word;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                }
              }
            }

            .card-theme-default {
              background: #fff;
            }
          }

          .header-item {
            width: calc(100% - 16px);
            transition: box-shadow 0.3s;
            border-radius: 5px;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            max-height: 45px;
            cursor: pointer;

            // &:hover{
            //     transition: background-color .3s ;
            //     background-color: #e9e9e9;
            // }

            &.card-selected:hover {
              transition: none;
              background-color: transparent !important;
            }

            .header-container {
              position: relative;
              box-shadow: none;

              .header-title-container {
                font-weight: 600;
                color: #434446;
                position: relative;

                .header-title-text {
                  box-sizing: border-box;
                  padding: 8px 4px;
                  line-height: 1.5em;

                  &:focus {
                    border: none;
                    outline: none;
                  }

                  &:empty::before {
                    content: attr(placeholder);
                    cursor: text;
                    color: #d2d3d4;
                  }

                  // &::before {
                  //     content: attr(placeholder);
                  //     cursor: text;
                  //     color: #d2d3d4;
                  // }
                }

                // .plain-text-editor{
                //     background: #fff;
                // }
              }
            }

            .header-level-three {
              height: 40px;
              .header-title-container {
                padding-left: 24px;
                font-size: 16px;
              }
            }
            .header-level-two {
              height: 43px;
              .header-title-container {
                padding-left: 12px;
                font-size: 18px;
              }
            }
            .header-level-one {
              height: 46px;
              .header-title-container {
                font-size: 20px;
              }
            }
          }

          .header-editing {
            &::before {
              border: 1px solid #d3d6d8;
              background: #fff;
            }

            .header-title-text {
            }
          }
        }
      }
    }

    .detailCard-right {
      position: relative;
      .detailCard-right-wrapper {
        // position: fixed;
        // top: 80px;
        // width: 306px;
        .authorBlock-card--container {
          padding: 20px;
        }

        // .related-card-container {
        //   width: 100%;
        //   background: #fff;
        //   border-radius: 6px;
        //   margin-bottom: 20px;

        //   .related-card-title {
        //     display: flex;
        //     align-items: center;
        //     border-bottom: 1px solid #e4e6eb;
        //     padding: 10px;
        //     line-height: 18px;

        //     i {
        //       font-size: 20px;
        //       margin-right: 10px;
        //     }

        //     span {
        //       font-weight: 600;
        //       font-size: 16px;
        //       color: #303133;
        //     }
        //   }

        //   .related-card-main {
        //     display: flex;
        //     align-content: center;
        //     flex-wrap: wrap;
        //     padding: 10px 18px;

        //     // .related-card-item {
        //     //   padding: 10px 0;
        //     //   cursor: pointer;

        //     //   .entry-title {
        //     //     line-height: 22px;
        //     //     font-size: 16px;
        //     //     font-weight: 400;
        //     //     color: #252933;
        //     //     overflow: hidden;
        //     //     white-space: normal;
        //     //     word-break: break-word;
        //     //     display: -webkit-box;
        //     //     -webkit-box-orient: vertical;
        //     //     -webkit-line-clamp: 1;

        //     //     &:hover {
        //     //       color: @primary-color;
        //     //     }
        //     //   }

        //     //   .entry-meta-box {
        //     //     margin-top: 4px;

        //     //     .entry-meta {
        //     //       display: inline-block;
        //     //       font-size: 14px;
        //     //       line-height: 22px;
        //     //       color: #8a919f;
        //     //       font-weight: 400;
        //     //     }
        //     //   }
        //     // }
        //   }
        // }

        .set-directory-container {
          background: #fff;
          border-radius: 6px;
          overflow: hidden;
          width: 100%;

          .el-collapse {
            border-top: none;
          }

          .directory-title {
            display: flex;
            align-items: center;
            padding: 10px;
            line-height: 18px;

            i {
              font-size: 20px;
              margin-right: 10px;
            }

            span {
              font-weight: 600;
              font-size: 16px;
              color: #303133;
            }
          }

          .directory-list {
            font-size: 16px;

            .directory-item {
              padding: 0 8px 0 10px;
              cursor: default;
              color: #7b7b7d;
              margin-left: 0.62em;
              height: 2em;
              line-height: 2em;
              position: relative;

              &::before {
                content: " ";
                display: block;
                width: 9px;
                height: 9px;
                box-sizing: border-box;
                border-radius: 50%;
                position: absolute;
                left: 0;
                top: 11px;
                background: #d0d0d0;
              }

              .list-dir-btn {
                max-width: 270px;
                font-size: 0.85em;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                border-radius: 4px;
                padding: 0 0.7em;
                cursor: pointer;
                margin-left: 5px;

                &:hover {
                  background: #e9e9e9;
                }
              }
            }

            .list-dir-level-one {
            }
            .list-dir-level-two {
              padding-left: 1.2em;
              &::before {
                width: 6px;
                height: 6px;
                left: 12px;
                top: 12px;
                transform: scale(1.1);
              }
            }
            .list-dir-level-three {
              padding-left: 1.9em;
              &::before {
                width: 5px;
                height: 5px;
                border: 1px solid #444;
                left: 26px;
                top: 14px;
                background-color: #fff;
              }
            }
          }
        }

        .is_fixed {
          position: fixed;
          top: 10px;
          width: 290px;
        }
      }
    }
  }
}

.directory-sizeSelect-popover {
  background: #363636;
  padding: 0 !important;
  border: none;

  .list-option-select {
    display: flex;
    padding: 7px 0;
    flex-direction: column;
    border-radius: 5px;
    cursor: default;

    .level-item {
      display: flex;
      align-items: center;
      height: 30px;
      padding: 0 10px;
      color: #fff;
      position: relative;

      &:hover {
        background-color: #222;
      }

      .level-selected-icon {
        font-size: 12px;
      }

      .level-ico-box {
        margin: 0 4px 0 12px;
        font-size: 13px;
      }

      .level-text {
        font-size: 12px;
      }
    }
  }
}

.setCardCover-popover {
  border-radius: 6px;

  .cover-title {
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    margin-top: 6px;
  }

  .cover-upload {
    width: 100%;

    & > div {
      width: 100%;
    }
    .cover-upload-btn {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 25px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      text-decoration: none;
      user-select: none;
      outline: none;
      height: 34px;
      margin-top: 12px;
      background: #e8e8e8;
      color: #303032;
      border: 0;
    }
  }
}
</style>