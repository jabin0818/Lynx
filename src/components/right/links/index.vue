<template>
  <div
    id="boxFixed"
    class="boxFixed"
    :style="'width: ' + rightwidth + 'px'"
    :class="{ is_fixed: isFixed }"
  >
    <div class="aside-links">
      <div class="aside-links-header">
        <span class="aside-links-title">
          <!-- <i class=""></i> -->
          <span>友情链接</span>
        </span>
      </div>
      <div class="aside-links-main">
        <div class="aside-links-list">
          <span class="aside-links-item">
            <a class="item-link">
              <div class="name">云开发</div>
              <div
                class="logo"
                :style="{
                  'background-image': `url(${require('@/assets/img/links/tencent.png')})`,
                }"
              ></div>
            </a>
          </span>
          <span class="aside-links-item">
            <a class="item-link">
              <div class="name">开源中国</div>
              <div
                class="logo"
                :style="{
                  'background-image': `url(${require('@/assets/img/links/oschain.jpg')})`,
                }"
              ></div>
            </a>
          </span>
          <span class="aside-links-item">
            <a class="item-link">
              <div class="name">w3ctech</div>
              <div
                class="logo"
                :style="{
                  'background-image': `url(${require('@/assets/img/links/w3c.png')})`,
                }"
              ></div>
            </a>
          </span>
          <span class="aside-links-item">
            <a class="item-link">
              <div class="name">码云</div>
              <div
                class="logo"
                :style="{
                  'background-image': `url(${require('@/assets/img/links/gitee.png')})`,
                }"
              ></div>
            </a>
          </span>
        </div>
      </div>
    </div>
    <div class="copyright-footer">
      <div class="copyright-footer-contact">
        <div class="work-time">联系我们（工作时间：8:30-17:00）</div>
        <div class="work-time">
          157-666-02407
          <a class="link" target="_blank">kefu@Lynx.net</a>
          <a class="link" target="_blank">在线客服</a>
        </div>
      </div>
      <ul class="copyright-footer-middle">
        <li><a target="_blank">设计文档</a></li>
        <li><a target="_blank">使用指南</a></li>
        <li><a target="_blank">意见反馈</a></li>
        <li><a target="_blank">关于我们</a></li>
      </ul>
      <ul class="copyright-footer-info">
        <li><a rel="noreferrer" target="_blank">粤ICP备31026658号</a></li>
        <li><a target="_blank">经营性网站备案信息</a></li>
        <li>
          <img src="@/assets/img/icon/badge.png" alt="" /><a
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030143"
            rel="noreferrer"
            target="_blank"
            >公安备案号13015502230243</a
          >
        </li>
        <li>
          <a rel="noreferrer" target="_blank">粤网文〔2022〕3053-325号</a>
        </li>
        <li><a target="_blank">营业执照</a></li>
        <li><a target="_blank">广东违法和不良信息举报中心</a></li>
        <li><a target="_blank">家长监护</a></li>
        <li>
          <a href="http://www.12377.cn/" target="_blank">中国互联网举报中心</a>
        </li>
        <li>
          <a href="http://www.cyberpolice.cn/" target="_blank"
            >网络110报警服务</a
          >
        </li>
        <li><a target="_blank">隐私条款</a></li>
        <li><a target="_blank">账号管理规范</a></li>
        <li><a target="_blank">版权与免责声明</a></li>
        <li><a target="_blank">版权申诉</a></li>
        <li><a target="_blank">出版物许可证</a></li>
        <li class="compact">©2022-2025茂名广东石油化工学院官渡校区</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Links",
  props: {
    dataLength: { type: Number },
  },
  data() {
    return {
      top: false,
      isFixed: false,
      offsetTop: 0,
      rightwidth: 290,
    };
  },

  methods: {
    getCss(curEle, attr) {
      var val = null,
        reg = null;
      if ("getComputedStyle" in window) {
        val = window.getComputedStyle(curEle, null)[attr];
      } else {
        //ie6~8不支持上面属性
        //不兼容
        if (attr === "opacity") {
          val = curEle.currentStyle["filter"]; //'alpha(opacity=12,345)'
          reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i;
          val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
        } else {
          val = curEle.currentStyle[attr];
        }
      }
      reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i;
      return reg.test(val) ? parseFloat(val) : val;
    },
    handleScroll() {
      document.addEventListener(
        "scroll",
        () => {
          var scrollTop =
            document.documentElement.scrollTop ||
            window.pageYOffset ||
            document.body.scrollTop;

          //笔记大于或等于6个才开启吸顶
          if (this.dataLength > 6) {
            if (scrollTop > 1866) {
              this.isFixed = true;
            } else {
              this.isFixed = false;
            }
          }
        },
        true
      );
    },
    getOffsetTopByBody(el) {
      let offsetTop = 0;
      while (el && el.tagName !== "BODY") {
        offsetTop += el.offsetTop;
        el = el.offsetParent;
      }
      return offsetTop;
    },
  },
  mounted() {
    //屏幕变化width为固定，固需要用tag的宽度让固定的宽度为动态
    this.$nextTick(() => {
      this.rightwidth = document.querySelector("#tag")?.clientWidth;
    });

    //当屏幕变化的时候要重新计算
    let self = this;
    window.onresize = function () {
      self.rightwidth = document.querySelector("#tag")?.clientWidth;

      let rightAside = document.querySelector("#rightAside");
      if (!rightAside) return;
      if (self.getCss(rightAside, "display") === "none") return;

      if (self.isFixed) {
        self.isFixed = false;
        self.$nextTick(() => {
          let offsetTop = self.getOffsetTopByBody(
            document.querySelector("#boxFixed")
          );
          self.offsetTop = offsetTop;
          self.isFixed = true;
        });
      } else {
        let offsetTop = self.getOffsetTopByBody(
          document.querySelector("#boxFixed")
        );
        if (offsetTop === 70) {
        } else {
          self.offsetTop = offsetTop;
        }
      }
    };
    this.$nextTick(() => {
      //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
      this.offsetTop = this.getOffsetTopByBody(
        document.querySelector("#boxFixed")
      );
    });
    // 监听滚动
    this.handleScroll.call(this);
  },
  destroyed() {},
};
</script>

