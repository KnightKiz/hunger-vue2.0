<template>
  <div class="header" style="position:relative;overflow: hidden">
    <div class="background-img">
      <img :src="seller.avatar">
    </div>
    <transition name="details-fade">
      <div class="details" v-show="detailIsShow">
        <div class="details-wrapper clearfix">
          <div class="details-content">
            <h1>{{seller.name}}</h1>
            <stars :size="48" :score="seller.score"></stars>
            <span class="supports-title">优惠信息</span>
            <ul v-if="seller.supports" class="supports-ul">
              <li class="support-li" v-show="seller.supports" v-for="support in seller.supports">
                <span class="support-icon" :class="classMath[support.type]"></span><span class="support-content">{{support.description}}</span>
              </li>
            </ul>
            <span class="supports-title">商家公告</span>
            <p class="bulletin-detail">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="details-footer">
          <span class="icon-close" @click="closeDetail"></span>
        </div>
      </div>
    </transition>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span><span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="type" :class="classMath[seller.supports[0].type]"></span>
          <span class="sup-description">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="entrance" v-if="seller.supports" @click="showDetail">
        <span class="type-length">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div><!--content-wrapper-->
    <div class="bulletin">
      <span class="bulletin-icon"></span><span class="bulletin-content">{{seller.bulletin}}</span><span
      class="icon-keyboard_arrow_right" @click="showDetail"></span>
    </div>
  </div><!--header-->
</template>

<script type="text/ecmascript-6">
  import stars from '../stars/stars.vue';
  export default{
    props: {
      seller: Object
    },
    data() {
      return {
        detailIsShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailIsShow = true;
      },
      closeDetail() {
        this.detailIsShow = false;
      }
    },
    created() {
      this.classMath = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      stars
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin';
  .header
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      color: #fff
      background-color: rgba(7, 17, 27, 0.5)
      blur: 10px
      .avatar
        display: inline-block
        height: 64px
        width: 64px
        vertical-align: top
        border-radius: 4px
        img
          height: 64px
          width: 64px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            height: 18px
            width: 30px
            vertical-align: top
            bg-img('brand')
            background-repeat: no-repeat
            background-size: 30px 18px
          .name
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          margin-bottom: 10px
          font-size: 12px
          line-height: 12px
        .supports
          margin-bottom: 2px
          .type
            display: inline-block
            height: 12px
            width: 12px
            margin-right: 4px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .sup-description
            display: inline-block
            line-height: 12px
            vertical-align: top
            font-size: 10px
      .entrance
        position: absolute
        right: 12px
        bottom: 18px
        padding: 7px 8px 7px 8px
        line-height: 12px
        text-align: center
        font-size: 10px
        border-radius: 24px
        background-color: rgba(0, 0, 0, 0.2)
        color: #ffffff
        .type-length
          margin-right: 2px
    .bulletin
      position: relative
      height: 28px
      padding: 0 12px 0 12px
      line-height: 28px
      font-size: 10px
      background-color: rgba(7, 17, 27, 0.2)
      .bulletin-icon
        display: inline-block
        height: 12px
        width: 22px
        margin-right: 4px
        margin-top: 8px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-content
        width: 88%
        display: inline-block
        vertical-align: top
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
      .icon-keyboard_arrow_right
        position: absolute
        top: 0
        right: 12px
        line-height: 28px
    .background-img
      position: absolute
      top: 20%
      width: 100%
      text-align: center
      img
        width: 80%
        filter: blur(10px)
    .details
      position: fixed
      z-index: 999
      top: 0
      left: 0
      background-color: rgba(7, 17, 27, 0.8)
      height: 100%
      width: 100%
      overflow: auto
      .details-wrapper
        width: 100%
        min-height: 100%
        .details-content
          margin: 64px 36px 0 36px
          padding-bottom: 64px
          color: #fff
          text-align: center
          h1
            line-height: 16px
            font-size: 16px
            font-weight: 700
            margin-bottom: 16px
          .supports-title
            display: inline-block
            width: 100%
            margin: 28px 0 24px 0
            font-size: 12px
            font-weight: 700
            &:before
              display: inline-block
              width: 35%
              margin-right: 12px
              content: ""
              border-top: 1px solid rgba(255, 255, 255, 0.2)
            &:after
              display: inline-block
              width: 35%
              margin-left: 12px
              content: ""
              border-top: 1px solid rgba(255, 255, 255, 0.2)
          .supports-ul
            list-style: none
            .support-li
              text-align: left
              height: 16px
              margin: 0 12px 12px 12px
              &:last-child
                margin-bottom: 0
              .support-icon
                display: inline-block
                height: 16px
                width: 16px
                vertical-align: top
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.guarantee
                  bg-img('guarantee_2')
                &.invoice
                  bg-img('invoice_2')
                &.special
                  bg-img('special_2')
              .support-content
                display: inline-block
                margin-left: 6px
                vertical-align: top
                line-height: 16px
                font-size: 12px
                font-weight: 200
          .bulletin-detail
            margin: 0 12px 28px 12px
            line-height: 24px
            text-align: left
            font-size: 12px
            font-weight: 200
      .details-footer
        position: relative
        height: 32px
        width: 32px
        font-size: 32px
        margin: -64px auto 0 auto
        clear: both
        .icon-close
          color: rgba(255, 255, 255, 0.5)

    .details-fade-enter-active, .details-fade-leave-active
      transition: opacity .5s

    .details-fade-enter, .details-fade-leave-active
      opacity: 0
</style>
