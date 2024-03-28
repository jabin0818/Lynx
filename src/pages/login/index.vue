<template>
  <!-- <div class="header-avatar" @mouseleave="() => { avatarVisi = true; floatCardVisi = false}">
        <img v-show="avatarVisi" :class="floatCardVisi === true ? 'avatarAnimation' : ''" class="avatar" shape="circle" :src="user.avatar" @mouseenter="() => { floatCardVisi = true }"/>
        <div class="floatCard" :class="floatCardVisi === true ? 'floatCardAnimation' : ''">
              <img class="floatCard-avatar" shape="circle" :src="user.avatar"/>
              <div class="floatCard-cont">
                <div style="width: 100%; padding-top: 25px;">
                    <div style="font-weight: bold; height: 25px;line-height: 25px; margin-top: 10px;">{{users}}</div>
                    <div class="floatCard-item" >
                        <a-icon type="security-scan" class="icon"/>
                        <span>一只猫</span>
                        <div style="width: 14px; height: 1px;"></div>
                    </div>
                    <div class="floatCard-item">
                        <a-icon type="setting" class="icon"/>
                        <span>两只猫</span>
                        <div style="width: 14px; height: 1px;"></div>
                    </div>
                    <div class="floatCard-item" >
                        <a-icon type="user" class="icon"/>
                        <span>三只猫</span>
                        <div style="width: 14px; height: 1px;"></div>
                    </div>
                    <div class="floatCard-item floatCard-item-footer">
                        <a-icon type="poweroff" class="icon"/>
                        <span>退出登录</span>
                        <div style="width: 14px; height: 1px;"></div>
                    </div>
                </div>
              </div>
      </div>
    </div> -->
  <!-- <div style="width: 900px; height:500px;border: 1px solid #ccc; text-align: center;">
        我是父组件
        接收子组件的参数是{{studentXH}}
        <Register :name="'黄俊彬'" @getxuehao="xuehao" />
    </div> -->
  <!-- <div style="width: 1300px">
    <v-clamp
      :autoresize="true"
      :max-lines="2"
      :tag="'div'"
      :max-height="90"
      :expanded="button"
      ref="testdiv"
    >
      <button
        v-for="item in 70"
        :key="item"
        @click="item == 70 ? change() : () => {}"
      >
        {{ item == 70 ? "chengclamped" : "clamped" + item }}
      </button>
      <template slot="after"
        ><button
          @click="
            () => {
              this.button = !this.button;
            }
          "
        >
          change
        </button></template
      >
    </v-clamp>
  </div> -->
  <div class="commentTestList">
    <div
      class="commentTestItem"
      v-for="(comment, index) in comments"
      :key="index"
    >
      <p
        ref="comment"
        v-limit-height="{
          heightMap: heightMap,
          index: index,
          toggle: toggleExpand,
        }"
      >
        {{ comment.content }}
      </p>
      <button v-if="heightMap[index] > 60" @click="toggleExpand(index)">
        {{ isExpandedMap[index] ? "收起" : "展开" }}
      </button>
    </div>
  </div>
</template>

