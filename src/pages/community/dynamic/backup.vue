<template>
<div class="dynamic-item" v-for="item in dynamicData" :key="item.id">
          <div class="dynamic-item-header">
            <div class="di-header-left">
              <div class="dih-left-avatar">
                <img :src="userInfo.avatar" />
              </div>
              <div class="dih-left-info">
                <div class="username">青山随云走</div>
                <div class="time">1小时前</div>
              </div>
            </div>
            <el-popover placement="right" width="200" trigger="hover">
              <ul class="actions-info-more">
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>取消关注</span>
                </li>
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>举报</span>
                </li>
                <li>
                  <i class="iconfont icon-buganxingqu1"></i>
                  <span>不感兴趣</span>
                </li>
              </ul>
              <div class="di-header-right" slot="reference">
                <i class="el-icon-more"></i>
              </div>
            </el-popover>
          </div>
          <div class="dynamic-item-content">
            <v-clamp
              class="di-content-wrapper"
              :autoresize="true"
              :max-lines="3"
              :tag="'div'"
              :max-height="120"
              :expanded="contentIsFold"
              :ellipsis="'...'"
              @clampchange="clampchange"
            >
              建了个读书编程英语和ChatGPT的星球，分享chatgpt账号和最新教程
              1、大圣的读书编程分享 2、简历点评 3、chatgpt账号共享和使用问题
              4、英语学习 5、前端面试题和资料分享 自由职业程序员，开读书编程分享
              2、简历点评 3、chatgpt账号共享和使用问题 4、英语学习
              5、前端面试题和资料分享 自由职业程序员，开源读书编程分享
              2、简历点评 3、chatgpt账号共享和使用问题 4、英语学习
              5、前端面试题和资料分享
              自由职业程序员，开源源爱好者，持续研发优质编程课程。快加入一起进步吧
              选择加入即可获得 https://t.zsxq.com/0cNP53v7x
              <template slot="after">
                <span class="switch-btn" @click="foldContent()">
                  切换
                  <i class="el-icon-arrow-right"></i>
                </span>
              </template>
            </v-clamp>
          </div>
          <div class="dynamic-item-box">
            <div class="dynamic-type-normal more-than-one" v-show="false">
              <el-image
                v-for="url in urls"
                :key="url"
                :src="url"
                lazy
                :preview-src-list="urls"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="dynamic-type-special">
              <div class="special-left">
                <img src="../../../assets/img/boutique/english.jpg" alt="" />
                <div class="mask">
                  <span class="duration">16:43</span>
                </div>
                <div class="type-tag">
                  <span class="type-text">视频</span>
                </div>
              </div>
              <div class="special-right">
                <div class="special-right-title">
                  <span>
                    【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                  </span>
                </div>
                <div class="special-right-intro">
                  <span
                    >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                  >
                </div>
                <div class="special-right-playinfo">
                  <span class="amount amount-play">
                    <i class="el-icon-video-play"></i>
                    <!-- <i class="iconfont icon-good"></i> -->
                    <span class="text">123</span>
                  </span>
                  <span class="amount amount-comment">
                    <i class="el-icon-chat-line-round"></i>
                    <!-- <i class="el-icon-star-off"></i> -->
                    <span class="text">231</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="dynamic-item-active">
            <span class="share">
              <i class="iconfont icon-fenxiang"></i>
              <span>转发</span>
            </span>
            <span class="praise">
              <!-- 赞 -->
              <i class="iconfont icon-good"></i>
              <span>21</span>
            </span>
            <!-- <span class="bad">
                   踩 
                      <i class="el-icon-chat-dot-square"></i>
                      <span>12</span>
                  </span> -->
            <!-- 讨论 -->
            <span class="discuss">
              <i class="el-icon-chat-dot-square"></i>
              <span>23</span>
            </span>
          </div>
          <div class="dynamic-item-comment">
            <div class="dynamic-comment-form">
              <div class="comment-avatar">
                <img :src="userInfo.avatar" />
              </div>
              <div class="comment-textare">
                <div class="comment-textare-left">
                  <el-input
                    type="textarea"
                    :rows="1"
                    placeholder="轻轻地你来了，正如你轻轻地走~"
                    v-model="comment"
                    :autosize="{ minRows: 1, maxRows: 8 }"
                    resize="none"
                  >
                  </el-input>
                </div>
                <div class="comment-textare-right">
                  <span class="control-left-span">
                    <i class="el-icon-check"></i>
                  </span>
                  <span class="control-left-span">
                    <i class="el-icon-picture-outline"></i>
                  </span>
                  <span class="control-left-span">
                    <i class="iconfont icon-emoji"></i>
                  </span>
                </div>
              </div>
            </div>
            <div class="comment-splitLine"></div>
            <div class="dynamic-comment-list">
              <div class="comment-list" v-if="finish">
                <div
                  class="comment-item"
                  v-for="item in comments"
                  :key="item.commentId"
                >
                  <div class="comment-avatar">
                    <a class="user-link">
                      <img
                        :src="
                          item.commentAvatar
                            ? item.commentAvatar
                            : require('@/assets/img/user/default_avatar.jpg')
                        "
                        alt=""
                      />
                    </a>
                  </div>
                  <div class="content-box">
                    <div class="comment-main">
                      <div class="user-box">
                        <div class="user-name">
                          <a class="username">
                            <span class="name">{{ item.commentUsername }}</span>
                            <i class="el-icon-male gender"></i>
                            <!-- <i class="el-icon-female gender"></i> -->
                            <i class="iconfont icon-1 level"></i>
                          </a>
                        </div>
                        <time
                          datetime="1662797738000"
                          :title="item.commentCreateTime"
                          class="time"
                          >{{
                            new Date(
                              item.commentCreateTime
                            ).toLocaleDateString()
                          }}</time
                        >
                      </div>
                      <div class="content">
                        <div class="wrapper">
                          <input id="exp1" class="exp" type="checkbox" />
                          <div class="text">
                            <label class="btn" for="exp1"></label>
                            {{ item.commentContent }}
                          </div>
                        </div>
                      </div>
                      <div class="comment-warpper">
                        <div class="comment-action">
                          <div class="comment-action-left">
                            <!-- 赞 -->
                            <span class="praise">
                              <i class="iconfont icon-good"></i>
                              <span>{{ item.likes }}</span>
                            </span>
                            <!-- 踩 -->
                            <span class="disagree">
                              <i class="iconfont icon-bad"></i>
                              <span>0</span>
                            </span>
                            <span @click="replyBtn($event)">
                              <i class="el-icon-chat-dot-square"></i>
                              <span>{{ item.childrenComment.length }}</span>
                            </span>
                          </div>
                          <div class="comment-action-right">
                            <el-popover
                              placement="left"
                              width="200"
                              trigger="hover"
                            >
                              <ul class="actions-info-more">
                                <li>
                                  <i class="el-icon-warning-outline"></i>
                                  <span>加入黑名单</span>
                                </li>
                                <li>
                                  <i class="el-icon-warning-outline"></i>
                                  <span>举报</span>
                                </li>
                                <li
                                  v-if="
                                    item.commentAccount === userInfo.account
                                  "
                                  @click="deleteCommentBtn(item.commentId)"
                                >
                                  删除
                                </li>
                              </ul>
                              <span slot="reference" class="ca-right-more">
                                <i class="el-icon-more"></i>
                              </span>
                            </el-popover>
                          </div>
                        </div>
                        <div class="focused-reply">
                          <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="轻轻地你来了，正如你轻轻地走~"
                            v-model="reply"
                            :autosize="{ minRows: 3, maxRows: 8 }"
                            resize="none"
                          >
                          </el-input>
                          <div class="action-box">
                            <div class="comment-emoji">
                              <i class="iconfont icon-emoji"></i>
                              <span>表情</span>
                            </div>
                            <div
                              class="submit"
                              @click="submitReply(item.commentId)"
                            >
                              <span>发布</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="subcomment-wrapper"
                      v-if="item.childrenComment.length"
                    >
                      <div class="sub-comment-list">
                        <div>
                          <div
                            class="sub-comment-item"
                            v-for="item2 in item.childrenComment"
                            :key="item2.commentId"
                          >
                            <div class="subcomment-avatar">
                              <a>
                                <img
                                  :src="
                                    item2.commentAvatar
                                      ? item2.commentAvatar
                                      : require('@/assets/img/user/default_avatar.jpg')
                                  "
                                  alt=""
                                />
                              </a>
                            </div>
                            <div class="subcomment-content">
                              <div class="content-wrapper">
                                <div class="user-box">
                                  <div class="user-name">
                                    <a class="username">
                                      <span class="name">{{
                                        item2.commentUsername
                                      }}</span>
                                    </a>
                                  </div>
                                  <div
                                    class="rely-box"
                                    v-if="item2.parentCommentId"
                                  >
                                    <span>回复</span>
                                    <div class="user-popover">
                                      <a
                                        class="repliedname"
                                        style="max-width: 10em"
                                      >
                                        {{
                                          findReplyUsername(
                                            item2.parentCommentId,
                                            item
                                          )
                                        }}
                                      </a>
                                    </div>
                                  </div>
                                  <time
                                    datetime="1662797738000"
                                    :title="item2.commentCreateTime"
                                    class="time"
                                    >{{
                                      new Date(
                                        item2.commentCreateTime
                                      ).toLocaleDateString()
                                    }}</time
                                  >
                                </div>
                                <div class="content">
                                  <!-- <p>
                                                        </p> -->
                                  <div class="wrapper">
                                    <input
                                      id="exp2"
                                      class="exp"
                                      type="checkbox"
                                    />
                                    <div class="text">
                                      <label class="btn" for="exp2"></label>
                                      {{ item2.commentContent }}
                                    </div>
                                  </div>
                                </div>
                                <div class="comment-warpper">
                                  <div class="comment-action">
                                    <div class="comment-action-left">
                                      <!-- 赞 -->
                                      <span class="praise">
                                        <i class="iconfont icon-good"></i>
                                        <span>{{ item2.likes }}</span>
                                      </span>
                                      <!-- 踩 -->
                                      <span class="disagree">
                                        <i class="iconfont icon-bad"></i>
                                        <span>0</span>
                                      </span>
                                      <span @click="replyBtn($event)">
                                        <i class="el-icon-chat-dot-square"></i>
                                        <!-- <span>12</span> -->
                                      </span>
                                    </div>
                                    <div
                                      class="comment-action-right reply-more"
                                    >
                                      <el-popover
                                        placement="left"
                                        width="200"
                                        trigger="hover"
                                      >
                                        <ul class="actions-info-more">
                                          <li>
                                            <i
                                              class="el-icon-warning-outline"
                                            ></i>
                                            <span>加入黑名单</span>
                                          </li>
                                          <li>
                                            <i
                                              class="el-icon-warning-outline"
                                            ></i>
                                            <span>举报</span>
                                          </li>
                                          <li
                                            v-if="
                                              item.commentAccount ===
                                              userInfo.account
                                            "
                                            @click="
                                              deleteCommentBtn(item.commentId)
                                            "
                                          >
                                            删除
                                          </li>
                                        </ul>
                                        <span
                                          slot="reference"
                                          class="ca-right-more"
                                        >
                                          <i class="el-icon-more"></i>
                                        </span>
                                      </el-popover>
                                    </div>
                                  </div>
                                  <div class="focused-reply">
                                    <el-input
                                      type="textarea"
                                      :rows="4"
                                      placeholder="轻轻地你来了，正如你轻轻地走~"
                                      v-model="reply"
                                      :autosize="{ minRows: 3, maxRows: 8 }"
                                      resize="none"
                                    >
                                    </el-input>
                                    <div class="action-box">
                                      <div class="comment-emoji">
                                        <i class="iconfont icon-emoji"></i>
                                        <span>表情</span>
                                      </div>
                                      <div
                                        class="submit"
                                        @click="
                                          submitReply(
                                            item.commentId,
                                            item2.commentId
                                          )
                                        "
                                      >
                                        <span>发布</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="comment-list-more"
                v-if="isHasNextPage"
                @click="toDynamicDetails"
              >
                <span> 查看全部 {{ total }} 条回复 </span>
                <i class="el-icon-arrow-down"></i>
              </div>
            </div>
          </div>
        </div>
  <!-- 卡片 -->
        <div class="dynamic-item">
          <div class="dynamic-item-header">
            <div class="di-header-left">
              <div class="dih-left-avatar">
                <img :src="userInfo.avatar" />
              </div>
              <div class="dih-left-info">
                <div class="username">青山随云走</div>
                <div class="time">1小时前</div>
              </div>
            </div>
            <el-popover placement="right" width="200" trigger="hover">
              <ul class="actions-info-more">
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>取消关注</span>
                </li>
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>举报</span>
                </li>
                <li>
                  <i class="iconfont icon-buganxingqu1"></i>
                  <span>不感兴趣</span>
                </li>
              </ul>
              <div class="di-header-right" slot="reference">
                <i class="el-icon-more"></i>
              </div>
            </el-popover>
          </div>
          <div class="dynamic-item-content">
            <v-clamp
              class="di-content-wrapper"
              :autoresize="true"
              :max-lines="3"
              :tag="'div'"
              :max-height="120"
              :expanded="contentIsFold"
              :ellipsis="'...'"
              @clampchange="clampchange"
            >
              建了个读书编程英语和ChatGPT的星球，分享chatgpt账号和最新教程
              1、大圣的读书编程分享 2、简历点评 3、chatgpt账号共享和使用问题
              4、英语学习 5、前端面试题和资料分享 自由职业程序员，开读书编程分享
              2、简历点评 3、chatgpt账号共享和使用问题 4、英语学习
              5、前端面试题和资料分享 自由职业程序员，开源读书编程分享
              2、简历点评 3、chatgpt账号共享和使用问题 4、英语学习
              5、前端面试题和资料分享
              自由职业程序员，开源源爱好者，持续研发优质编程课程。快加入一起进步吧
              选择加入即可获得 https://t.zsxq.com/0cNP53v7x
              <template slot="after">
                <span class="switch-btn" @click="foldContent()">
                  切换
                  <i class="el-icon-arrow-right"></i>
                </span>
              </template>
            </v-clamp>
          </div>
          <div class="dynamic-item-box">
            <div class="dynamic-type-normal more-than-one" v-show="false">
              <el-image
                v-for="url in urls"
                :key="url"
                :src="url"
                lazy
                :preview-src-list="urls"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="dynamic-type-special">
              <div class="special-left">
                <img src="../../../assets/img/boutique/english.jpg" alt="" />
                <!-- <div class="mask">
                  <span class="duration">16:43</span>
                </div> -->
                <div class="type-tag">
                  <span class="type-text">卡片</span>
                </div>
              </div>
              <div class="special-right">
                <div class="special-right-title">
                  <span>
                    【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                  </span>
                </div>
                <div class="special-right-intro">
                  <span
                    >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                  >
                </div>
                <div class="special-right-playinfo">
                  <span class="amount amount-play">
                    <!-- <i class="el-icon-video-play"></i> -->
                    <i class="iconfont icon-good"></i>
                    <span class="text">123</span>
                  </span>
                  <span class="amount amount-comment">
                    <!-- <i class="el-icon-chat-line-round"></i> -->
                    <i class="el-icon-star-off"></i>
                    <span class="text">231</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="dynamic-item-active">
            <span class="share">
              <i class="iconfont icon-fenxiang"></i>
              <span>转发</span>
            </span>
            <span class="praise">
              <!-- 赞 -->
              <i class="iconfont icon-good"></i>
              <span>21</span>
            </span>
            <!-- <span class="bad">
                   踩 
                      <i class="el-icon-chat-dot-square"></i>
                      <span>12</span>
                  </span> -->
            <!-- 讨论 -->
            <span class="discuss">
              <i class="el-icon-chat-dot-square"></i>
              <span>23</span>
            </span>
          </div>
        </div>
        <!-- 图文动态 -->
        <div class="dynamic-item">
          <div class="dynamic-item-header">
            <div class="di-header-left">
              <div class="dih-left-avatar">
                <img :src="userInfo.avatar" />
              </div>
              <div class="dih-left-info">
                <div class="username">青山随云走</div>
                <div class="time">1小时前</div>
              </div>
            </div>
            <el-popover placement="right" width="200" trigger="hover">
              <ul class="actions-info-more">
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>取消关注</span>
                </li>
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>举报</span>
                </li>
                <li>
                  <i class="iconfont icon-buganxingqu1"></i>
                  <span>不感兴趣</span>
                </li>
              </ul>
              <div class="di-header-right" slot="reference">
                <i class="el-icon-more"></i>
              </div>
            </el-popover>
          </div>
          <div class="dynamic-item-content">
            <v-clamp
              class="di-content-wrapper"
              :autoresize="true"
              :max-lines="3"
              :tag="'div'"
              :max-height="120"
              :expanded="contentIsFold"
              :ellipsis="'...'"
              @clampchange="clampchange"
            >
              建了个读书编程英语和ChatGPT的星球，分享chatgpt账号和最新教程
              1、大圣的读书编程分享 2、简历点评 3、chatgpt账号共享和使用问题
              4、英语学习 5、前端面试题和资料分享 自由职业程序员，开读书编程分享
              2、简历点评 3、chatgpt账号共享和使用问题 4、英语学习
              5、前端面试题和资料分享 自由职业程序员，开源读书编程分享
              2、简历点评 3、chatgpt账号共享和使用问题 4、英语学习
              5、前端面试题和资料分享
              自由职业程序员，开源源爱好者，持续研发优质编程课程。快加入一起进步吧
              选择加入即可获得 https://t.zsxq.com/0cNP53v7x
              <template slot="after">
                <span class="switch-btn" @click="foldContent()">
                  切换
                  <i class="el-icon-arrow-right"></i>
                </span>
              </template>
            </v-clamp>
          </div>
          <div class="dynamic-item-box">
            <div class="dynamic-type-normal more-than-one">
              <el-image
                v-for="url in urls"
                :key="url"
                :src="url"
                lazy
                :preview-src-list="urls"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="dynamic-type-special" v-show="false">
              <div class="special-left">
                <img src="../../../assets/img/boutique/english.jpg" alt="" />
                <div class="mask">
                  <span class="duration">16:43</span>
                </div>
                <div class="type-tag">
                  <span class="type-text">视频</span>
                </div>
              </div>
              <div class="special-right">
                <div class="special-right-title">
                  <span>
                    【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                  </span>
                </div>
                <div class="special-right-intro">
                  <span
                    >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                  >
                </div>
                <div class="special-right-playinfo">
                  <span class="amount amount-play">
                    <!-- <i class="el-icon-video-play"></i> -->
                    <i class="iconfont icon-good"></i>
                    <span class="text">123</span>
                  </span>
                  <span class="amount amount-comment">
                    <!-- <i class="el-icon-chat-line-round"></i> -->
                    <i class="el-icon-star-off"></i>
                    <span class="text">231</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="dynamic-item-active">
            <span class="share">
              <i class="iconfont icon-fenxiang"></i>
              <span>转发</span>
            </span>
            <span class="praise">
              <!-- 赞 -->
              <i class="iconfont icon-good"></i>
              <span>21</span>
            </span>
            <!-- <span class="bad">
                   踩 
                      <i class="el-icon-chat-dot-square"></i>
                      <span>12</span>
                  </span> -->
            <!-- 讨论 -->
            <span class="discuss">
              <i class="el-icon-chat-dot-square"></i>
              <span>23</span>
            </span>
          </div>
        </div>
        <!-- 笔记 -->
        <div class="dynamic-item">
          <div class="dynamic-item-header">
            <div class="di-header-left">
              <div class="dih-left-avatar">
                <img :src="userInfo.avatar" />
              </div>
              <div class="dih-left-info">
                <div class="username">青山随云走</div>
                <div class="time">1小时前</div>
              </div>
            </div>
            <el-popover placement="right" width="200" trigger="hover">
              <ul class="actions-info-more">
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>取消关注</span>
                </li>
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>举报</span>
                </li>
                <li>
                  <i class="iconfont icon-buganxingqu1"></i>
                  <span>不感兴趣</span>
                </li>
              </ul>
              <div class="di-header-right" slot="reference">
                <i class="el-icon-more"></i>
              </div>
            </el-popover>
          </div>
          <div class="dynamic-item-content">
            <v-clamp
              class="di-content-wrapper"
              :autoresize="true"
              :max-lines="3"
              :tag="'div'"
              :max-height="120"
              :expanded="contentIsFold"
              :ellipsis="'...'"
              @clampchange="clampchange"
            >
              建了个读书编程英语和ChatGPT的星球，分享chatgpt账号和最新教程
              1、大圣的读书编程分享 2、简历点评 3、chatgpt账号共享和使用问题
              4、英语学习 5、前端面试题和资料分享 自由职业程序员，开读书编程分享
              2、简历点评 3、chatgpt账号共享和使用问题 4、英语学习
              5、前端面试题和资料分享 自由职业程序员，开源读书编程分享
              2、简历点评 3、chatgpt账号共享和使用问题 4、英语学习
              5、前端面试题和资料分享
              自由职业程序员，开源源爱好者，持续研发优质编程课程。快加入一起进步吧
              选择加入即可获得 https://t.zsxq.com/0cNP53v7x
              <template slot="after">
                <span class="switch-btn" @click="foldContent()">
                  切换
                  <i class="el-icon-arrow-right"></i>
                </span>
              </template>
            </v-clamp>
          </div>
          <div class="dynamic-item-box">
            <div class="dynamic-type-normal more-than-one" v-show="false">
              <el-image
                v-for="url in urls"
                :key="url"
                :src="url"
                lazy
                :preview-src-list="urls"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="dynamic-type-special">
              <div class="special-left">
                <img src="../../../assets/img/boutique/english.jpg" alt="" />
                <!-- <div class="mask">
                  <span class="duration">16:43</span>
                </div> -->
                <div class="type-tag">
                  <span class="type-text">笔记</span>
                </div>
              </div>
              <div class="special-right">
                <div class="special-right-title">
                  <span>
                    【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                  </span>
                </div>
                <div class="special-right-intro">
                  <span
                    >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                  >
                </div>
                <div class="special-right-playinfo">
                  <span class="amount amount-play">
                    <!-- <i class="el-icon-video-play"></i> -->
                    <i class="iconfont icon-good"></i>
                    <span class="text">123</span>
                  </span>
                  <span class="amount amount-comment">
                    <!-- <i class="el-icon-chat-line-round"></i> -->
                    <i class="el-icon-star-off"></i>
                    <span class="text">231</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="dynamic-item-active">
            <span class="share">
              <i class="iconfont icon-fenxiang"></i>
              <span>转发</span>
            </span>
            <span class="praise">
              <!-- 赞 -->
              <i class="iconfont icon-good"></i>
              <span>21</span>
            </span>
            <!-- <span class="bad">
                   踩 
                      <i class="el-icon-chat-dot-square"></i>
                      <span>12</span>
                  </span> -->
            <!-- 讨论 -->
            <span class="discuss">
              <i class="el-icon-chat-dot-square"></i>
              <span>23</span>
            </span>
          </div>
        </div>
        <!-- 文字动态 -->
        <div class="dynamic-item">
          <div class="dynamic-item-header">
            <div class="di-header-left">
              <div class="dih-left-avatar">
                <img :src="userInfo.avatar" />
              </div>
              <div class="dih-left-info">
                <div class="username">青山随云走</div>
                <div class="time">1小时前</div>
              </div>
            </div>
            <el-popover placement="right" width="200" trigger="hover">
              <ul class="actions-info-more">
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>取消关注</span>
                </li>
                <li>
                  <i class="el-icon-warning-outline"></i>
                  <span>举报</span>
                </li>
                <li>
                  <i class="iconfont icon-buganxingqu1"></i>
                  <span>不感兴趣</span>
                </li>
              </ul>
              <div class="di-header-right" slot="reference">
                <i class="el-icon-more"></i>
              </div>
            </el-popover>
          </div>
          <div class="dynamic-item-content">
            <v-clamp
              class="di-content-wrapper"
              :autoresize="true"
              :max-lines="3"
              :tag="'div'"
              :max-height="120"
              :expanded="contentIsFold"
              :ellipsis="'...'"
              @clampchange="clampchange"
            >
              建了个读书编程英语和ChatGPT的星球，分享chatgpt账号和最新教程1、大圣的读书编程分享
              2、简历点评 3、chatgpt账号共享和使用问题4、英语学习
              5、前端面试题和资料分享 自由职业程序员，开读书编程分享 2、简历点评
              3、chatgpt账号共享和使用问题 4、英语学习 5、前端面试题和资料分享
              自由职业程序员，开源读书编程分享 2、简历点评
              3、chatgpt账号共享和使用问题 4、英语学习 5、前端面试题和资料分享
              自由职业程序员，开源源爱好者，持续研发优质编程课程。快加入一起进步吧
              选择加入即可获得 https://t.zsxq.com/0cNP53v7x
              <template slot="after">
                <span class="switch-btn" @click="foldContent()">
                  切换
                  <i class="el-icon-arrow-right"></i>
                </span>
              </template>
            </v-clamp>
          </div>
          <div class="dynamic-item-box" v-show="false">
            <div class="dynamic-type-normal more-than-one">
              <el-image
                v-for="url in urls"
                :key="url"
                :src="url"
                lazy
                :preview-src-list="urls"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="dynamic-type-special">
              <div class="special-left">
                <img src="../../../assets/img/boutique/english.jpg" alt="" />
                <div class="mask">
                  <span class="duration">16:43</span>
                </div>
                <div class="type-tag">
                  <span class="type-text">视频</span>
                </div>
              </div>
              <div class="special-right">
                <div class="special-right-title">
                  <span>
                    【暗中观察06】抄袭三年只赔2000块？爱情公寓5还敢继续拍？中国抄袭简史：永无止境的撕逼大战和大获成功的抄袭者们-IC实验室出品
                  </span>
                </div>
                <div class="special-right-intro">
                  <span
                    >这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本这是一段简介测试文本</span
                  >
                </div>
                <div class="special-right-playinfo">
                  <span class="amount amount-play">
                    <!-- <i class="el-icon-video-play"></i> -->
                    <i class="iconfont icon-good"></i>
                    <span class="text">123</span>
                  </span>
                  <span class="amount amount-comment">
                    <!-- <i class="el-icon-chat-line-round"></i> -->
                    <i class="el-icon-star-off"></i>
                    <span class="text">231</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="dynamic-item-active">
            <span class="share">
              <i class="iconfont icon-fenxiang"></i>
              <span>转发</span>
            </span>
            <span class="praise">
              <!-- 赞 -->
              <i class="iconfont icon-good"></i>
              <span>21</span>
            </span>
            <!-- <span class="bad">
                   踩 
                      <i class="el-icon-chat-dot-square"></i>
                      <span>12</span>
                  </span> -->
            <!-- 讨论 -->
            <span class="discuss">
              <i class="el-icon-chat-dot-square"></i>
              <span>23</span>
            </span>
          </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>