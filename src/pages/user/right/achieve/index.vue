<template>
  <div id="user-achieve">
    <div class="user-achieve-headers">
      <div class="ua-headers-text">个人成就</div>
    </div>
    <div class="user-achieve-body">
      <ul class="user-achieve-list">
        <li class="user-achieve-item">
          <div class="usre-achieve-icon">
            <i class="iconfont icon-good"></i>
          </div>
          <div class="usre-achieve-text">获得 7 次赞同</div>
        </li>
        <li class="user-achieve-item">
          <div class="usre-achieve-icon">
            <i class="el-icon-chat-dot-square"></i>
          </div>
          <div class="usre-achieve-text">获得 17 次评论</div>
        </li>
        <li class="user-achieve-item">
          <div class="usre-achieve-icon">
            <i class="el-icon-star-off"></i>
          </div>
          <div class="usre-achieve-text">获得 9 次收藏</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Achieve",
};
</script>

<style lang="less">
#user-achieve {
  margin-top: 10px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);

  .user-achieve-headers {
    display: flex;
    height: 40px;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    border-bottom: 1px solid #f6f6f6;

    .ua-headers-text {
      font-synthesis: style;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
  }

  .user-achieve-body {
    padding: 12px 0;

    .user-achieve-list {
      .user-achieve-item {
        display: flex;
        align-items: center;
        padding: 6px 20px;

        .usre-achieve-icon {
          width: 25px;
          height: 25px;
          margin-right: 8px;
          line-height: 26px;
          text-align: center;
          border-radius: 50%;
          background-color: rgba(66, 129, 255, 0.2);
          color: rgba(66, 129, 255, 0.9);
          i {
            font-size: 18px;
          }
        }

        .usre-achieve-text {
          font-size: 15px;
        }
      }
    }
  }
}
</style>