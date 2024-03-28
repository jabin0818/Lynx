<template>
  <div class="cardLearnMode">
    <el-dialog
      :visible="visible"
      :modal-append-to-body="false"
      width="400px"
      class="cardLearnMode-dialog"
      :center="true"
      @open="open"
      @close="close"
    >
      <div class="dropdown-setting-container">
        <div class="select-panel">
          <div
            :class="
              learningStyle === 0
                ? 'type-select-item learnStyle-selected'
                : 'type-select-item'
            "
            @click="changeLearningStyle($event, 0)"
          >
            <div class="type-item-icon">
              <i class="el-icon-s-order"></i>
            </div>
            <div class="type-item-detail">
              <div class="type-title">顺序学习</div>
              <div class="type-desc">按卡片的顺序学习全部卡片</div>
            </div>
          </div>
          <div
            :class="
              learningStyle === 1
                ? 'type-select-item learnStyle-selected'
                : 'type-select-item'
            "
            @click="changeLearningStyle($event, 1)"
          >
            <div class="type-item-icon">
              <i class="el-icon-s-order"></i>
            </div>
            <div class="type-item-detail">
              <div class="type-title">随机学习</div>
              <div class="type-desc">按随机的方式学习全部卡片</div>
            </div>
          </div>
          <div
            :class="
              learningStyle === 2
                ? 'type-select-item learnStyle-selected'
                : 'type-select-item'
            "
            @click="changeLearningStyle($event, 2)"
          >
            <div class="type-item-icon">
              <i class="el-icon-s-finance"></i>
            </div>
            <div class="type-item-detail">
              <div class="type-title">复习</div>
              <div class="type-desc">复习已学会的卡片</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "cardLearnMode",
  props: {
    visible: { type: Boolean, default: false },
    learningStyle: { type: Number, default: 0 },
  },
  data() {
    return {};
  },
  methods: {
    open() {},
    close() {
      this.$emit("closeCardLearnMode");
    },
    changeLearningStyle(event, learningStyle) {
      if (event) {
        let dom = document.querySelector(".learnStyle-selected");
        if (dom) {
          dom.classList.remove("learnStyle-selected");
        }
        event.currentTarget.classList.add("learnStyle-selected");
        if (this.learningStyle != learningStyle) {
          this.$emit("changeLearningStyle", learningStyle);
          this.close();
        }
      }
    },
  },
};
</script>

<style lang="less">
.cardLearnMode {
  .cardLearnMode-dialog {
    .dropdown-setting-container {
      width: 100%;
      padding: 6px 0;
      background: #fff;
      border-radius: 4px;

      .select-panel {
        display: flex;
        flex-direction: column;
        padding: 0 12px 12px;

        .type-select-item {
          display: flex;
          align-items: center;
          background: #f0f0f0;
          margin-top: 12px;
          border-radius: 4px;
          padding: 12px;
          cursor: pointer;
          border: 1px solid transparent;

          &.learnStyle-selected {
            background: rgba(66, 129, 255, 0.1);
            border: 1px solid #b9daef;
          }

          .type-item-icon {
            i {
              font-size: 18px;
            }
          }

          .type-item-detail {
            margin-left: 8px;
            .type-title {
              font-weight: 500;
              font-size: 16px;
              text-align: left;
            }

            .type-desc {
              font-size: 14px;
              margin-top: 4px;
              color: #5f5f64;
            }
          }
        }
      }
    }
  }
}
</style>