<template>
  <div class="ratings-wrapper" ref="ratingsWrapper">
    <div class="scroll-wrapper">
      <div class="overview-wrapper">
        <div class="overview-total">
          <h1 class="total">{{seller.score}}</h1>
          <h2 class="title">综合评分</h2>
          <h3 class="higher">高于周边商家{{seller.rankRate}}%</h3>
        </div>
        <div class="overview-detail">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <stars :size="36" :score="seller.serviceScore"></stars>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <stars :size="36" :score="seller.foodScore"></stars>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="time-title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingSelect :ratings="ratings" :types="types" :current-type="currentType"
                    :only-content="onlyContent">
      </ratingSelect>

      <ul class="ratings">
        <li class="ratings-li" v-for="rating in ratings" v-show="showRating(rating.rateType,rating.text)">
          <img class="avatar" :src="rating.avatar">
          <div class="content">
            <span class="name">{{rating.username}}</span>
            <div class="overview">
              <stars :size="24" :score="rating.score"></stars>
              <span class="overview-delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend-wrapper">
              <ul class="recommend-ul">
                <li class="icon-li">
                  <i class="icon-thumb_down icon" v-if="rating.rateType===1" style="color:rgb(147,153,159)"></i>
                  <i class="icon-thumb_up icon" v-else-if="rating.rateType===0" style="color:rgb(0,160,220)"></i>
                </li>
                <li class="recommend-li" v-for="val in rating.recommend">{{val}}</li>
              </ul>
            </div>
          </div>
          <span class="time">{{rating.rateTime|format}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import split from '../split/split';
  import ratingSelect from '../ratingSelect/ratingSelect';
  import stars from '../stars/stars';
  import BScroll from 'better-scroll';
  import {formatTime} from '../../common/js/formatTime.js';

  const ERR_OK = 0;
  const ALL = 2;
  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        types: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        },
        currentType: ALL,
        onlyContent: false
      };
    },
    filters: {
      format(rateTime) {
        return formatTime(rateTime);
      }
    },
    components: {
      ratingSelect,
      split,
      stars
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.erron === ERR_OK) {
          this.ratings = response.data;
        }
        this.$nextTick(() => {
          this._initScroll();
        });
      });
      this.$root.eventHub.$on('change-type', (type) => {
        this.currentType = type;
        this.$nextTick(() => {
          if (this.scroller) {
            this.scroller.refresh();
          }
        });
      });
      this.$root.eventHub.$on('only-getContent', (onlyContent) => {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          if (this.scroller) {
            this.scroller.refresh();
          }
        });
      });
    },
    methods: {
      _initScroll() {
        if (!this.scroller) {
          this.scroller = new BScroll(this.$refs.ratingsWrapper, {
            click: true
          });
        } else {
          this.scroller.refresh();
        }
      },
      showRating(type, text) {
        if (this.currentType === ALL || type === this.currentType) {
          if (this.onlyContent) {
            if (text || text !== '') {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  .ratings-wrapper
    position: absolute
    left: 0
    top: 174px
    bottom: 46px
    overflow: hidden
    width: 100%
    .scroll-wrapper
      width: 100%
      .overview-wrapper
        display: inline-block
        width: 100%
        margin: 18px 0
        font-size: 0
        .overview-total
          display: inline-block
          width: 35%
          text-align: center
          border-right-1px(rgba(7, 17, 27, 0.1))
          .total
            margin-bottom: 6px
            line-height: 28px
            font-size: 24px
            color: rgb(255, 153, 0)
          .title
            margin-bottom: 8px
            font-size: 12px
          .higher
            padding-bottom: 6px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
        .overview-detail
          display: inline-block
          width: 65%
          .score-wrapper
            width: 80%
            margin: 0 auto 8px auto
            height: 18px
            line-height: 18px
            @media screen and (max-width: 370px)
              width: 95%
            .title
              vertical-align: top
              margin-right: 12px
              font-size: 12px
              color: rgb(7, 17, 27)
            .score
              vertical-align: top
              margin-left: 12px
              font-size: 10px
              color: rgb(255, 153, 0)
          .deliveryTime
            width: 80%
            margin: 0 auto 8px auto
            line-height: 18px
            font-size: 12px
            @media screen and (max-width: 370px)
              width: 95%
            .time-title
              margin-right: 12px
              color: rgb(7, 17, 27)
            .time
              color: rgb(147, 153, 159)
      .ratings
        list-style: none
        .ratings-li
          position: relative
          display: flex
          padding: 18px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .avatar
            flex: 0 0 18px
            vertical-align: top
            height: 18px
            width: 18px
            margin-top: 4px
            border-radius: 50%
            margin-right: 12px
          .content
            flex: 1
            .name
              height: 12px
              margin-bottom: 4px
              line-height: 12px
              vertical-align: top
              font-size: 10px
              color: rgb(7, 17, 27)
            .overview
              margin-bottom: 6px
              line-height: 12px
              font-size: 10px
              color: rgb(147, 153, 159)
              .overview-delivery
                vertical-align: bottom
                margin-left: 6px
            .text
              display: inline-block
              margin-bottom: 8px
              margin-right: 6px
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
          .time
            position: absolute
            top: 18px
            right: 18px
            height: 12px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .recommend-wrapper
            .recommend-ul
              list-style: none
              .recommend-li
                display: inline-block
                margin-right: 8px
                padding: 0 6px
                line-height: 16px
                font-size: 9px
                color: rgb(147, 153, 159)
                border: 1px solid rgba(7, 17, 27, 0.1)
              .icon-li
                display: inline-block
                .icon
                  margin-right: 8px
                  line-height: 16px
                  font-size: 12px
</style>
