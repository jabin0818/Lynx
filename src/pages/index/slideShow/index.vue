<template>
  <el-carousel :interval="4000" height="346px" trigger="click" :autoplay="true">
    <el-carousel-item v-for="item,index in data" :key="index">
      <!-- <div class="medium">
        <img src="../../../assets/img/slideshow/1.jpg" />
      </div> -->
      <div class="item_details">
        <a>
          <img :src="item.src" />
        </a>
        <div class="trans">
          <a class="word-url">
            <h4>{{item.title}}</h4>
          </a>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "SlideShow",
  data() {
    return {
      data: [
        {
          src: require('../../../assets/img/slideshow/4.jpg'),
          title: 'MySQL到底怎么了？'
        },
        {
          src: require('../../../assets/img/slideshow/5.jpg'),
          title: 'Python老手也会犯的20个新手级错误'

        },
        {
          src: require('../../../assets/img/slideshow/6.jpg'),
          title: '马斯去克收购推特，只是为了抄微信？'

        },
        {
          src: require('../../../assets/img/slideshow/7.jpg'),
          title: '8个开发者必须知道的JavaScript深层概念'

        },
      ]
    }
  },
};
</script>

<style lang="less">
@media screen and (max-width: 840px){
  .el-carousel__container{
    height: 6.1rem!important;
  }
}
.el-carousel__indicator--horizontal .el-carousel__button {
  width: 10px;
  height: 10px;
  background: #e3e5e7;
  // border: 1px solid #e3e5e7;
  border-radius: 50%;
  opacity: 0.5;
  @media screen and (max-width: 540px) {
    width: 0.27rem!important;
    height: 0.27rem!important;
  }
}
.el-carousel__indicator--horizontal.is-active {

  @media screen and (max-width: 540px) {
    .el-carousel__button{
      width: 0.27rem!important;
      height: 0.27rem!important;
    }
  }
  
  .el-carousel__button {
    width: 10px;
    height: 10px;
    background: @primary-color;
    border-radius: 50%;
    opacity: 1;
  }
}

.el-carousel--horizontal .el-carousel__indicators--horizontal {
    bottom: 0;
    left: 9%;
    @media screen and (max-width: 540px) {
      left: 12%;
    }
}

.item_details{
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 1;
  overflow: hidden;
  border-radius: 4px;
  // transition: opacity .5s ease-in-out;

  a{
    display: block;
    width: 100%;
    height: 100%;

    img{
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }

  .trans{
    width: 100%;
    height: 90px;
    background: linear-gradient(180deg,transparent,rgba(0,0,0,.55));
    position: absolute;
    bottom: 0;
    left: 0;

    .word-url {
      position: absolute;
      left: 20px;
      bottom: 50px;
      height: 30px;
      line-height: 30px;
      font-size: 22px;
      font-weight: 500;
      color: #fff;

      h4 {
        color: #fff;
        margin-top: 16px;
        font-size: 22px;
        line-height: 22px;
        word-wrap: break-word;
        word-break: break-all;

        @media screen and (max-width: 840px) {
          font-size: 0.4rem;
        }

        @media screen and (max-width: 720px) {
          margin-top: 0.6rem;
        }

        @media screen and (max-width: 540px) {
          font-size: 16px;
        }

        @media screen and (max-width: 480px) {
          margin-top: 28px;
        }

        @media screen and (max-width: 400px) {
          font-size: 13px;
        }
      }
    }
  }
}
</style>