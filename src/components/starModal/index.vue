<template>
  <div class="shareModal">
    <el-dialog
      :visible="collectionVisible"
      width="446px"
      class="shareModal-dialog"
      :center="true"
      @open="open"
      @close="close"
      title="添加到收藏夹"
    >
      <div class="shareModal-wrapper">
        <div class="body-wrapper" @scroll="favListScroll">
          <div
            class="favorite-item"
            v-for="item in favData"
            :key="item.id"
            @click="selectAddFavorite($event, item.id)"
          >
            <input class="favorite-item-input" type="checkbox" :id="item.id" />
            <label class="favorite-item-wrapper" :for="item.id">
              <div
                class="star-first-word"
                :style="'background-color: ' + item.color"
              >
                <span>{{ item.groupText }}</span>
              </div>
              <div class="star-base-info">
                <div class="name" :title="item.groupName">
                  {{ item.groupName }}
                </div>
                <div class="num">
                  {{ item.collectionNum ? item.collectionNum : 0 }}个内容
                </div>
              </div>
            </label>
          </div>
          <div class="loadMoreText">
            <i class="el-icon-loading" v-show="!loadingFinished"></i>
            <span v-show="loadingFinished">{{
              hasNextPage ? "加载更多" : "暂无更多数据"
            }}</span>
          </div>
          <div class="favorite-body-footer" ref="addFavoriteBoxWrap">
            <div
              class="add-favorite"
              ref="addFavoriteBox"
              contenteditable="false"
              @click="changeBeInput"
              @blur="addFavBlur"
              @input="addFavChange"
              :style="isInputState ? '' : 'width:100%;text-align: center;'"
              :prompt="isInputState ? '请输入收藏夹名称' : ''"
            >
              <div v-if="!isInputState">
                <i class="el-icon-plus"></i>
                <span>新建收藏夹</span>
              </div>
            </div>
            <div
              class="add-favorite-confirm"
              v-show="isInputState"
              @click="addNewCollect()"
            >
              <span>新建</span>
            </div>
          </div>
        </div>
        <div class="submitBtn-wrapper">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitFormBtn">确 定</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { insertCollect, cancelCollection, selectFavorites } from "@/api/star";
import { mapState } from "vuex";
export default {
  name: "StarModal",
  data() {
    return {
      isInputState: false, //新建收藏夹按钮是否是输入框状态
      query: {
        page: 1,
        rows: 6,
      },
      favData: [],
      collectId: null, //选择的收藏夹的id
      count: 0,
      hasNextPage: false,
      loadingFinished: false,
    };
  },
  async mounted() {
    await this.getFav(false);
  },
  methods: {
    async getFav(isLoadMore) {
      if (!this.isLogin) return;
      if (!isLoadMore) {
        this.query.page = 1;
      }
      this.loadingFinished = false;
      let res = await selectFavorites(this.query.page, this.query.rows);
      console.log("获取收藏夹的接口：", res);
      if (res.code === 200) {
        if (!res.data) return;
        if (isLoadMore) {
          this.favData = this.favData.concat(res.data.data);
        } else {
          this.favData = res.data.data;
        }
        this.count = res.data.count;
        this.loadingFinished = true;

        if (this.count > this.favData.length) {
          this.hasNextPage = true;
        } else {
          this.hasNextPage = false;
        }
      } else {
        this.$message.error("网络繁忙！");
      }
    },
    open() {
      // console.log("open");
    },
    close() {
      this.isInputState = false;
      this.$refs.addFavoriteBox.innerHTML =
        "<div><i class='el-icon-plus'></i><span>新建收藏夹</span></div>";
      this.$store.state.global.collectionVisible = false;
    },
    favListScroll(e) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;

      if (
        this.hasNextPage &&
        this.loadingFinished &&
        parseInt(scrollHeight - scrollTop) <= clientHeight
      ) {
        this.query.page++;
        this.getFav(true);
      }
    },
    selectAddFavorite(e, id) {
      if (e.target.tagName === "INPUT") {
      } else {
        e.preventDefault(); //阻止默认事件
      }
      if (this.collectId && this.collectId !== id) {
        let lastbox = document.getElementById(`${this.collectId}`);
        lastbox.checked = false;
      } else if (this.collectId && this.collectId === id) {
        let lastbox = document.getElementById(`${this.collectId}`);
        lastbox.checked = false;
        this.collectId = null;
        document.querySelector(".active")?.classList.remove("active");
        return;
      }
      let box = document.getElementById(`${id}`);
      box.checked = true;
      this.collectId = id;
      document.querySelector(".active")?.classList.remove("active");
      e.currentTarget.classList.add("active");
    },
    changeBeInput(e) {
      if (this.isInputState) return;
      e.currentTarget.innerHTML = "";
      e.currentTarget.setAttribute("contenteditable", true);
      this.isInputState = true;
    },
    addFavBlur(e) {
      // this.isInputState = false;
      // e.currentTarget.innerHTML =
      //   "<div><i class='el-icon-plus'></i><span>新建收藏夹</span></div>";
    },
    addFavChange(e) {
      if (e.currentTarget.innerText === "") {
        e.currentTarget.setAttribute("prompt", "请输入收藏夹名称");
      } else {
        e.currentTarget.setAttribute("prompt", "");
      }
    },
    async submitFormBtn() {
      if (JSON.stringify(this.collectionContentInfo) !== "{}") {
        let res = await insertCollect({
          collectId: this.collectionContentInfo.id,
          type: this.collectionContentInfo.type,
          id: this.collectId,
        });
        console.log("添加到收藏夹接口：", res);
        if (res.code === 200) {
          this.$message.success("添加成功！");
          this.close();
        } else {
          this.$message.error("添加失败！");
        }
      }
    },
    async addNewCollect() {
      let favName = this.$refs.addFavoriteBox.innerText;
      console.log(favName);
      if (favName !== "") {
        let res = await insertCollect({
          groupName: favName,
          color: "#4281ff",
        });
        console.log("创建收藏夹的接口", res);
        if (res.code === 200) {
          this.$message.success("创建成功！");
          this.isInputState = false;
          this.$refs.addFavoriteBox.innerHTML =
            "<div><i class='el-icon-plus'></i><span>新建收藏夹</span></div>";
          this.getFav(false);
        }
      } else {
        this.$message.error("请输入收藏夹名称！");
      }
    },
  },
  computed: {
    ...mapState("global", ["collectionVisible", "collectionContentInfo"]),
    ...mapState("user", ["isLogin"]),
  },
};
</script>

