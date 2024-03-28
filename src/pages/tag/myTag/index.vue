<template>
  <div id="my-tag">
    <div class="myTag">
      <div class="myTag-list">
        <div class="myTag-item" v-for="item in data" :key="item.id">
          <div class="info-box">
            <router-link
              :to="{
                path: `tags/detail/${item.id}/${item.name}`,
              }"
            >
              <img :src="item.photo" alt="" />
              <div class="title">{{ item.name }}</div>
            </router-link>
            <div class="meta-box">
              <div class="meta subscribe">{{ item.userNum }} 关注</div>
            </div>
            <div class="meta-box">
              <div class="meta article">{{ item.blogNum }} 笔记</div>
              <div class="meta card">{{ item.blogNum }} 卡片</div>
              <div class="meta video">{{ item.blogNum }} 视频</div>
            </div>
          </div>
          <div class="action-box">
            <div
              :class="
                item.isSelect ? 'subscribe-btn subscribed' : 'subscribe-btn'
              "
            >
              <span>已关注</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="paging">
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
        </el-pagination> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { selectTags } from "@/api/tag.js";

export default {
  name: "MaTag",
  props: {
    // tagData: {type: Array}
  },
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData(name) {
      let res = await selectTags(name, this.userInfo.id);
      if (res.code === 200) {
        this.data = res.data.filter((item) => {
          return item.isSelect === 1;
        });
      }
    },
  },
  computed: {
    ...mapState("user", ["userInfo"]),
  },
};
</script>

<style lang="less">
#my-tag {
  padding-top: 20px;

  .myTag {
    .myTag-list {
      display: grid;
      grid-template-columns: repeat(4, 25%);
      flex-wrap: wrap;

      .myTag-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 209px;
        margin: 0 10px 10px 0;
        background-color: #fff;
        border-radius: 6px;
        padding: 12px 0;

        &:nth-child(4n) {
          margin: 0 0 10px 0;
        }

        .info-box {
          a {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 4px;

            img {
              object-fit: contain;
              width: 50px;
              height: 50px;
              margin: 4px auto;
              border-radius: 6px;
              border: 1px solid #f1f1f5;
            }

            .title {
              font-size: 18px;
              line-height: 24px;
              color: #333;
            }
          }

          .meta-box {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            color: #909090;
            .meta {
              line-height: 24px;
            }
            .subscribe {
            }
            .card,
            .video {
              margin-left: 10px;
            }
          }
        }

        .action-box {
          .subscribe-btn {
            margin: 14px auto;
            font-size: 14px;
            padding: 6px 12px;
            border-radius: 4px;
            border: 1px solid @primary-color;
            color: @primary-color;
            cursor: pointer;
          }
          .subscribed {
            background-color: @primary-color;
            color: #fff;
          }
        }
      }
    }
  }

  .paging {
    // margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>