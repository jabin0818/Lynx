<template>
  <div id="user-level">
    <div class="user-level-headers">
      <div class="ul-headers-text">经验等级</div>
    </div>
    <div class="user-level-body">
      <div class="user-level-top">
        <span class="user-level-all">
          <div class="progress-top">
            <span class="level-txt"> 你的等级 LV5 </span>
            <span class="level-number">
              <i class="now-num">20640</i>
              <i class="num-icon">/</i>
              <i class="max-num">28800</i>
            </span>
          </div>

          <div class="progress-wrap">
            <!-- <div class="progress-head">LV5</div> -->
            <div class="progress-level-up">
              <span class="home-top-level-upgo" style="width: 71.67%"></span>
            </div>
            <span class="progress-level-mask"></span>
          </div>
        </span>
      </div>
      <!-- <div class="user-level-xb">
        <span class="coin">
          <i class="el-icon-coin"></i>
          1
        </span>
        <span class="coin">
          <i class="el-icon-coin"></i>
          4
        </span>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Level",
};
</script>

<style lang="less">
#user-level {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);

  .user-level-headers {
    display: flex;
    height: 40px;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;

    .ul-headers-text {
      font-synthesis: style;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
  }

  .user-level-body {
    padding: 12px;

    .user-level-top {
      position: relative;
      background-color: rgba(66, 129, 255, 0.06);
      padding: 4px 8px;
      border-radius: 4px;

      .user-level-all {
        display: inline-block;
        width: 100%;

        .progress-wrap {
          display: flex;
          position: relative;
          width: 100%;

          // .progress-head{
          //   background-position: -264px -852px;
          //   width: 48px;
          //   height: 20px;
          //   font-weight: 700;
          //   color: @primary-color;
          //   text-align: center;
          //   font-size: 12px;
          //   line-height: 20px;
          //   cursor: default;
          //   display: inline-block;
          //   background-color: rgba(66, 129, 255, .2);
          //   border-radius: 4px 0 0 4px;
          // }
          .progress-level-up {
            width: 100%;
            height: 10px;
            line-height: 10px;
            background-color: rgba(66, 129, 255, 0.3);
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            display: inline-block;
            position: relative;
            text-indent: -9999px;
            text-align: center;

            .home-top-level-upgo {
              position: absolute;
              top: 0;
              left: 0;
              background-color: @primary-color;
              width: 0;
              height: 10px;
              transition: all 0.3s ease-in-out;
              transition-delay: 0.3s;
              border-radius: 4px;
            }
          }
          .progress-level-mask {
            position: absolute;
            width: 260px;
            box-sizing: border-box;
            padding: 20px;
            top: 33px;
            left: -15px;
            z-index: 999;
            background-color: #fff;
            border: 1px solid #e5e9ef;
            border-radius: 4px;
            font-size: 12px;
            color: #6d757a;
            line-height: 10px;
            box-shadow: 0 2px 4px rgb(0 0 0 / 14%);
            display: none;
          }
        }
        .progress-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;

          .level-txt {
            background-position: -264px -852px;
            // width: px;
            height: 20px;
            font-weight: 700;
            color: @primary-color;
            text-align: center;
            font-size: 12px;
            cursor: default;
            display: inline-block;
            // background-color: rgba(66, 129, 255, .2);
            border-radius: 4px 0 0 4px;
          }

          .level-number {
            display: block;
            height: 20px;
            // color: #99a2aa;
            color: rgba(66, 129, 255, 0.8);
            margin-left: 8px;
            margin-bottom: 4px;
            font-size: 12px;
            line-height: 20px;
            cursor: default;

            .now-num {
              color: rgba(66, 129, 255, 1);
            }

            .num-icon {
              margin: 0 2px;
            }

            .max-num {
            }
          }
        }
      }
    }
    .user-level-xb {
      margin-top: 8px;

      .coin {
        margin-right: 16px;
        font-size: 14px;
        color: #222;
        vertical-align: top;

        i {
          margin-right: 3px;
          font-size: 14px;

          &:nth-child(1) {
            margin-left: 6px;
          }
        }
      }
    }
  }
}
</style>