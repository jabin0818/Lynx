<template>
  <div class="lynx-side-toolbar">
    <el-backtop :visibility-height="600">
        <div class="back-top-inner">
            <i class="el-icon-arrow-up"></i>
        </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
    name: 'SideToolbar',
    methods: {
      targetFn() {
        // 设置监听滚动的元素
        return document.querySelector("#app");
      },
    }
}
</script>

<style lang="less">
.lynx-side-toolbar {
  position: fixed;
  bottom: 57.6;
  right: 106px;
  z-index: 888;

  .back-top-inner{

    i{
        color: @primary-color
    }
  }

//   .feedback-icon-container, .github-icon-container, .chat-icon-container {
//     border-radius: 50%;
//     width: 34px;
//     height: 34px;
//     text-align: center;
//     cursor: pointer;

//     i {
//       line-height: 34px;
//       color: white;
//     }
//   }

//   .chat-icon-container, .github-icon-container {
//     margin-top: 10px;
//   }
}

</style>