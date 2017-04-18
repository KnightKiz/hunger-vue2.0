<template>
  <transition name="food-detail">
    <div v-show="isShow" class="foodDetail-wrapper" ref="foodDetail">
      <div class="scroll-wrapper">
        <div class="head">
          <img class="head-img" :src="food.image">
          <div class="head-dec">
            <div class="title">{{food.name}}</div>
            <div class="sell-rating">
              <span class="sell">月售{{food.sellCount}}份</span><span class="rating">好评{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="new-price"><span class="left">￥</span>{{food.price}}</span>
              <del class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</del>
            </div>
            <div class="add">
              <cartControl :current-food="food"></cartControl>
            </div>
            <transition name="slide">
              <div class="not-add" @click="addToCart" v-show="!showAdd">加入购物车</div>
            </transition>
          </div>
          <div class="back" @click="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div><!--head-->
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="info-title">商品介绍</h1>
          <p class="info-article">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating-wrapper">
          <h1 class="rating-title">商品评价</h1>

          <div class="select-wrapper">
            <ratingSelect :ratings="food.ratings" :types="types" :current-type="currentType"
                          :only-content="onlyContent">
            </ratingSelect>

            <ul class="ratings-ul">
              <li class="ratings-li border-1px" v-for="(rating,index) in food.ratings" :key="index"
                  v-show="showRating(rating.rateType,rating.text)">
                <div class="time-user">
                  <span class="time">{{rating.rateTime|format}}</span>
                  <span class="user">
                    <span class="user-name">{{rating.username}}</span>
                    <img class="user-avatar" :src="rating.avatar">
                  </span>
                </div>
                <div class="content">
                  <span class="icon-type">
                    <span class="icon-thumb_up active" v-if="rating.rateType===0"></span>
                    <span class="icon-thumb_down" v-else-if="rating.rateType===1"></span>
                  </span>
                  <span class="text" v-show="rating.text">{{rating.text}}</span>
                </div>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>

        </div>
      </div>
    </div><!--foodDetail-wrapper-->
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartControl from '../cartControl/cartControl';
  import split from '../split/split';
  import Vue from 'vue';
  import ratingSelect from '../ratingSelect/ratingSelect';
  import {formatTime} from '../../common/js/formatTime';

  const ALL = 2;
  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  export default{
    props: {
      food: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        isShow: false,
        types: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
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
    methods: {
      show() {
        this.isShow = true;
        this.$nextTick(() => {
          if (this.foodDetail) {
            this.foodDetail.refresh();
          } else {
            this.foodDetail = new BScroll(this.$refs.foodDetail, {
              click: true
            });
          }
        });
      },
      addToCart() {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      back() {
        this.isShow = false;
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
    },
    created() {
      this.$root.eventHub.$on('change-type', (type) => {
        this.currentType = type;
        this.$nextTick(() => {
          if (this.foodDetail) {
            this.foodDetail.refresh();
          }
        });
      });
      this.$root.eventHub.$on('only-getContent', (onlyContent) => {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          if (this.foodDetail) {
            this.foodDetail.refresh();
          }
        });
      });
    },
    computed: {
      showAdd() {
        if (this.food.count && this.food.count > 0) {
          return true;
        }
      }
    },
    components: {
      cartControl,
      split,
      ratingSelect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food-detail-enter-active, .food-detail-leave-active
    transition: all 0.4s ease

  .food-detail-enter, .food-detail-leave-active
    transform: translateX(100%)

  .foodDetail-wrapper
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: #fff
    .scroll-wrapper
      box-sizing: border-box
      padding-bottom: 48px
      .head
        position: relative
        .head-img
          width: 100%
        .head-dec
          position: relative
          padding: 18px
          .title
            margin-bottom: 8px
            line-height: 14px
            font-size: 14px
            font-weight: 700
            color: rgb(7, 17, 27)
          .sell-rating
            margin-bottom: 18px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
            .sell
              display: inline-block
              margin-right: 12px
            .rating
              display: inline-block
          .price
            .new-price
              display: inline-block
              margin-right: 12px
              line-height: 24px
              font-size: 14px
              font-weight: 700
              color: rgb(240, 20, 20)
              .left
                font-size: 10px
                font-weight: normal
            .old-price
              display: inline-block
              line-height: 24px
              font-size: 10px
              color: rgb(147, 153, 159)
          .slide-enter-active, .slide-leave-active
            opacity: 1
            transition: opacity 0.4s ease
          .slide-enter, .slide-leave-active
            opacity: 0
          .add
            position: absolute
            right: 18px
            bottom: 18px
          .not-add
            box-sizing: border-box
            position: absolute
            right: 18px
            bottom: 18px
            height: 24px
            padding: 6px 12px
            margin: 3px 2px
            border-radius: 12px
            text-align: center
            line-height: 12px
            font-size: 10px
            background-color: rgb(0, 160, 220)
            color: #ffffff
        .back
          position: fixed
          display: inline-block
          top: 0
          left: 0
          padding: 18px
          .icon-arrow_lift
            color: #ffffff
            font-size: 20px
            font-weight: normal
      .info
        padding: 18px
        .info-title
          line-height: 16px
          font-size: 16px
          font-weight: 700
        .info-article
          margin: 6px 8px 0 8px
          line-height: 24px
          font-size: 14px
          font-weight: 200
          color: rgb(77, 85, 93)
      .rating-wrapper
        .rating-title
          display: inline-block
          margin: 18px 0 0 18px
          line-height: 16px
          font-size: 16px
          font-weight: 700
        .select-wrapper
          .ratings-ul
            list-style: none
            .ratings-li
              margin: 0 18px
              padding: 16px 0
              border-bottom: 1px solid rgba(7, 17, 27, 0.1)
              &:last-child
                border: none
              .time-user
                margin-bottom: 6px
                height: 12px
                line-height: 12px
                font-size: 10px
                .time
                  float: left
                .user
                  float: right
                  .user-name
                    display: inline-block
                    margin-right: 6px
                  .user-avatar
                    vertical-align: top
                    height: 12px
                    width: 12px
                    border-radius: 50%
              .content
                line-height: 16px
                font-size: 12px
                .icon-type
                  vertical-align: middle
                  line-height: 24px
                  color: rgb(147, 153, 159)
                  .active
                    color: rgb(0, 160, 220)
                .text
                  color: rgb(7, 17, 27)
          .no-rating
            font-size: 16px
            margin: 16px
            text-align: center
            color: rgb(147, 153, 159)
</style>
