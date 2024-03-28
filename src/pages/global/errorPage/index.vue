<template>
  <div id="error-main">
    <div class="fof">
      <h1 class="hit-the-floor">404</h1>
      <div class="tips">该页面不存在 (๑`･ᴗ･´๑)</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
body {
  background-color: #f1f1f1;
}
#error-main {
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;

  .fof {
    display: table-cell;
    vertical-align: middle;

    h1 {
      font-size: 50px;
      display: inline-block;
      padding-right: 12px;
      animation: type 0.5s alternate infinite;
    }
    @keyframes type {
      from {
        box-shadow: inset -3px 0px 0px #ababab;
      }
      to {
        box-shadow: inset -3px 0px 0px transparent;
      }
    }
    .hit-the-floor {
      color: transparent;
      background-color: @primary-color;
      background-clip: text;
      font-size: 12em;
      font-weight: bold;
      font-family: Helvetica;
      text-align: center;
      text-shadow: 0 1px 0, 0 2px 0 #5990ff, 0 3px 0 #86aeff, 0 4px 0 #73a2ff,
        0 5px 0 #95b8ff, 0 6px 1px rgba(152, 152, 152, 0.1),
        0 0 5px rgba(110, 110, 110, 0.1);
    }
    .tips {
      color: #666;
    }
  }
}
</style>