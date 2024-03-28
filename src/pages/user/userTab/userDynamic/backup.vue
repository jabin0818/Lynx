<template>
  <div>
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
            5、前端面试题和资料分享 自由职业程序员，开源读书编程分享 2、简历点评
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
              <img src="../../../../assets/img/boutique/english.jpg" alt="" />
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
            5、前端面试题和资料分享 自由职业程序员，开源读书编程分享 2、简历点评
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
              <img src="../../../../assets/img/boutique/english.jpg" alt="" />
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
            5、前端面试题和资料分享 自由职业程序员，开源读书编程分享 2、简历点评
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
              <img src="../../../../assets/img/boutique/english.jpg" alt="" />
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
              <img src="../../../../assets/img/boutique/english.jpg" alt="" />
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
  </div>
</template>
<script>
export default {
  name: 'APP',
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style lang="scss" scoped>

</style>