<style lang="less" scoped>
.shareModal {
  .shareModal-dialog {
    .shareModal-wrapper {
      .body-wrapper {
        max-height: 400px;
        overflow: auto;
        margin-bottom: 20px;
        border-bottom: 1px solid #e5e9ef;
        &::-webkit-scrollbar {
          width: 6px;
          height: 6px;
          border-radius: 8px;
          background-color: rgba(255, 255, 255, 0.1);
        }

        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
          border-radius: 8px;
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 8px;
          box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
          background-color: #c8c8c8;
        }

        .favorite-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          height: 60px;
          cursor: pointer;
          &:hover {
            background-color: #e3e5e7;
          }

          &.active {
            background-color: #e3e5e7;
          }

          .favorite-item-input {
            width: 20px;
            height: 20px;
          }

          .favorite-item-wrapper {
            display: flex;
            align-items: center;
            width: 90%;
            .star-first-word {
              width: 40px;
              height: 40px;
              font-size: 18px;
              min-width: 40px;
              margin-right: 8px;
              border-radius: 50%;
              text-align: center;
              line-height: 40px;
              color: #fff;
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
        }

        .loadMoreText {
          font-size: 12px;
          color: #999;
          text-align: center;
          i {
            font-size: 14px;
            margin-left: 10px;
          }
        }

        .favorite-body-footer {
          height: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
          .add-favorite {
            position: relative;
            width: 80%;
            height: 100%;
            background-color: #f1f1f5;
            color: #92929d;
            border-radius: 6px;
            padding: 10px;
            outline: none;
            border: 1px solid #92929d;

            &::after {
              content: attr(prompt);
              position: absolute;
              top: 0;
              left: 6px;
              line-height: 38px;
              padding: 0 5px;
              border-radius: 9px;
              font-size: 14px;
              text-align: center;
              white-space: nowrap;
              color: #92929d;
            }
            i {
              //   font-size: 16px;
              //   font-weight: 500;
              //   margin-right: 10px;
            }
            span {
              //   font-size: 13px;
            }
          }

          .add-favorite-confirm {
            width: 20%;
            height: 100%;
            border-radius: 6px;
            margin-left: 5px;
            background-color: @primary-color;
            color: #fff;
            font-size: 14px;
            padding: 10px;
            text-align: center;
            cursor: pointer;
          }
        }
      }

      .submitBtn-wrapper {
        text-align: center;
      }
    }
  }
}
</style>