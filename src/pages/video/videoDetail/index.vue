<template>
  <el-container id="detail-video">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <el-row class="video-detail-container">
        <el-col :span="18" class="video-detail-contents">
          <VideoContent @commentFlag="receiveCommentFlag" />
          <!-- <VideoComment /> -->
          <Comment
            @handleSelectComment="getCommentData"
            @handleinsertComment="insertComment"
            @handleDeleteComment="deleteComment"
            @handleLikeComment="likeComment"
          />
        </el-col>
        <el-col :span="6" class="video-detail-right">
          <AuthorBlock :authorId="authorId" />
          <RelatVideo :relatType="relatType" />
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
    <ShareModal />
    <StarModal />
  </el-container>
</template>

<script>
import Header from "@/components/header/index";
import AuthorBlock from "@/components/right/authorBlock/index.vue";
import RelatVideo from "./relatVideo";
import VideoContent from "./videoContent";
// import VideoComment from "./videoComment";
import Comment from "@/components/comment";
import SideToolbar from "@/components/sideToolbar/index";
import ShareModal from "@/components/shareModal";
import StarModal from "@/components/starModal";

import {
  getVideoComment,
  insertVideoComment,
  deleteVideoComment,
  likeVideoComment,
} from "@/api/comment.js";
import { mapState } from "vuex";

export default {
  name: "VideoDetail",
  components: {
    Header,
    AuthorBlock,
    VideoContent,
    // VideoComment,
    Comment,
    RelatVideo,
    SideToolbar,
    ShareModal,
    StarModal,
  },
  data() {
    return {
      authorId: "",
      isOpenComment: true,
      relatType: "",
      config: {
        total: 0,
        comments: [],
      },
    };
  },
  mounted() {},
  methods: {
    receiveCommentFlag(e) {
      this.isOpenComment = e.isOpenComment;
      this.authorId = e.authorId;
      this.relatType = e.relatType;
    },
    async getCommentData(query, cab) {
      let res = await getVideoComment(
        this.$route.params.id,
        query.sortTimeOrTrending,
        query.page,
        query.rows,
        this.userInfo?.id
      );
      if (res.code === 200) {
        this.config.comments = res.data.list;
        this.config.total = res.data.total;
        cab(this.config);
      }
    },
    async insertComment(query, cab) {
      let res = await insertVideoComment(
        this.userInfo.id,
        this.userInfo.account,
        this.userInfo.username,
        this.$route.params.id,
        query.commentAdmin,
        query.commentContent,
        this.userInfo.avatar,
        query.firstParentId,
        query.parentCommentId
      );
      if (res.code === 200) {
        cab();
      }
    },
    async deleteComment(query, cab) {
      let result = await deleteVideoComment(query.id);
      if (result.code === 200) {
        cab();
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
#detail-video {
  background-color: #fff;
  .el-main {
    width: 1245px;
    overflow: hidden !important;

    // @media screen and (max-width: 1200px) {
    //   width: 1100px;
    // }

    @media screen and (max-width: 1140px) {
      width: 100%;
    }
  }

  .video-detail-container {
    .video-detail-contents {
      //   border-right: 20px solid #f6f7f9;
      border-right: 20px solid #fff;
      border-radius: 4px;

      @media screen and (max-width: 1000px) {
        width: 100% !important;
        border-right: none;
      }
    }

    .video-detail-right {
      @media screen and (max-width: 1000px) {
        display: none;
      }
      border-radius: 4px;
    }
  }
}
</style>