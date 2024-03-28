<template>
  <el-container id="detail-notes" style="background-color: #f6f7f9">
    <el-header>
      <Header />
    </el-header>
    <el-main>
      <div class="article-left-buttons">
        <!-- 按钮 -->
        <LeftButtons
          :dyData="leftButtonsData"
          @changeLeftButtonsData="changeLeftButtonsData"
        />
      </div>
      <el-row class="notes-container">
        <el-col :span="18" class="notes-contents">
          <NotesContent @initTypeIds="initTypeIds" />
          <div style="height: 20px"></div>
          <!-- <NotesComment /> -->
          <Comment
            @handleSelectComment="getCommentData"
            @handleinsertComment="insertComment"
            @handleDeleteComment="deleteComment"
            @handleLikeComment="likeComment"
          />
        </el-col>
        <el-col :span="6" class="notes-right">
          <AuthorBlock :authorId="authorId" class="notes-right-authorBlock" />
          <HotTag :title="'相关标签'" />
          <RelatNotes :data="relatNotesData" />
          <AuthorsRank />
          <NotesToc :data="notesToc" />
        </el-col>
      </el-row>
      <SideToolbar />
    </el-main>
    <ShareModal />
    <StarModal />
  </el-container>
</template>

<script>
import Header from "@/components/header";
import SideToolbar from "@/components/sideToolbar";
import LeftButtons from "./leftButtons";
import NotesContent from "./notesContent";
// import NotesComment from "./notesComment";
import Comment from "@/components/comment";
import AuthorBlock from "@/components/right/authorBlock";
import HotTag from "@/components/right/hotTag";
import RelatNotes from "@/components/right/relat";
import AuthorsRank from "@/components/right/authorsRank";
import NotesToc from "./notesToc";
import ShareModal from "@/components/shareModal";
import StarModal from "@/components/starModal";
import {
  getNotesComment,
  insertComment,
  deleteComment,
  likeNotesComment,
} from "@/api/comment.js";
import { getBoundNotes } from "@/api/notes";
import { mapState } from "vuex";

export default {
  name: "Notes",
  components: {
    Header,
    LeftButtons,
    NotesContent,
    // NotesComment,
    Comment,
    SideToolbar,
    AuthorBlock,
    HotTag,
    RelatNotes,
    AuthorsRank,
    ShareModal,
    StarModal,
    NotesToc,
  },
  data() {
    return {
      relatNotesData: [],
      typeId: "",
      authorId: "",
      notesToc: "",
      leftButtonsData: {
        noteId: "",
        isLike: false,
        isStar: false,
        likeNum: 0,
        commentNum: 0,
        starNum: 0,
        shareNum: 0,
      },
      config: {
        total: 0,
        comments: [],
      },
    };
  },
  async mounted() {},
  methods: {
    async getRelatNotesData() {
      if (this.typeId) {
        let res = await getBoundNotes(this.typeId);
        // console.log(res);
        if (res.code === 200) {
          this.relatNotesData = res.data;
        }
      }
    },
    async initTypeIds(val) {
      this.authorId = val.authorId;
      this.typeId = val.typeId;
      this.notesToc = val.notesToc;

      this.leftButtonsData.noteId = val.noteId;
      this.leftButtonsData.isLike = val.isLike;
      this.leftButtonsData.isStar = val.isStar;
      this.leftButtonsData.likeNum = val.likeNum;
      this.leftButtonsData.commentNum = val.commentNum;
      this.leftButtonsData.starNum = val.starNum;
      this.leftButtonsData.shareNum = val.shareNum;
      await this.getRelatNotesData();
    },
    changeLeftButtonsData(obj) {
      for (let k in obj) {
        this.leftButtonsData[k] = obj[k];
      }
    },
    async getCommentData(query, cab) {
      try {
        let res = await getNotesComment(
          this.$route.params.id,
          query.sortTimeOrTrending,
          query.page,
          query.rows
        );
        if (res.code === 200) {
          this.config.comments = res.data.list;
          this.config.total = res.data.total;
          cab(this.config);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async insertComment(query, cab) {
      let res = await insertComment(
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
      let result = await deleteComment(query.id);
      if (result.code === 200) {
        cab();
      }
    },
    async likeComment(query, cab) {
      let result = await likeNotesComment(query.id);
      console.log("笔记评论点赞的接口：", result);
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
#detail-notes {
  .el-main {
    width: 1200px;
    overflow: hidden !important;

    @media screen and (max-width: 1200px) {
      width: 100%;
    }
  }
}

.article-left-buttons {
  position: fixed;
  margin-left: -82px;
  top: 140px;
  z-index: 2;
}

.notes-container {
  .notes-contents {
    border-right: 20px solid #f6f7f9;
    border-radius: 4px;

    @media screen and (max-width: 1000px) {
      width: 100% !important;
      border-right: none;
    }
  }

  .notes-right {
    @media screen and (max-width: 1000px) {
      display: none;
    }
    border-radius: 4px;
    .notes-right-authorBlock {
      padding: 20px;
    }
  }
}
</style>