<style lang="less">
.is_fixed {
  //  width: 290px;
  position: fixed;
  top: 10px;
}

.boxFixed {
  .aside-links {
    border-radius: 6px;
    border: 1px solid @levelThree-border-color;
    margin-bottom: 20px;

    .aside-links-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid @levelOne-border-color;
      padding: 0 10px;

      .aside-links-title {
        display: flex;
        align-content: center;

        span {
          font-size: 16px;
          font-weight: 600;
          color: @main-text-color;
        }
      }

      .aside-links-more {
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

    .aside-links-main {
      padding: 10px 18px;

      .aside-links-list {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        align-items: center;
        justify-items: center;

        .aside-links-item {
          // flex: 0.5;
          width: 100%;
          height: 50px;
          padding: 4px;
          // background-color: rgba(66, 129, 255, .1);
          color: @primary-color;
          border-radius: 4px;
          font-size: 16px;
          box-shadow: inset 0 0 0 1px #f1f1f1;
          cursor: pointer;
          user-select: none;

          &:hover {
            box-shadow: inset 0 0 0 2px #45b4ff;
          }

          .item-link {
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: center;
            justify-content: center;
            height: 100%;

            &:hover {
              outline-width: 26px;
              color: #007fff;
            }

            &:hover .name {
              width: auto;
              height: auto;
              opacity: 1;
              transition: opacity 0.3s;
            }

            &:hover .logo {
              width: 0;
              height: 0;
              opacity: 0;
              transition: opacity 0.3s;
            }

            .name {
              // padding: 0 5px;
              width: 0;
              height: 0;
              font-size: 14px;
              line-height: 1.5;
              color: #333;
              opacity: 0;
            }

            .logo {
              height: 30px;
              width: 100%;
              background-position: center;
              background-repeat: no-repeat;
              background-size: contain;
            }
          }
        }
      }
    }
  }

  .copyright-footer {
    width: 100%;
    max-width: 334px;
    padding: 16px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid @levelThree-border-color;

    .copyright-footer-contact {
      color: #999aaa;
      font-size: 14px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;

      & > div {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-preferred-size: 122px;
        flex-basis: 122px;
        margin-bottom: 12px;
        height: 16px;
      }

      .work-time {
        flex-basis: auto;
        word-break: break-all;
        white-space: nowrap;

        .link {
          margin-left: 10px;
          color: #999aaa;
          cursor: pointer;
        }
      }
    }

    .copyright-footer-middle {
      --primary-color: hsl(196, 78%, 61%);
      --secondary-color: hsl(217, 15%, 83%);
      --success-color: hsl(165, 58%, 55%);
      --info-color: hsl(214, 79%, 65%);
      --warning-color: hsl(43, 100%, 66%);
      --danger-color: hsl(354, 81%, 63%);
      padding: 12px 0;
      border-top: 1px solid #f3f3f3;
      border-bottom: 1px solid #f3f3f3;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;

      li {
        position: relative;
        height: 18px;
        line-height: 18px;

        &::before {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          width: 0.25rem;
          height: 100%;
          background: var(--menu-link-active-color);
          transition: 0.6s;
        }
        a {
          position: relative;
          background: #555666;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          transition: background-size 0.45s 0.04s;
          color: transparent;
          font-size: 14px;
          font-weight: 500;
          display: block;
          cursor: pointer;
          &::before {
            position: absolute;
            content: attr(data-text);
            z-index: -1;
            color: #7f8c8d;
          }
        }

        &:nth-child(1) {
          --menu-link-active-color: var(--primary-color);
        }

        &:nth-child(2) {
          --menu-link-active-color: var(--info-color);
        }

        &:nth-child(3) {
          --menu-link-active-color: var(--success-color);
        }

        &:nth-child(4) {
          --menu-link-active-color: var(--warning-color);
        }

        &:nth-child(5) {
          --menu-link-active-color: var(--danger-color);
        }

        &:hover::before {
          left: calc(100% + 8px);
        }

        &:hover a {
          background: linear-gradient(var(--menu-link-active-color) 0 100%)
            left/0 no-repeat;
          background-size: 100%;
          background-clip: text;
          -webkit-background-clip: text;
        }
      }
    }

    .copyright-footer-info {
      margin-right: -8px;
      margin-top: 2px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;

      li {
        color: #999aaa;
        font-size: 14px;
        line-height: 16px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-right: 8px;
        margin-top: 10px;

        a {
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        img {
          width: 16px;
          height: 16px;
          display: inline-block;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>