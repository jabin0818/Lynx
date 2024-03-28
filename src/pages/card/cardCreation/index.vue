<template>
  <el-container id="write-card">
    <el-header class="write-card-header">
      <div class="editor-header">
        <div class="link-box" @click="backHome">
          <i class="el-icon-arrow-left"></i>
          <span class="back">返回首页</span>
        </div>
        <div class="right-box">
          <!-- <el-input placeholder="输入笔记标题..." v-model="notesTitle" show-word-limit maxlength="100" /> -->
        </div>
        <div class="user-box">
          <!-- <div class="btn-save" @click="chooseClassify">保存草稿</div> -->
          <div class="btn-save" @click="chooseClassify" v-if="published === 0">
            发布
          </div>
          <div class="btn-save btn-publish" @click="changeCardSet">保存</div>
          <div class="user-avatar">
            <img :src="userInfo.avatar" />
          </div>
        </div>
      </div>
    </el-header>
    <el-main class="write-card-main">
      <el-row>
        <el-col :span="18" class="writeCard-left">
          <div class="set-info-container" ref="infoContainer">
            <div class="set-meta-cover" v-show="cardCover">
              <div class="cover-view">
                <img :src="cardCover" alt="" />
                <div class="set-cover-delete" @click="deleteCoverBtn">
                  <i class="el-icon-close"> </i>
                </div>
              </div>
            </div>
            <div class="meta-info-editable">
              <div class="set-title-container">
                <el-input
                  class="title"
                  placeholder="请输入卡片集标题"
                  v-model="cardTitle"
                  show-word-limit
                  maxlength="100"
                />
              </div>
              <div class="set-intro-container" v-show="showCardIntro">
                <el-input
                  type="textarea"
                  class="intro"
                  placeholder="请输入卡片集介绍"
                  v-model="cardIntro"
                  show-word-limit
                  maxlength="400"
                  resize="none"
                  :autosize="true"
                />
                <span class="delete-intro-btn" @click="deleteIntroBtn">
                  <i class="el-icon-close"></i>
                </span>
              </div>
              <div class="card-classify-tag">
                <div class="tag-list-box">
                  <div class="tag-list-left">
                    <div
                      class="tag-list"
                      v-if="cardClassifyView && cardClassifyView.length"
                    >
                      <div class="tag-list-title">分类：</div>
                      <a
                        class="category-item"
                        v-for="(item, index) in cardClassifyView"
                        :key="index"
                        ><span>{{ item }}</span></a
                      >
                    </div>
                    <div
                      class="tag-list label-list"
                      v-if="cardTagView && cardTagView.length"
                    >
                      <div class="tag-list-title">标签：</div>
                      <a
                        class="category-item"
                        v-for="(item, index) in cardTagView"
                        :key="index"
                        ><span>{{ item }}</span></a
                      >
                    </div>
                  </div>
                  <div
                    class="tag-btn"
                    v-if="cardClassifyView.length || cardTagView.length"
                  >
                    <el-button type="text" @click="updateTagANDType"
                      >修改</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="set-info-analytics">
              <div class="analytics-wrapper">
                <div class="analytics-item">
                  <div class="item-name">待学习</div>
                  <div class="item-num waiting">
                    {{ cardSetInfo.learn || 0 }}
                  </div>
                </div>
                <div class="analytics-item analytics-remember">
                  <div class="item-name">已掌握</div>
                  <div class="item-num remember">
                    {{ cardSetInfo.count - cardSetInfo.learn || 0 }}
                  </div>
                </div>
                <div class="analytics-item analytics-remember">
                  <div class="item-name">需复习</div>
                  <div class="item-num learning">
                    {{ cardSetInfo.review || 0 }}
                  </div>
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
                    已掌握 {{ cardSetInfo.count - cardSetInfo.learn || 0 }}/{{
                      cardSetInfo.count || 0
                    }}
                  </div>
                  <div>{{ percentage || 0 }}%</div>
                </div>
              </div>
            </div>
          </div>
          <div class="set-detail-container">
            <div class="card-list-container" ref="cardList">
              <!-- <div class="card-item card-selected" @click="macintoshCard($event)">
                        <div class="card-container card-theme-default">
                            <div class="card-content-text">
                                <div class="content-front">So this book is gonna come in handy.</div>
                                <div class="card-content-split"></div>
                                <div class="content-back">come in handy的意思是to be useful in a particular situation，“迟早会有用” “总会有用武之地”，是个非常常见的表达。 我们也可以直接用handy表示“有用的“”方便的“，come in handy这个表达就是个handy phrase。</div>
                            </div>
                        </div>
                    </div> -->
              <div
                :class="item.type !== 4 ? 'card-item' : 'card-item header-item'"
                v-for="(item, index) in cardList"
                :key="index"
                @click="
                  !isEditorDirectory && macintoshCard($event, index, item.type)
                "
                @dblclick="
                  item.type === 4 ? editorDirectory($event) : learnCard()
                "
                ref="allCardItems"
                :id="'cardItem' + item.id"
              >
                <!-- :ref="'cardItem' + index" -->
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
                    <div
                      class="header-title-container"
                      :inputTip="
                        item.title === ''
                          ? '目录标题、章节段落、内容分类等'
                          : ''
                      "
                    >
                      <div
                        contenteditable="false"
                        placeholder="目录标题、章节段落、内容分类等"
                        class="header-title-text plain-text-editor"
                        @focus="focusDirectory($event)"
                        @blur="blurDirectory($event, item)"
                        @input="changeDirectory($event)"
                      >
                        {{ item.title }}
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="card-item card-newCreate" @click="addCard()">
                <div class="card-container card-newCreate-theme">
                  <i class="el-icon-plus"></i>
                  <span>新建卡片</span>
                </div>
              </div>
              <!-- <div class="card-item header-item" @dblclick="editorDirectory($event)">
                            <div class="card-container header-container header-level-three">
                                <div class="header-title-container">
                                    <div contenteditable="false" placeholder="目录标题、章节段落、内容分类等" class="header-title-text plain-text-editor" @focus="focusDirectory($event)" @blur="blurDirectory($event)" @input="changeDirectory($event)"></div>    
                                </div>
                            </div>
                        </div>
                        <div class="card-item header-item" @click="macintoshCard($event,4)">
                            <div class="card-container header-container header-level-one">
                                <div class="header-title-container">
                                    <div placeholder="目录标题、章节段落、内容分类等" class="header-title-text">计算机安全与维护</div>    
                                </div>
                            </div>
                        </div>
                        <div class="card-item header-item" @click="macintoshCard($event,8)">
                            <div class="card-container header-container header-level-two">
                                <div class="header-title-container">
                                    <div placeholder="目录标题、章节段落、内容分类等" class="header-title-text">计算机安全与维护</div>    
                                </div>
                            </div>
                        </div> -->
            </div>
            <transition name="el-zoom-in-bottom">
              <div
                class="list-options-menu options-show"
                v-show="showCardMenu"
                :style="
                  'top: ' +
                  cardMenuRowPx +
                  'px; margin-left: ' +
                  cardMenuColPx +
                  'px;'
                "
              >
                <!-- 卡片工具 -->
                <template v-if="!isDirectoryTool">
                  <div
                    class="list-option-open option-item"
                    @click="editorCardBtn"
                  >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="编辑"
                      placement="bottom"
                    >
                      <i class="el-icon-edit-outline"></i>
                    </el-tooltip>
                  </div>
                  <div
                    class="list-option-clone option-item"
                    @click="cloneCardBtn"
                  >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="拷贝"
                      placement="bottom"
                    >
                      <i class="el-icon-copy-document"></i>
                    </el-tooltip>
                  </div>
                  <div class="list-option-theme option-item">
                    <el-color-picker
                      v-model="cardBackgroundColor"
                      show-alpha
                      :predefine="predefineColors"
                      size="mini"
                      @change="changeCardBackgroundColor"
                    >
                    </el-color-picker>
                  </div>
                  <div
                    class="list-option-delete option-item"
                    @click="deleteCardBtn('card')"
                  >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="删除"
                      placement="bottom"
                    >
                      <i class="el-icon-delete"></i>
                    </el-tooltip>
                  </div>
                  <div class="list-option-delete option-item">
                    <i class="el-icon-more"></i>
                  </div>
                </template>
                <!-- 目录工具 -->
                <template v-else>
                  <div
                    class="list-option-open option-item"
                    @click="editorDirectoryBtn"
                  >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="编辑"
                      placement="bottom"
                    >
                      <i class="el-icon-edit-outline"></i>
                    </el-tooltip>
                  </div>
                  <div
                    class="list-option-clone option-item"
                    @click="cloneCardBtn"
                  >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="拷贝"
                      placement="bottom"
                    >
                      <i class="el-icon-copy-document"></i>
                    </el-tooltip>
                  </div>
                  <div class="list-option-size option-item">
                    <el-popover
                      placement="bottom"
                      width="144"
                      trigger="click"
                      popper-class="directory-sizeSelect-popover"
                      style="background: #363636"
                    >
                      <!-- <el-button>click 激活</el-button> -->
                      <div class="list-option-select">
                        <div
                          class="level-item level-item-1"
                          @click="changeTier(1)"
                        >
                          <div
                            class="level-selected-icon"
                            v-show="cardList[editorCardIndex].tier === 1"
                          >
                            <i class="el-icon-check"></i>
                          </div>
                          <div class="level-ico-box">H1</div>
                          <div class="level-text">一级目录</div>
                        </div>
                        <div
                          class="level-item level-item-2"
                          @click="changeTier(2)"
                        >
                          <div
                            class="level-selected-icon"
                            v-show="cardList[editorCardIndex].tier === 2"
                          >
                            <i class="el-icon-check"></i>
                          </div>
                          <div class="level-ico-box">H2</div>
                          <div class="level-text">二级目录</div>
                        </div>
                        <div
                          class="level-item level-item-3"
                          @click="changeTier(3)"
                        >
                          <div
                            class="level-selected-icon"
                            v-show="cardList[editorCardIndex].tier === 3"
                          >
                            <i class="el-icon-check"></i>
                          </div>
                          <div class="level-ico-box">H3</div>
                          <div class="level-text">三级目录</div>
                        </div>
                      </div>
                      <div class="DirectoryTool-titleSize" slot="reference">
                        <span
                          :class="
                            cardList[editorCardIndex].tier === 1
                              ? 'titleSize-one'
                              : cardList[editorCardIndex].tier === 2
                              ? 'titleSize-two'
                              : 'titleSize-three'
                          "
                          >{{
                            cardList[editorCardIndex].tier === 1
                              ? "H1"
                              : cardList[editorCardIndex].tier === 2
                              ? "H2"
                              : "H3"
                          }}</span
                        >
                        <span class="titleSize-center">{{
                          cardList[editorCardIndex].tier === 1
                            ? "一级目录"
                            : cardList[editorCardIndex].tier === 2
                            ? "二级目录"
                            : "三级目录"
                        }}</span>
                        <span class="titleSize-right">
                          <i class="el-icon-arrow-down"></i>
                        </span>
                      </div>
                    </el-popover>
                  </div>
                  <div
                    class="list-option-delete option-item"
                    @click="deleteCardBtn('directory')"
                  >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="删除"
                      placement="bottom"
                    >
                      <i class="el-icon-delete"></i>
                    </el-tooltip>
                  </div>
                  <div class="list-option-delete option-item">
                    <i class="el-icon-more"></i>
                  </div>
                </template>
              </div>
            </transition>
          </div>
        </el-col>
        <el-col :span="6" class="writeCard-right">
          <div class="writeCard-right-wrapper">
            <div class="set-tool-container">
              <div class="set-tool-title">
                <i class="iconfont icon-gongjuxiang"></i>
                <span>工具箱</span>
              </div>
              <div class="set-tool-main">
                <div class="dropdown-parent-container" @click="addCard()">
                  <i class="el-icon-folder-add"></i>
                  <span class="">卡片</span>
                </div>
                <div class="dropdown-parent-container" @click="addDirectory()">
                  <i class="iconfont icon-mulu"></i>
                  <span class="">目录</span>
                </div>

                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="click"
                  popper-class="setCardCover-popover"
                >
                  <div class="cover-title">设置卡片集封面</div>
                  <el-upload
                    class="cover-upload"
                    action="#"
                    :list-type="'picture-card'"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="fileChange"
                    :on-exceed="handleExceed"
                    ref="upload"
                    :limit="1"
                  >
                    <div class="cover-upload-btn">点击上传</div>
                    <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                  <template slot="reference">
                    <div class="dropdown-parent-container" @click="addCover()">
                      <i class="el-icon-picture-outline"></i>
                      <span class="">封面</span>
                    </div>
                  </template>
                </el-popover>

                <div class="dropdown-parent-container" @click="addCardIntro()">
                  <i class="el-icon-tickets"></i>
                  <span class="">介绍</span>
                </div>
                <div class="dropdown-parent-container">
                  <i class="el-icon-more"></i>
                  <span class="">更多</span>
                </div>
              </div>
            </div>
            <div class="set-directory-container">
              <el-collapse value="uniCollapse">
                <el-collapse-item name="uniCollapse">
                  <div class="directory-title" slot="title">
                    <i class="iconfont icon-mulu"></i>
                    <span>目录</span>
                  </div>
                  <div
                    v-if="directoryData && directoryData.length"
                    class="directory-list"
                  >
                    <!-- <el-tree ref="tree" :data="directoryData" :props="defaultProps" @node-click="handleNodeClick" empty-text="工具箱里添加目录哦~"></el-tree> -->
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
                  <el-empty
                    description="暂无目录"
                    :image-size="60"
                    v-else
                  ></el-empty>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
    <CardModal
      @cardCreation="receiveCardData"
      :visible="changeCardModalVisible"
      :cardData="cardList[editorCardIndex]"
      @closeCardModal="
        () => {
          this.changeCardModalVisible = false;
        }
      "
    />
    <CardLearnModal
      :visible="cardLearnModalVisible"
      :cardList="learnCardData"
      :cardId="learnCardId"
      @closeCardLearnModal="
        () => {
          this.cardLearnModalVisible = false;
        }
      "
      @toEditorCardModal="fromLearnToeditor"
    />
    <UploadCard
      @closeUploadCardModal="closeUploadModal"
      :visible="uploadCardModalVisible"
      :isUpload="uploadCardModalIsUpload"
      :returnData="{ cardClassify, cardClassifyView, cardTag, cardTagView }"
    />
  </el-container>