<script>
import VClamp from "@boyuai/vue-clamp";
import Register from "../register/index.vue";
import { getNotesComment } from "@/api/comment.js";
import {
  uploadDynamic,
  getAllDynamics,
  deleteDynamics,
} from "@/api/dynamic.js";
export default {
  data() {
    return {
      comments: [],
      heightMap: {},
      isExpandedMap: {},
      query: {
        sortTimeOrTrending: true,
        page: 1,
        rows: 5,
      },
      finish: false,
      hasNext: false,
      total: 0,
    };
  },
  async mounted() {
    await this.getDynamciData(false);
    this.$nextTick(() => {
      this.comments.forEach((comment, index) => {
        this.updateHeightMap(this.$refs.comment[index], index);
      });
    });
  },
  methods: {
    updateHeightMap(el, index) {
      if (!el) {
        return;
      }
      this.heightMap[index] = el.scrollHeight;
      el.style.maxHeight = "60px";
      el.style.overflow = "hidden";
      el.style.transition = "max-height 0.3s ease";
    },
    toggleExpand(index) {
      this.$set(this.isExpandedMap, index, !this.isExpandedMap[index]);
      // this.updateHeightMap(this.$refs.comment[index], index);
    },
    async getDynamciData(isLoadMore) {
      if (!isLoadMore) {
        this.query.page = 1;
      }
      this.finish = false;

      let res = await getAllDynamics(
        "1812446557",
        this.query.page,
        this.query.rows
      );
      if (res.code === 200) {
        if (isLoadMore) {
          this.comments = this.comments.concat(res.data.data);
        } else {
          this.comments = res.data.data;
        }
        this.total = res.data.count;
        this.finish = true;
        if (this.total > this.comments.length) {
          this.hasNext = true;
        } else {
          this.hasNext = false;
        }
      } else {
        this.$message.error("网络繁忙！");
      }
    },
  },
  directives: {
    limitHeight: {
      bind(el, binding) {
        el.style.display = "none";
        setTimeout(() => {
          el.style.display = "block";
          const { index, heightMap } = binding.value;
          heightMap[index] = el.scrollHeight;
          el.style.maxHeight = "60px";
          el.style.overflow = "hidden";
          el.style.transition = "max-height 0.3s ease";
        }, 0);
      },
      update(el, binding) {
        const { index, heightMap } = binding.value;
        if (heightMap[index]) {
          el.style.maxHeight = this.isExpandedMap[index]
            ? `${heightMap[index]}px`
            : "60px";
        }
      },
    },
  },
};
// export default {
//   name: "Login",
//   components: {
//     Register,
//     VClamp,
//   },
//   data() {
//     return {
//       avatarVisi: true,
//       floatCardVisi: false,
//       studentXH: "",
//       text: "对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版本。请确保按如下指导配对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版置相关工具。对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版本。请确保按如下指导配置相关工具。自动引入未经转译的 ES Module 版本。请确保按如下指导配置相关工具。对于基于 webpack 的项目， import 会自动引入未经转译的 ES Module 版本。请确保按如下指导配置相关工具。v",
//       button: true,
//     };
//   },
//   methods: {
//     xuehao(xh) {
//       console.log(xh);
//       this.studentXH = xh;
//     },
//     change() {
//       console.log(1);
//       this.button = !this.button;
//       console.log(this.$refs.testdiv);
//       console.log(this.$refs.testdiv.offset);
//       console.log(this.$refs.testdiv.realNonTextNodes.length);
//     },
//   },
// };
</script>

<style lang="less" scoped>
// .header-avatar {
//   width: 55px;
//   height: 100%;
//   position: relative;
//   line-height: 54px;
//   text-align: center;
//   margin: 0 auto;
//   .avatar {
//     cursor: pointer;
//     width: 30px;
//     height: 30px;
//     border-radius: 50%;
//     border: 2px solid #000;
//   }
// }
// .avatarAnimation {
//   animation: avatarAnimation 0.5s forwards;
//   // transform: translate3d(-50%,0,0);
//   // transition: all 0.5s;
//   -webkit-animation: avatarAnimation 0.5s forwards; /* Safari 和 Chrome */
// }
// .floatCardAnimation {
//   display: block !important;
//   animation: floatCardAnimation 0.5s forwards;
//   -webkit-animation: floatCardAnimation 0.5s forwards; /* Safari 和 Chrome */
// }
// @keyframes floatCardAnimation {
//   0% {
//     opacity: 0;
//   }
//   100% {
//     opacity: 1;
//   }
// }
// @keyframes avatarAnimation {
//   0% {
//     width: 30px;
//     height: 30px;
//   }
//   100% {
//     width: 82px;
//     height: 82px;
//     transform: translate(-9.5px, 30px); /**下移元素**/
//     //   -ms-transform:translate(-10px, 27px);
//     //   -webkit-transform:translate(-10px, 27px);
//   }
// }
// .floatCard {
//   display: none;
//   width: 150px;
//   position: absolute;
//   top: 30px;
//   left: calc(~"(-50px - 8px + 1px)");
//   .floatCard-avatar {
//     height: 82px;
//     width: 82px;
//     float: left;
//     margin-left: calc(~"(50% - 25px)");
//     border-radius: 50%;
//     border: 2px solid #000;
//   }
//   .floatCard-cont {
//     background-color: #fff;
//     margin-top: 25px;
//     box-shadow: 0 2px 5px rgba(24, 31, 36, 14);
//     padding: 0 0 15px 0;
//   }
// }

// button {
//   // width: 111px;
//   padding: 0 10px;
//   height: 30px;
//   margin-right: 10px;
// }

.commentTestList {
  width: 1000px;
  height: 600px;

  .commentTestItem {
    width: 1000px;
    height: 200px;
  }
}

p {
  margin: 0 0 10px;
  padding: 0;
  line-height: 1.5;
}

button {
  display: block;
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ddd;
}
</style>