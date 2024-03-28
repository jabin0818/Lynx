<template>
  <ul class="detailTag-List">
    <li class="detailTag-Item" v-for="(item, index) in data" :key="item.blogId">
      <div class="note-header">
        <span class="note-header-tag">笔记</span>
        <a
          class="note-header-title"
          @click="toNotesDetail(item.blogId, item.userId)"
        >
          <span>{{ item.title }}</span>
        </a>
      </div>
      <div class="note-content">
        <div
          class="note-content-img"
          @click="toNotesDetail(item.blogId, item.userId)"
        >
          <a>
            <img
              style="padding-top: 10px"
              :src="
                item.firstImg
                  ? item.firstImg
                  : require('@/assets/img/notes/test.png')
              "
            />
          </a>
        </div>
        <div class="note-content-text">
          <!-- <div class="note-uploader">
                                    <span class="note-uploader-icon">UP</span>
                                    <a class="note-uploader-name">秋霆是我</a>
                                    </div> -->
          <a
            class="note-deputy-text"
            @click="toNotesDetail(item.blogId, item.userId)"
          >
            <span class="note-content-desc">{{
              item.description ? item.description : item.content
            }}</span>
          </a>
          <div class="note-content-label">
            <span v-for="(item2, index2) in tagName(index)" :key="index2">{{
              item2
            }}</span>
          </div>
          <!-- 浏览量/点赞/评论 -->
          <div class="actions-info">
            <span class="collectLikeComment">
              <span class="views">
                <i class="el-icon-view"></i>
                <span>{{ item.views }}</span>
              </span>
              <span class="praise">
                <!-- 赞 -->
                <i class="el-icon-chat-dot-square"></i>
                <span>54</span>
              </span>
              <!-- <span class="bad">
                                        踩 
                                            <i class="el-icon-chat-dot-square"></i>
                                            <span>12</span>
                                        </span> -->
              <!-- 讨论 -->
              <span class="discuss">
                <i class="el-icon-chat-dot-square"></i>
                <span>{{ item.comment }}</span>
              </span>
              <!-- 收藏 -->
              <span class="collection">
                <i class="el-icon-star-off"></i>
                <span>3</span>
              </span>
              <el-popover placement="right" width="200" trigger="hover">
                <ul class="actions-info-more">
                  <li>
                    <i class="el-icon-warning-outline"></i>
                    <span>举报</span>
                  </li>
                  <li>
                    <i class="iconfont icon-buganxingqu1"></i>
                    <span>不感兴趣</span>
                  </li>
                </ul>
                <!-- <el-button >click 激活</el-button> -->
                <span slot="reference">
                  <i class="el-icon-more"></i>
                </span>
              </el-popover>
            </span>
            <span class="actions-info-date">
              {{ item.createTime }}
            </span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style>
</style>