</template>

<script>
import CardModal from "@/components/cardModal/index";
import CardLearnModal from "@/components/cardLearnModal/index";
import SideToolbar from "@/components/sideToolbar/index";
import {
  insertCardSet,
  insertStudyCard,
  getOneCardsInfo,
  selectCardsSetInfo,
  setUserCardInfo,
  selectCards,
  insertUserCards,
  // getCardById,
  changeCardSetInfo,
  changeCardInfo,
  deleteCard,
} from "@/api/card";
import { uploadCardImg } from "@/api/card.js";

import { mapState } from "vuex";
import UploadCard from "./uploadCard";
export default {
  name: "CardCreation",
  components: {
    CardModal,
    CardLearnModal,
    SideToolbar,
    UploadCard,
  },
  data() {
    return {
      cardTitle: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      cardBackgroundColor: "",
      predefineColors: [
        "#fefefe",
        "#c2c4cc",
        "#faf5b5",
        "#c3e5fb",
        "#c5f0b1",
        "#fdbdad",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        // 'hsva(120, 40, 94, 0.5)',
        // 'hsl(181, 100%, 37%)',
        // 'hsla(209, 100%, 56%, 0.73)',
        // '#c7158577'
      ],
      cardMenuCol: 0,
      // cardMenuColPxAry: ['676px','130px','402px'],
      cardMenuColPx: "",
      cardMenuRowPx: 0,
      showCardMenu: false,
      cardList: [],
      cardCover: "", //封面
      cardCoverFile: null,
      showCardIntro: false, //是否显示介绍
      cardIntro: "", //介绍
      editorCardIndex: null, //当前处于编辑状态的卡片or目录
      changeCardModalVisible: false, //编辑卡片的modal是否显示
      cardLearnModalVisible: false, //学习卡片的modal是否显示
      uploadCardModalVisible: false, //选择卡片标签和分类的modal是否显示
      uploadCardModalIsUpload: true, //选择卡片标签和分类的modal是发布卡片集还是编辑分类标签
      isEditorDirectory: false, //是否处于编辑目录状态
      isExist: false, //卡片集是否已存在
      cardSetInfo: {
        //卡片集学习信息
        count: 0,
        learn: 0,
        review: 0,
      },
      cardClassify: [], //卡片分类
      cardClassifyView: [], //卡片分类的视图
      cardTag: [], //卡片标签
      cardTagView: [], //卡片标签的视图
      published: 0, // 卡片是否发布
    };
  },
  async mounted() {
    window.addEventListener("beforeunload", this.saveConfirm);
    window.addEventListener("click", this.cancelCardClick);
    try {
      if (this.isLogin) {
        await this.selectCardsSetInfoById();
      }
    } catch (error) {
      console.log(error);
    }
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.saveConfirm);
    window.removeEventListener("click", this.cancelCardClick);
  },
  methods: {
    saveConfirm(e) {
      // 全局定义一个变量 window.isCloseHint
      // 用于控制是否返回弹窗
      if (window.isCloseHint) {
        // 如果修改了的话
        const confirmationMessage = "是否需要保存已经编辑的内容？";
        (e || window.event).returnValue = confirmationMessage; // 兼容 Gecko + IE
        this.changeCardSet(false); // 关闭之前保存数据
        window.isCloseHint = false;
        return confirmationMessage; // 兼容 Gecko + Webkit, Safari, Chrome
      } else {
        return "";
      }
    },
    fileChange(file, fileList) {
      const format =
        file.raw.type === "image/jpeg" ||
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/png" ||
        file.raw.type === "image/gif";
      const isLt5M = file.raw.size / 1024 / 1024 < 5;
      if (fileList.length > 0) {
        if (!format) {
          this.$message.error("上传图片只能是JPG、PNG、GIF格式!");
          return false;
        } else if (!isLt5M) {
          this.$message.error("上传图片大小不能超过 5MB!");
          return false;
        } else {
          const formData = new FormData();
          formData.append("img", file.raw);
          formData.append("cardId", this.$route.params.id);
          uploadCardImg(formData)
            .then(async (res) => {
              this.cardCover = res.data;
              if (result.code === 200) {
                this.$message.success("上传成功！");
              } else {
                this.$message.error("上传失败！");
              }
            })
            .catch((err) => {
              this.$message.error("上传图片失败");
            });
        }
      }
    },
    handleRemoves(file) {
      this.$refs.upload.handleRemove(file);
      let newFileList = this.fileList.filter((item) => {
        return item.uid !== file.uid;
      });
      this.fileList = newFileList;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能选择1张图片`);
    },
    async closeUploadModal(val) {
      console.log("在哪调用了这个？", val);
      this.uploadCardModalVisible = false;
      if (val) {
        this.cardClassify = val.classification;
        this.cardClassifyView = val.classificationView;
        this.cardTag = val.tag;
        this.cardTagView = val.tagView;
        if (val.isPublished) {
          this.published = true;
        }
      }
    },
    backHome() {
      if (window.isCloseHint) {
        this.$confirm("是否保存修改?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.changeCardSet(false); // 关闭之前保存数据
            window.isCloseHint = false;
            this.$router.push({
              path: "/index",
            });
          })
          .catch(() => {
            this.$router.push({
              path: "/index",
            });
          });
      } else {
        this.$router.push({
          path: "/index",
        });
      }
    },
    chooseClassify() {
      if (!this.cardTitle) {
        this.$message.error("标题不能为空!");
        return;
      }
      this.uploadCardModalIsUpload = true;
      this.uploadCardModalVisible = true;
    },
    async changeCardSet(isShowMessage) {
      if (this.isExist && this.isLogin) {
        if (!this.cardTitle) {
          this.$message.error("标题不能为空!");
          return;
        }
        let cardSetId = this.$route.params.id;
        let res = await changeCardSetInfo({
          uid: this.userInfo.id,
          cardSetId: cardSetId,
          title: this.cardTitle,
          intro: this.cardIntro,
          firstImg: this.cardCover,
        });
        if (res.code === 200) {
          isShowMessage !== false && this.$message.success("修改成功！");
        } else {
          isShowMessage !== false && this.$message.error("修改失败！");
        }
      }
    },
    //深拷贝
    deepClone(obj) {
      let objClone = JSON.parse(JSON.stringify(obj));
      return objClone;
    },
    //生成id
    getRands(length = 5) {
      let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let rands = arr
        .sort(() => Math.random() - 0.5)
        .slice(0, length)
        .join("");
      return Number(rands);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    deleteCoverBtn() {
      this.$confirm("是否删除该封面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.cardCover !== "") {
            this.cardCover = "";
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteIntroBtn() {
      this.$confirm("是否删除卡片集介绍?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.showCardIntro) {
            this.showCardIntro = false;
            this.cardIntro = "";
          }
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    macintoshCard(event, id, type) {
      if (event) {
        if (type === 4) {
          this.cardMenuColPx = event.currentTarget.offsetLeft + 416;
        } else {
          this.cardMenuColPx = event.currentTarget.offsetLeft + 134;
        }
        this.cardMenuRowPx = event.currentTarget.offsetTop - 40;
        let dom = document.querySelector(".card-selected");
        if (dom) {
          dom.classList.remove("card-selected");
        }
        if (this.showCardMenu) {
          this.showCardMenu = false;
        }
        event.currentTarget.classList.add("card-selected");
        this.showCardMenu = true;
      }
      this.editorCardIndex = id;
      this.cardBackgroundColor = this.cardList[id].color;
      // this.cardMenuCol = (id + 1) % 3
      // let row = Math.ceil(Id / 3)
      // this.cardMenuRow = row
    },
    //取消卡片的点击状态
    cancelCardClick(e) {
      if (!this.showCardMenu && !this.editorCardIndex) return;
      let flag = false;
      if (e) {
        let arrays = this.$refs.allCardItems;
        for (let index = 0; index < arrays.length; index++) {
          const element = arrays[index];
          if (element.contains(e.target)) {
            flag = true;
            break;
          }
        }
      }
      if (flag) {
        return;
      } else {
        let dom = document.querySelector(".card-selected");
        if (dom) {
          dom.classList.remove("card-selected");
        }
        if (this.showCardMenu) {
          this.showCardMenu = false;
        }
        if (!e) {
          this.editorCardIndex = null;
        }
      }
    },
    addCard() {
      this.cancelCardClick();
      this.editorCardIndex = null;
      this.changeCardModalVisible = true;
    },
    async addDirectory() {
      if (!this.cardTitle) {
        this.$message.warning("标题不能为空");
        return;
      }
      this.cardList.push({
        // id: this.cardList.length,
        type: 4, //1笔记，2问答，3主题 4目录
        title: "", //type为2和3和4有效
        content: "",
        color: "#fff",
        tier: 1, //type为4时有效，目标的层级1、2、3
        temp: true,
        insert: true,
      });
    },
    addCardIntro() {
      this.showCardIntro = true;
    },
    addCover() {},
    editorDirectory(event) {
      if (event) {
        // event.currentTarget.contenteditable = true
        this.isEditorDirectory = true;
        event.currentTarget.classList.remove("card-selected");
        event.currentTarget.classList.add("header-editing");

        let dom = event.currentTarget.children[0].children[0].children[0];
        console.log(dom);
        if (dom) {
          dom.setAttribute("contenteditable", "true");
          dom.setAttribute("placeholder", "");
          dom.focus();
        }
      }
    },
    learnCard() {
      this.cardLearnModalVisible = true;
    },
    updateTagANDType() {
      this.uploadCardModalIsUpload = false;
      this.uploadCardModalVisible = true;
    },
    learnStar() {
      let index = this.cardList.findIndex((item) => item.type !== 4);
      if (index !== -1) {
        this.editorCardIndex = index;
        this.cardLearnModalVisible = true;
      } else {
        this.$message.info("暂无卡片,请先新建卡片!");
      }
    },
    focusDirectory(event) {
      console.log(event.target.innerText);
    },
    async blurDirectory(event, item) {
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
      let cardSetId = this.$route.params.id;
      let index = this.editorCardIndex;

      if (item.insert) {
        let title = event.target.innerText;
        this.cardList[index].title = "";
        this.cardList[index].title = title;

        item.temp = false;
        let res = await insertStudyCard(
          cardSetId,
          this.cardTitle,
          this.cardClassify.join(","),
          this.userInfo.id,
          4,
          event.target.innerText,
          "",
          "#fff",
          item.tier
        );
        console.log("添加目录卡片的接口：", res);
        if (res.code === 200) {
          item.id = res.data;
          item.insert = false;
        }
      } else {
        if (event.target.innerText === this.cardList[index].title) return;
        let title = event.target.innerText;
        this.cardList[index].title = "";
        this.cardList[index].title = title;
        let res = await changeCardInfo(
          cardSetId,
          this.userInfo.id,
          item.id,
          4,
          event.target.innerText,
          "",
          "#fff",
          item.tier
        );
        console.log("修改目录内容的接口");
        if (res.code === 200) {
          this.$message.success("修改成功！");
        } else {
          this.$message.error("修改失败！");
        }
      }
    },
    changeDirectory(event) {
      if (event.currentTarget.innerText === "") {
        event.currentTarget.setAttribute(
          "placeholder",
          "目录标题、章节段落、内容分类等"
        );
      } else {
        event.currentTarget.parentNode.setAttribute("inputTip", "");
      }
    },
    async receiveCardData(val) {
      if (val && this.userInfo && this.isExist) {
        if (val.isCreation === true) {
          if (!this.cardTitle) {
            this.$message.warning("标题不能为空");
            return;
          }
          let cardSetId = this.$route.params.id;
          let res = await insertStudyCard(
            cardSetId,
            this.cardTitle,
            this.cardClassify.join(","),
            this.userInfo.id,
            val.type,
            val.title,
            val.content,
            "#fff"
          );
          console.log("往卡片集中添加卡片的接口：", res);
          if (res.code === 200) {
            this.cardList.push({
              id: res.data,
              type: val.type,
              title: val.title, //type为2和3和4有效
              content: val.content,
              color: "#fff",
            });
            this.editorCardIndex = this.cardList.length - 1;
          }
        } else {
          let cardSetId = this.$route.params.id;
          let id = this.cardList[this.editorCardIndex].id;
          let res = await changeCardInfo(
            cardSetId,
            this.userInfo.id,
            id,
            val.type,
            val.title,
            val.content
          );
          this.cardList[this.editorCardIndex].type = val.type;
          this.cardList[this.editorCardIndex].title = val.title;
          this.cardList[this.editorCardIndex].content = val.content;
          if (res.code === 200) {
            this.$message.success("修改成功！");
          } else {
            this.$message.error("修改失败！");
          }
        }
      }
    },
    // async firstAddCard(cardId, typeId) {
    //   let type = typeId.join(",");
    //   let res = await setUserCardInfo(this.userInfo.id, cardId, type);
    //   console.log("第一次添加卡片", res);
    //   if (res.code === 200) {
    //     this.isExist = true;
    //   }
    // },
    // async noFirstAddCard(cardId) {
    //   let cardSetId = this.$route.params.id;
    //   let res = await insertUserCards(cardId, cardSetId, this.cardCover);
    //   console.log("不是第一次添加卡片", res);
    //   if (res.code === 200) {
    //   }
    // },
    editorCardBtn() {
      // let index = this.editorCardIndex
      // console.log(this.$refs['cardItem'+ index][0]);
      this.changeCardModalVisible = true;
    },
    fromLearnToeditor(val) {
      if (typeof val == "undefined" || val == null) {
        console.log("val is undefined");
      } else {
        this.cancelCardClick();
        this.editorCardIndex = this.cardList.findIndex((item) => {
          return item.id === val;
        });
        this.changeCardModalVisible = true;
      }
    },
    cloneCardBtn() {
      let index = this.editorCardIndex + 1;
      let id = "card_" + this.getRands(9);
      let newCardId = {
        id: id,
      };
      let copyObj = this.deepClone(this.cardList[this.editorCardIndex]);
      let newCopyObj = Object.assign(copyObj, newCardId);
      this.cardList.splice(index, 0, newCopyObj);
    },
    //   cloneDirectoryBtn() {
    //     let index = this.editorCardIndex + 1
    //     let copyObj = this.deepClone(this.cardList[this.editorCardIndex])
    //     console.log(index);
    //     this.cardList.splice(index, 0, copyObj)
    //   },
    deleteCardBtn(type) {
      this.$confirm(
        `是否删除该${type === "directory" ? "目录" : "卡片"}?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          if (type === "directory") {
            let currentDic = this.cardList[this.editorCardIndex];
            if (currentDic?.temp === true) {
              this.cardList.splice(this.editorCardIndex, 1);
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.cancelCardClick();
              this.showCardMenu = false;
              return;
            }
          }
          try {
            let cardSetId = this.$route.params.id;
            let cardId = this.cardList[this.editorCardIndex].id;
            let res = await deleteCard(cardSetId, this.userInfo.id, cardId);
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.cardList.splice(this.editorCardIndex, 1);
              this.cancelCardClick();
              this.showCardMenu = false;
            }
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editorDirectoryBtn() {
      let index = this.editorCardIndex;
      // let dom = this.$refs["cardItem" + index][0];
      let dom = this.$refs.allCardItems[index][0];
      if (dom) {
        this.isEditorDirectory = true;
        dom.classList.remove("card-selected");
        dom.classList.add("header-editing");

        let domChildren = dom.children[0].children[0].children[0];

        if (domChildren) {
          domChildren.setAttribute("contenteditable", "true");
          domChildren.setAttribute("placeholder", "");
          domChildren.focus();
        }
      }
    },
    async changeCardBackgroundColor(value) {
      if (value) {
        this.cardList[this.editorCardIndex].color = value;
        let cardSetId = this.$route.params.id;
        let cardId = this.cardList[this.editorCardIndex].id;
        let type = this.cardList[this.editorCardIndex].type;
        let title = this.cardList[this.editorCardIndex].title;
        let content = this.cardList[this.editorCardIndex].content;
        let res = await changeCardInfo(
          cardSetId,
          this.userInfo.id,
          cardId,
          type,
          title,
          content,
          value
        );
        console.log("修改是否成功捏！", res);
        if (res.code === 200) {
          this.$message.success("修改成功！");
        } else {
          this.$message.error("修改失败！");
        }
      } else {
        console.log("无");
        this.cardList[this.editorCardIndex].color = "#fff";
      }
    },
    async changeTier(tier) {
      let nowTier = this.cardList[this.editorCardIndex].tier;
      if (nowTier !== tier) {
        if (this.cardList[this.editorCardIndex].title !== "") {
          this.cardList[this.editorCardIndex].tier = tier;
          let cardSetId = this.$route.params.id;
          let cardId = this.cardList[this.editorCardIndex].id;
          let type = this.cardList[this.editorCardIndex].type;
          let title = this.cardList[this.editorCardIndex].title;
          let content = this.cardList[this.editorCardIndex].content;
          let color = this.cardList[this.editorCardIndex].color;
          let res = await changeCardInfo(
            cardSetId,
            this.userInfo.id,
            cardId,
            type,
            title,
            content,
            color,
            tier
          );
          console.log("修改是否成功！", res);
          if (res.code === 200) {
            this.$message.success("修改成功！");
          } else {
            this.$message.error("修改失败！");
          }
        }
      }
    },
    scrollDirectory(id) {
      let height1 = this.$refs.infoContainer.offsetHeight;
      let height2 = document.getElementById("cardItem" + id).offsetTop;
      let offsetTop = height1 + height2;
      window.scrollTo(0, offsetTop);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 创建卡片集数据
    async addCardsSet() {
      if (this.userInfo && this.$route.params.id) {
        let cardSetId = this.$route.params.id;
        this.cardTitle = "未命名卡片集";
        this.cardIntro = "";
        window.isCloseHint = false;
        let res = await insertCardSet(
          cardSetId,
          this.cardTitle,
          this.cardIntro,
          this.userInfo.id
        );
        console.log("添加卡片集数据的接口：", res);
        if (res.code === 200) {
          this.isExist = true;
          this.cardTitle = "未命名卡片集";
        } else if (res.code === 10001) {
          this.$message.error(res.msg);
        }
      }
    },
    // 查询卡片信息用于判断是否已存在
    async selectCardsSetInfoById() {
      if (this.userInfo && this.$route.params.id) {
        let cardSetId = this.$route.params.id;
        try {
          let res = await selectCardsSetInfo(cardSetId);
          if (res.code === 200) {
            if (res.data.title) {
              this.isExist = true;

              this.cardTitle = res.data.title;
              this.cardSetInfo.count = res.data.count;
              this.cardSetInfo.learn = res.data.learn;
              this.cardSetInfo.review = res.data.review;
              this.cardIntro = res.data.intro;
              this.cardCover = res.data.firstImg;

              this.cardClassify = res.data.typeId.split("-");
              this.cardClassifyView = res.data.types;
              this.cardTag = res.data.tagIds;
              this.cardTagView = res.data.tags;
              this.published = res.data.published;
              setTimeout(() => {
                window.isCloseHint = false;
              });
              if (res.data.intro && res.data.intro !== "") {
                this.addCardIntro();
              }
              await this.getAllCard(res.data.studyCards);
            } else {
              this.addCardsSet();
            }
          } else {
            this.addCardsSet();
          }
        } catch (error) {
          this.addCardsSet();
        }
      }
    },
    // 存在时查卡片
    async getAllCard(cardList) {
      // let cardSetId = this.$route.params.id;
      // let res = await getCardById(this.userInfo.id, cardSetId);
      // if (res.code === 200 && res.data.length !== 0) {
      // let cardList = res.data;
      let newCardList = [];
      for (let index = 0; index < cardList.length; index++) {
        newCardList.push({
          id: cardList[index].id,
          type: cardList[index].type,
          title: cardList[index].title,
          content: cardList[index].content,
          color: cardList[index].color,
          tier: cardList[index].tier,
        });
      }
      this.cardList = newCardList;
      // }
    },
  },
  computed: {
    // cardMenuTop() {
    //     let offsetTop = (this.cardMenuRow - 1) * 180 - 16
    //     return offsetTop
    // }
    ...mapState("user", ["token", "isLogin", "userInfo"]),
    isDirectoryTool() {
      if (this.editorCardIndex !== null) {
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
      return this.cardList.filter((item) => item.type === 4);
    },
    learnCardData() {
      return this.cardList.filter((item) => {
        return item.type === 1 || item.type === 2 || item.type === 3;
      });
    },
    learnCardId() {
      if (
        typeof this.editorCardIndex == "undefined" ||
        this.editorCardIndex == null
      ) {
      } else {
        let id = this.cardList[this.editorCardIndex].id;
        console.log("learnCardId:", id);
        return id;
      }
    },
    percentage() {
      if (this.cardSetInfo.count) {
        return Math.round(
          ((this.cardSetInfo.count - this.cardSetInfo.learn) /
            this.cardSetInfo.count) *
            100
        );
      }
    },
    changeData() {
      const { cardTitle, cardIntro } = this;
      return {
        cardTitle,
        cardIntro,
      };
    },
  },
  watch: {
    changeData(newV) {
      window.isCloseHint = true;
    },
  },
};
</script>

<style lang="less" scoped>
#write-card {
  font-size: 18px;
  .write-card-header {
    position: fixed;
    top: 0;
    .editor-header {
      display: flex;
      align-items: center;
      padding: 0 27px;
      height: 64px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      z-index: 100;

      .link-box {
        cursor: pointer;
      }

      .right-box {
        flex: 1 1 auto;
        height: 100%;

        // .el-input{
        //     height: 100%;

        //     input{
        //         height: 100%;
        //         margin: 0;
        //         padding: 0;
        //         font-size: 24px;
        //         font-weight: 500;
        //         color: #1d2129;
        //         border: none;
        //         outline: none;
        //     }
        // }
      }

      .user-box {
        display: flex;
        -webkit-box-align: center;
        align-items: center;

        .btn-save {
          height: 32px;
          margin-left: 8px;
          margin-right: 8px;
          padding: 2px 16px;
          font-size: 14px;
          line-height: 28px;
          border: 1px solid @primary-color;
          border-radius: 6px;
          cursor: pointer;
          color: @primary-color;
          background-color: #fff;
          box-sizing: border-box;
        }

        .btn-publish {
          color: #fff;
          background-color: @primary-color;
        }

        .editor-switcher {
          margin-left: 8px;
          margin-right: 8px;
          font-size: 20px;
          line-height: 1;
          vertical-align: middle;
          color: #909090;
          cursor: pointer;
          border-radius: 2px;
          padding: 4px;
          transition: background-color 0.25s;

          &:hover {
            background-color: #e5e6eb;
          }

          i {
            transform: rotate(-90deg);
          }
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #eee;
          cursor: pointer;
          margin-left: 20px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
  }

  .el-main {
    width: 1180px;
  }

  .write-card-main {
    .writeCard-left {
      padding-top: 60px;
      border-right: 20px solid #f6f7f9;

      .set-info-container {
        font-size: 16px;

        .set-meta-cover {
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

        .meta-info-editable {
          margin-top: 1em;
          position: relative;

          .set-title-container {
            font-size: 2em;
            font-weight: 500;
            flex: 1;
            padding: 5px 0;
            background-color: #fff;
            border-radius: 8px;

            /deep/ .el-input__inner {
              width: 100%;
              display: inline-block;
              white-space: pre-wrap;
              overflow-wrap: break-word;
              height: 64px;
              font-size: 30px;
              line-height: 1.45em;
              min-height: 1.45em;
              border: 0;
              outline: none;
              position: relative;
            }
          }

          .set-intro-container {
            position: relative;
            margin-top: 1.2em;
            padding: 10px 0;
            background-color: #fff;
            border-radius: 8px;

            /deep/ .el-textarea__inner {
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
              overflow: hidden;
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
            border-radius: 0 0 4px 4px;
            padding: 20px 15px;

            .tag-list-box {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: -12px;

              .tag-list-left {
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
              .tag-btn {
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

      .set-detail-container {
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
              content: "";
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

          .card-newCreate {
            cursor: pointer;

            .card-newCreate-theme {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: #363636;
              background-color: #e1e8f7;
              transition: background-color 0.2s;
              &:hover {
                background-color: #e1eafd;
              }

              i {
                font-size: 40px;
                margin-bottom: 10px;
              }

              span {
                font-size: 14px;
              }
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

                &::after {
                  content: attr(inputTip);
                  position: absolute;
                  top: 8px;
                  left: 4px;
                  font-size: 20px;
                  color: #d2d3d4;
                }

                .header-title-text {
                  text-wrap: nowrap;
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

        .list-options-menu {
          background: #363636;
          // display: none;
          display: flex;
          position: absolute;
          transform: translate(-50%);
          height: 38px;
          align-items: center;
          border-radius: 5px;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          z-index: 1;

          &:first-child {
            border-radius: 4px 0 0 4px;
          }

          .option-item {
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #e5e5e5;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.25s, color 0.25s;

            &:first-child {
              border-radius: 5px 0 0 5px;
            }
            &:last-child {
              border-radius: 0 5px 5px 0;
            }

            &:hover {
              background-color: #222;
              color: #fff;
            }

            i {
              font-size: 17px;
              font-weight: 300;
            }
          }

          .list-option-size {
            width: 100px;

            .DirectoryTool-titleSize {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              width: 100%;
              .titleSize-one {
                font-size: 14px;
              }
              .titleSize-two {
                font-size: 13px;
              }
              .titleSize-three {
                font-size: 12px;
              }

              .titleSize-center {
                font-size: 12px;
                margin: 0 3px;
              }

              .titleSize-right {
                i {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }

    .writeCard-right {
      position: relative;

      .writeCard-right-wrapper {
        position: fixed;
        top: 80px;

        .set-tool-container {
          background: #fff;
          border-radius: 6px;
          margin-bottom: 20px;

          .set-tool-title {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e4e6eb;
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

          .set-tool-main {
            display: flex;
            align-items: center;
            height: 68px;

            .dropdown-parent-container {
              height: 3em;
              width: 3.4em;
              color: #505454;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              position: relative;
              border-radius: 6px;
              transition: background-color 0.25s;

              &:hover {
                background-color: #e3e5e7;
              }
              i {
                font-size: 24px;
                margin-bottom: 2px;
              }

              span {
                font-size: 12px;
              }
            }
          }
        }

        .set-directory-container {
          background: #fff;
          border-radius: 6px;
          overflow: hidden;

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
    /deep/ .el-upload.el-upload--picture-card {
      width: 100%;
      height: auto;
      margin-top: 12px;
      background-color: transparent;
      border: none;
    }
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
      background: #e8e8e8;
      color: #303032;
      border: 0;
    }
  }
}
</style>