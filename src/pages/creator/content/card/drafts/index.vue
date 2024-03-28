<template>
  <div id="content-drafts-cards">
    <div class="drafts-container">
      <ul class="drafts-list">
        <li class="drafts-item">
          <div class="essay-list">
            <div class="first-line">
              <span class="title">testdstete</span>
              <div class="byte-dropdown">
                <el-popover placement="bottom" width="40" trigger="hover">
                  <ul class="actions-info-more">
                    <li>
                      <i class="el-icon-edit"></i>
                      <span>编辑</span>
                    </li>
                    <li>
                      <i class="el-icon-delete"></i>
                      <span>删除</span>
                    </li>
                  </ul>
                  <!-- <el-button >click 激活</el-button> -->
                  <span slot="reference">
                    <i class="el-icon-more"></i>
                  </span>
                </el-popover>
              </div>
            </div>
            <div class="infos">
              <div class="infos-left">
                <span class="like">
                  <i class="iconfont icon-good"></i>
                  <span>0</span>
                </span>
                <span class="star">
                  <i class="el-icon-star-off"></i>
                  <span>0</span>
                </span>
              </div>
              <div class="infos-right">
                <span class="time">2022-1-2 10:11</span>
              </div>
              <!-- <span class="split-line"></span> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#content-drafts-cards {
  .drafts-container {
    .drafts-list {
      .drafts-item {
        padding: 0 20px;
        cursor: pointer;

        &:hover {
          background: #fafafa;
        }

        .essay-list {
          box-sizing: border-box;
          width: 100%;
          padding: 16px 0;
          border-bottom: 1px solid #e5e6eb;
          .first-line {
            position: relative;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;

            .title {
              max-width: calc(100% - 20px);
              font-weight: 400;
              font-size: 16px;
              line-height: 24px;
              color: #1d2129;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              flex: auto;
            }

            .byte-dropdown {
              display: inline-block;
              width: 24px;
              height: 24px;
              line-height: 24px;
              text-align: center;
              cursor: pointer;

              &:hover {
                background: #e5e6eb;
                border-radius: 2px;
              }
              i {
                font-size: 16px;
                color: #4e5969;

                display: inline-block;
                vertical-align: middle;
                line-height: 1;
              }
            }
          }

          .infos {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 400;
            font-size: 14px;
            height: 22px;
            line-height: 22px;
            color: #606266;
            .infos-left {
              display: flex;
              justify-content: space-between;
              align-items: center;
              & > span {
                display: flex;
                align-items: center;
                margin-right: 26px;

                i {
                  margin-right: 2px;
                  font-size: 15px;
                }
              }
            }

            .infos-right {
            }
          }
        }
      }
    }
  }
}
</style>