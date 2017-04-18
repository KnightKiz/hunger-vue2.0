<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="scroll-wrapper">
      <div class="head">
        <div class="head-top border-1px">
          <h1 class="title1">{{seller.name}}</h1>
          <div class="overview">
            <stars :size="36" :score="seller.score"></stars>
            <span class="overview-count">({{seller.ratingCount}})</span>
            <span class="selling">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect" @click="collect()">
            <i class="icon-favorite" :class="{'active':isCollect}"></i>
            <span class="collect-title" v-show="isCollect">已收藏</span>
            <span class="collect-title" v-show="!isCollect">收藏</span>
          </div><!--collect-->
        </div><!--head-top-->
        <div class="head-bottom">
          <div class="block border-right-1px">
            <span class="titles">起送价</span>
            <span class="detail">{{seller.minPrice}}<span class="unit">元</span></span>
          </div>
          <div class="block border-right-1px">
            <span class="titles">商家配送</span>
            <span class="detail">{{seller.deliveryPrice}}<span class="unit">元</span></span>
          </div>
          <div class="block border-right-1px">
            <span class="titles">平均配送时间</span>
            <span class="detail">{{seller.deliveryTime}}<span class="unit">分钟</span></span>
          </div>
        </div><!--head-bottom-->
      </div><!--head-->
      <split></split>
      <div class="bulletin-wrapper">
        <div class="bulletin-head border-1px">
          <h1 class="title1">公告与活动</h1>
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-show="seller.supports">
          <li class="supports-li border-1px" v-for="support in seller.supports">
            <span class="img" :class="supportType(support.type)"></span>
            <span class="dec">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title2">商家实景</h1>
        <div class="pic-scroll" ref="pics">
          <span class="pic-wrapper">
            <img v-for="pic in seller.pics" :src="pic" height="90px" width="120px" class="pic">
          </span>
        </div>
      </div>
      <split></split>
      <div class="info-wrapper">
        <h1 class="title2">商家信息</h1>
        <ul class="infos">
          <li class="info" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from '../split/split';
  import stars from '../stars/stars';
  import BScroll from 'better-scroll';
  import {saveToLocal, loadFromLocal} from '../../common/js/storage';
  export default{
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
    components: {
      split,
      stars
    },
    data() {
      return {
        isCollect: false
      };
    },
    methods: {
      collect() {
        this.isCollect = !this.isCollect;
        saveToLocal(10001, 'isCollect', this.isCollect);
      },
      supportType(index) {
        const imgTypes = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        return imgTypes[index];
      }
    },
    created() {
      this.isCollect = loadFromLocal(10001, 'isCollect', false);
      this.$nextTick(() => {
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {
            click: true
          });
        } else {
          this.sellerScroll.refresh();
        }
        if (!this.pics) {
          console.log('pics');
          this.pics = new BScroll(this.$refs.pics, {
            scrollX: true
          });
        } else {
          this.pics.refresh();
        }
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  .title1
    padding-bottom: 8px
    line-height: 14px
    font-size: 14px
    font-weight: 700
    color: rgb(7, 17, 27)

  .title2
    padding-bottom: 12px
    line-height: 14px
    font-size: 14px
    font-weight: 700
    color: rgb(7, 17, 27)

  .seller-wrapper
    position: absolute
    top: 174px
    left: 0
    bottom: 46px
    width: 100%
    overflow: hidden
    .scroll-wrapper
      width: 100%
      .head
        .head-top
          position: relative
          margin: 0 18px
          padding: 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .overview
            line-height: 18px
            font-size: 10px
            color: rgb(77, 85, 93)
            .overview-count
              vertical-align: top
              margin-left: 8px
              margin-right: 12px
          .collect
            position: absolute
            vertical-align: top
            right: 0
            top: 18px
            width: 40px
            text-align: center
            .icon-favorite
              display: block
              margin-bottom: 4px
              line-height: 24px
              font-size: 24px
              color: rgb(149, 153, 159)
              &.active
                color: rgb(240, 20, 20)
            .collect-title
              line-height: 10px
              font-size: 10px
              color: rgb(77, 85, 93)
        .head-bottom
          margin: 18px 0
          .block
            display: inline-block
            width: 32%
            text-align: center
            border-right-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              border-none()
            .titles
              display: block
              margin-bottom: 4px
              line-height: 10px
              font-size: 10px
              color: rgb(147, 153, 159)
            .detail
              line-height: 24px
              font-size: 24px
              font-weight: 200
              color: rgb(7, 17, 27)
              .unit
                line-height: 10px
                font-size: 10px
      .bulletin-wrapper
        padding: 18px 18px 0 18px
        .bulletin-head
          padding-bottom: 16px
          border-1px(rgba(7, 17, 27, 0.1))
          .text
            padding: 0 12px
            line-height: 24px
            font-size: 12px
            font-weight: 200
            color: rgb(240, 20, 20)
        .supports
          list-style: none
          .supports-li
            padding: 16px 12px
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              border-none()
            .img
              display: inline-block
              vertical-align: top
              height: 16px
              width: 16px
              margin-right: 6px
              background-size: 16px 16px
              &.decrease
                bg-img('decrease_4')
              &.discount
                bg-img('discount_4')
              &.guarantee
                bg-img('guarantee_4')
              &.invoice
                bg-img('invoice_4')
              &.special
                bg-img('special_4')
            .dec
              vertical-align: top
              line-height: 16px
              font-size: 12px
              font-weight: 200
              color: rgb(7, 17, 27)
      .pics
        margin: 18px
        white-space: nowrap
        .pic-wrapper
          display: inline-block
          overflow: auto
          .pic
            margin-right: 6px
      .info-wrapper
        margin: 18px
        .title2
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .infos
          list-style: none
          .info
            padding: 18px 12px
            line-height: 16px
            font-size: 12px
            font-weight: 200
            color: rgb(7, 17, 27)
            border-1px(rgba(7, 17, 27, 0.1))
            &:last-child
              border-none()
</style>
