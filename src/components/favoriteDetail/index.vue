<template>
  <div class="favDetail" v-if="conditions">
    <el-dialog
      :visible="favoriteDetailVisible"
      width="446px"
      class="favDetail-dialog"
      :center="true"
      @open="open"
      @close="close"
      title="查看收藏夹"
    >
      <div class="favDetail-wrapper">
        <div class="favorite-item">
          <div
            class="star-first-word"
            :style="'background-color: ' + favoriteDetailInfo.color"
          >
            <span>{{ favoriteDetailInfo.groupText }}</span>
          </div>
          <div class="star-base-info">
            <div class="name">{{ favoriteDetailInfo.groupName }}</div>
            <div class="num">{{ favoriteDetailInfo.collectionNum }}个内容</div>
          </div>
        </div>
        <div class="fav-item">
          <div class="label">收藏夹名称:</div>
          <div class="text">{{ favoriteDetailInfo.groupName }}</div>
        </div>
        <div class="fav-item">
          <div class="label">收藏夹简介:</div>
          <div class="text">
            {{ favoriteDetailInfo.groupDescription }}
          </div>
        </div>
        <!-- <div class="fav-item">
          <div class="label">创建者:</div>
          <div class="text"></div>
        </div> -->
        <div class="fav-item">
          <div class="label">创建者时间:</div>
          <div class="text">
            {{ favoriteDetailInfo.createTime }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AddFavForm",
  props: {
    addFavModalVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formModel: {
        favName: "",
        favDesc: "",
        favColor: "",
        favFirstWord: "语",
      },
      color: [
        {
          code: "#4281ff",
          name: "主题蓝",
        },
        {
          code: "#67C23A",
          name: "绿",
        },
        {
          code: "#E6A23C",
          name: "黄",
        },
        {
          code: "#f97d1c",
          name: "橙",
        },
        {
          code: "#4b1e2f",
          name: " 紫",
        },
        {
          code: "#efafad",
          name: "粉",
        },
        {
          code: "#F56C6C",
          name: "红",
        },
        {
          code: "#909399",
          name: "灰",
        },
      ],
    };
  },
  methods: {
    open() {
      console.log("open");
    },
    close() {
      console.log("close");
      this.$store.state.global.favoriteDetailVisible = false;
    },
  },
  computed: {
    ...mapState("global", ["favoriteDetailVisible", "favoriteDetailInfo"]),
    conditions() {
      return JSON.stringify(this.favoriteDetailInfo) !== "{}";
    },
  },
};
</script>

<style lang="less" scoped>
.favDetail {
  .favDetail-dialog {
    .favDetail-wrapper {
      .favorite-item {
        display: flex;
        align-items: center;
        padding: 10px;
        height: 60px;
        border-radius: 6px;
        margin-bottom: 30px;
        cursor: pointer;

        background-color: #e3e5e7;
        .star-first-word {
          width: 40px;
          height: 40px;
          min-width: 40px;
          margin-right: 8px;
          border-radius: 50%;
          text-align: center;
          line-height: 40px;
          color: #fff;
          font-size: 18px;
        }

        .star-base-info {
          width: 78%;

          .name {
            font-size: 14px;
            margin-bottom: 6px;
            color: #000;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }

          .num {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .fav-item {
        margin-bottom: 24px;
        .label {
          font-size: 14px;
          color: #000;
          margin-bottom: 5px;
        }

        .text {
          font-size: 14px;
          color: @general-text-color;
        }
      }
    }
  }
}
</style>