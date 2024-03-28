<template>
  <div
    class="aside-notesToc"
    ref="asideNotesToc"
    :class="{ is_fixed: isFixed }"
    v-if="data"
  >
    <div class="aside-notesToc-header">
      <span class="aside-notesToc-title">
        <span>目录</span>
      </span>
    </div>
    <div
      class="aside-notesToc-main"
      id="notes-toc"
      v-html="data"
      @click="highLight"
    ></div>
  </div>
</template>

<script>
export default {
  name: "NotesToc",
  props: {
    data: { type: String },
  },
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    // 监听滚动
    this.handleScroll.call(this);
  },
  methods: {
    handleScroll(el) {
      window.addEventListener(
        "scroll",
        () => {
          var scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;
          if (scrollTop > 1285) {
            this.isFixed = true;
          } else {
            this.isFixed = false;
          }
        },
        true
      );
    },
    highLight(e) {
      document
        .querySelector(".toc-link-active")
        ?.classList.remove("toc-link-active");
      e.target.classList.add("toc-link-active");
    },
  },
};
</script>

<style lang="less" scoped>
.is_fixed {
  position: fixed;
  top: 10px;
  width: 290px;
}
.aside-notesToc {
  border-radius: 4px;
  border: 1px solid @levelThree-border-color;
  // box-shadow: @element-boxshadow0;
  margin-bottom: 20px;
  background-color: #fff;

  .aside-notesToc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid @levelOne-border-color;
    padding: 0 10px;

    .aside-notesToc-title {
      display: flex;
      align-content: center;

      span {
        font-size: 16px;
        font-weight: 600;
        color: @main-text-color;
      }
    }

    .aside-notesToc-more {
      display: flex;
      align-items: center;
      color: @minor-text-color;
      font-size: 14px;
      cursor: pointer;

      i {
        font-size: 14px;
      }
    }
  }

  .aside-notesToc-main {
    padding: 10px;
    overflow: auto;
    max-height: 657px;

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

    .aside-notesToc-list {
      display: flex;
      align-content: center;
      flex-wrap: wrap;

      .aside-notesToc-item {
        width: 100%;
        padding: 10px 0;
        cursor: pointer;

        .entry-title {
          line-height: 22px;
          font-size: 16px;
          font-weight: 400;
          color: #252933;
          overflow: hidden;
          white-space: normal;
          word-break: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;

          &:hover {
            color: @primary-color;
          }
        }

        .entry-meta-box {
          margin-top: 4px;

          .entry-meta {
            display: inline-block;
            font-size: 14px;
            line-height: 22px;
            color: #8a919f;
            font-weight: 400;
          }
        }
      }
    }
  }
}
#notes-toc {
  /deep/ * {
    .catalog-list {
      font-weight: 600;
      position: relative;
      font-size: 15px;

      a {
        border-radius: 4px;
        transition: background-color 0.2s;
      }
    }

    .toc-link-active {
      background-color: rgba(66, 129, 255, 0.08);

      &:hover {
        background-color: rgba(66, 129, 255, 0.1);
      }
    }

    & > li > a {
      font-size: 16px;
      position: relative;
      padding-left: 10px;
      line-height: 20px;
      color: @main-text-color;
    }

    ul,
    li {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    ul > li > a {
      font-size: 14px;
      color: @general-text-color;
      padding-left: 20px;
      font-weight: 500;
      position: relative;
    }

    ul > ul > li > a {
      line-height: 20px;
      font-size: 14px;
      color: @general-text-color;
      padding-left: 30px;
      font-weight: normal;
    }

    a {
      color: #000;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 6px 0;

      &:hover {
        background-color: #8b87870a;
      }
    }
  }
}
</style>