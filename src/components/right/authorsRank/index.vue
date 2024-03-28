<template>
  <div class="aside-authorsRank" id="authorsRank">
    <div class="aside-authorsRank-header">
      <span class="aside-authorsRank-title">
        <span>作者榜单</span>
      </span>
      <!-- <span class="aside-authorsRank-more">
            <span>更多</span>
            <i class="el-icon-arrow-right"></i>
        </span> -->
    </div>
    <div class="aside-authorsRank-main">
      <div class="aside-authorsRank-list">
        <span class="aside-authorsRank-item">
          <img
            :src="require('@/assets/img/avatar/1.jpg')"
            alt="掘金安东尼的头像"
          />
          <div class="author-baseInfo">
            <div class="authorName">
              <span>SAIsai</span>
              <i class="el-icon-male"></i>
              <i class="el-icon-male level"></i>
            </div>
            <div class="position">签约作者 @ Stay hungry Stay foolish</div>
          </div>
        </span>
        <span class="aside-authorsRank-item">
          <img
            :src="require('@/assets/img/avatar/2.jpg')"
            alt="掘金安东尼的头像"
          />
          <div class="author-baseInfo">
            <div class="authorName">
              <span>小李</span>
              <i class="el-icon-male"></i>
              <i class="el-icon-male level"></i>
            </div>
            <div class="position">“心之所向 无问西东"</div>
          </div>
        </span>
        <span class="aside-authorsRank-item">
          <img
            :src="require('@/assets/img/avatar/3.jpg')"
            alt="掘金安东尼的头像"
          />
          <div class="author-baseInfo">
            <div class="authorName">
              <span>草莓刨冰不会化</span>
              <i class="el-icon-male"></i>
              <i class="el-icon-male level"></i>
            </div>
            <div class="position">容易被冰淇淋收买 没有好吃的活不下去</div>
          </div>
        </span>
        <span class="more">
          <span>完整榜单</span>
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.aside-authorsRank {
  height: 310px;
  border-radius: 6px;
  border: 1px solid @levelThree-border-color;
  // box-shadow: @element-boxshadow0;
  margin-bottom: 20px;
  background-color: #fff;

  .aside-authorsRank-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid @levelOne-border-color;
    padding: 0 10px;

    .aside-authorsRank-title {
      display: flex;
      align-content: center;

      span {
        font-size: 16px;
        font-weight: 600;
        color: @main-text-color;
      }
    }

    .aside-authorsRank-more {
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

  .aside-authorsRank-main {
    .aside-authorsRank-list {
      display: flex;
      align-content: center;
      flex-wrap: wrap;
      overflow: hidden;

      .aside-authorsRank-item {
        width: 100%;
        padding: 14px 18px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          background-color: hsla(0, 0%, 84.7%, 0.1);
        }

        img {
          flex: 0 0 auto;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .author-baseInfo {
          overflow: hidden;

          .authorName {
            span {
              max-width: 128px;
              font-size: 14px;
              display: inline-block;
              vertical-align: top;
              overflow: hidden;
              white-space: normal;
              word-break: break-word;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            }

            i {
              display: inline-flex;
              align-items: center;
              margin-left: 5px;
              vertical-align: middle;
            }
          }

          .position {
            color: #909090;
            font-size: 12px;
            margin-bottom: 3px;
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
            display: -webkit-box;
            word-break: break-word;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }
      }

      .more {
        display: block;
        width: 100%;
        color: @primary-color;
        padding: 14px 0;
        text-align: center;
        background-color: rgba(66, 129, 255, 0.1);
        transition: background-color 0.2s;
        border-radius: 0 0 6px 6px;
        cursor: pointer;
        &:hover {
          background-color: rgba(66, 129, 255, 0.2);
        }
        span {
          font-size: 14px;
        }

        i {
          margin-left: 5px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>