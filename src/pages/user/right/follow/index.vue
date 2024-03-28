<template>
  <div id="follow-block">
    <div class="follow-block-headers">
      <a class="follow-item" @click="toUserFollow">
        <div class="item-count">{{ numFoll ? numFoll : "0" }}</div>
        <div class="item-title">关注</div>
      </a>
      <a class="follow-item" @click="toUserFans">
        <div class="item-count">{{ fans ? fans : "0" }}</div>
        <div class="item-title">粉丝</div>
      </a>
      <a class="follow-item" @click="toUserNotes">
        <div class="item-count">{{ numPub ? numPub : "0" }}</div>
        <div class="item-title">发布</div>
      </a>
    </div>
    <!-- <div class="follow-block-mian">
      <a class="follow-item">
        <div class="item-title">收藏夹</div>
        <div class="item-count">12</div>
      </a>
      <a class="follow-item">
        <div class="item-title">关注标签</div>
        <div class="item-count">42</div>
      </a>
      <a class="follow-item">
        <div class="item-title">加入时间</div>
        <div class="item-count">2022-09-17</div>
      </a>
    </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Follow",
  props: {
    numFoll: { type: Number },
    numPub: { type: Number },
    fans: { type: Number },
  },
  methods: {
    toUserFollow() {
      this.$router.push(`/user/${this.$route.params.id}/follow`);
    },
    toUserFans() {
      this.$router.push(`/user/${this.$route.params.id}/fans`);
    },
    toUserNotes() {
      this.$router.push(`/user/${this.$route.params.id}/notes`);
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
#follow-block {
  margin-top: 10px;

  .follow-block-headers {
    display: flex;
    margin-bottom: 10px;
    background-color: #fff;
    border-radius: 6px;
    // box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);

    .follow-item {
      flex: 1 1 auto;
      padding: 15px 0;
      text-align: center;
      cursor: pointer;
      &:hover .item-count,
      &:hover .item-title {
        color: @primary-color;
      }
      .item-count {
        color: #31445b;
        margin-top: 6px;
        margin-bottom: 6px;
        font-size: 18px;
        font-weight: 600;
        transition: color 0.25s;
      }

      .item-title {
        color: #666;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .follow-block-mian {
    background-color: #fff;
    border-radius: 6px;
    // box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);

    .follow-item {
      display: flex;
      padding: 12px 18px;
      font-size: 14px;
      color: #000;
      border-top: 1px solid rgba(230, 230, 231, 0.5);

      .item-title {
        margin-right: auto;
      }

      .item-count {
      }
    }
  }
}
</style>