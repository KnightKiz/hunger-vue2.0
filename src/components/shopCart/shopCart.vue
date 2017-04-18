<template>
  <div class="shopCart">
    <div class="content-left" @click="showCartList">
      <div class="outside-logo">
        <div class="inside-logo" :class="{'highlight':getCount>0}">
          <i class="icon-shopping_cart"></i>
        </div>
        <div class="count" v-show="getCount>0">{{getCount}}</div>
      </div>
      <span class="sum" :class="{'highlight':getTotalPrice>0}">￥{{getTotalPrice}}</span>
      <div class="desc">
        <span class="disc-span">另需配送费￥{{deliveryPrice}}元</span>
      </div>
    </div>
    <div class="content-right">
      <span class="payment" :class="{'not-enough':getTotalPrice<this.minPrice,'enough':getTotalPrice>=this.minPrice}">{{payment}}</span>
    </div>
    <div class="ball-container">
      <transition name="drop"
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @after-enter="afterEnter"
                  v-for="(ball,index) in balls" :key="index">
        <div class="ball" v-show="ball"></div>
      </transition>
    </div>
    <transition name="cart-background">
      <div class="cart-background" @click="hideList" v-show="listShow"></div>
    </transition>
    <transition name="cart-list">
      <div class="cart-list" v-show="listShow">
        <div class="list-head">
          <span class="head-left">购物车</span>
          <span class="head-right" @click="deleteAll">清空</span>
        </div>
        <div class="list-body" ref="listBody">
          <ul class="body-ul">
            <li class="body-li border-1px" v-for="food in selectFoods">
              <span class="left">{{food.name}}</span>
              <div class="right">
                <span class="price">￥{{food.price*food.count}}</span>
                <div class="carControl-wrapper">
                  <cartControl :currentFood="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartControl from '../cartControl/cartControl.vue';
  import BScroll from 'better-scroll';
  export default{
    data() {
      return {
        // 小球
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        // 小球
        dropBalls: [],
        notFold: false
      };
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: Number,
      minPrice: {
        type: Number,
        default: 10
      }
    },
    computed: {
      getTotalPrice() {
        let total = 0;
        this.selectFoods.forEach((val) => {
          total += val.count * val.price;
        });
        return total;
      },
      getCount() {
        let counts = 0;
        this.selectFoods.forEach((val) => {
          counts += val.count;
        });
        return counts;
      },
      payment() {
        let price = this.getTotalPrice;
        if (price === 0) {
          return '￥' + this.minPrice + '元起送';
        } else if (price - this.minPrice < 0) {
          return '还差￥' + (this.minPrice - price) + '元起送';
        } else if (price - this.minPrice >= 0) {
          return '去结算';
        }
        return '';
      },
      listShow() {
        if (this.getCount === 0) {
          this.notFold = false;
          return false;
        }
        if (this.notFold) {
          this.$nextTick(() => {
            if (!this.listScroll) {
              this.listScroll = new BScroll(this.$refs.listBody, {
                click: true
              });
            } else {
              this.listScroll.refresh();
            }
          });
        }
        return this.notFold;
      }
    },
    methods: {
      // 小球
      _drop(target) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = target;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      // 小球
      beforeEnter(el) {
        console.log('beforeEnter');
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.display = '';
            el.style.tranfromX = x + 'px';
            el.style.tranfromY = y + 'px';
            el.style.opacity = 0;
          }
        }
      },
      // 小球
      // 动画完成时候的状态
      enter(el, done) {
        // eslint-disable-next-line
        let rf = el.offsetHeight();
        this.$nextTick(() => {
          el.style.tranfromX = 0;
          el.style.tranfromY = 0;
        });
      },
      // 小球
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      showCartList() {
        if (this.getCount > 0) {
          this.notFold = !this.notFold;
        }
      },
      deleteAll() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      hideList() {
        this.notFold = false;
      }
    },
    components: {
      cartControl
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .shopCart
    display: flex
    position: fixed
    left: 0
    bottom: 0
    height: 48px
    width: 100%
    background-color: #141d27
    .content-left
      flex: 1
      font-size: 0
      background-color: #141d27
      .outside-logo
        display: inline-block
        position: relative
        top: -10px
        height: 58px
        width: 58px
        margin: 0 18px
        padding: 6px
        box-sizing: border-box
        border-radius: 50%
        background-color: #141d27
        .inside-logo
          height: 46px
          width: 46px
          border-radius: 50%
          text-align: center
          background-color: #2B343D
          .icon-shopping_cart
            vertical-align: top
            line-height: 46px
            font-size: 24px
            color: #808589
          &.highlight
            background-color: rgb(0, 160, 220)
            .icon-shopping_cart
              color: #fff
        .count
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          font-size: 9px
          color: #ffffff
          font-weight: 700
          background-color: rgb(240, 20, 20)
          border-radius: 8px
          box-shadow: 0 4px 0 0 rgba(0, 0, 0, 0.4)
      .sum
        display: inline-block
        vertical-align: top
        margin: 12px 0
        padding-right: 12px
        line-height: 24px
        font-size: 16px
        font-weight: 700
        color: #8E8F91
        border-right-1px(#8E8F91)
        &.highlight
          color: #ffffff
      .desc
        display: inline-block
        vertical-align: top
        margin: 12px 0 12px 12px
        line-height: 24px
        color: #919396
        font-size: 10px
        font-weight: 700
    .content-right
      flex: 0 0 105px
      .payment
        display: inline-block
        box-sizing: border-box
        width: 105px
        padding: 12px 8px 12px 8px
        text-align: center
        line-height: 24px
        font-size: 12px
        font-weight: 700
        &.not-enough
          background-color: #2B333B
          color: #8e8f91
        &.enough
          background-color: #008F34
          color: #fff
    .ball-container
      z-index: 200
      .drop-enter-active
        transition: all 0.4s ease
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        height: 16px
        width: 16px
        border-radius: 50%
        background-color: rgb(0, 160, 220)
    .cart-list-enter-active, .cart-list-leave-active
      transition: all 0.4s ease
    .cart-list-enter, .cart-list-leave-active
      transform: translateY(100%)
    .cart-background-enter-active, .cart-background-leave-active
      transition: opacity 0.4s ease
    .cart-background-enter, .cart-background-leave-active
      opacity: 0
    .cart-background
      z-index: -2
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%;
      background-color: rgba(7, 17, 27, 0.6)
      backdrop-filter: blur(10px)
    .cart-list
      z-index: -1
      background-color: rgba(7, 17, 27, 0.6)
      position: fixed
      bottom: 0
      left: 0
      width: 100%
      background-color: #fff
      .list-head
        height: 40px
        width: 100%
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .head-left
          display: inline-block
          float: left
          margin-left: 18px
          line-height: 40px
          font-size: 14px
          font-weight: 200
          color: rgb(7, 17, 27)
        .head-right
          display: inline-block
          float: right
          margin-right: 18px
          line-height: 40px
          font-size: 12px
          font-weight: 200
          color: rgb(0, 160, 220)
      .list-body
        padding: 0 18px
        max-height: 200px
        overflow: auto
        .body-ul
          width: 100%
          list-style: none
          .body-li
            width: 100%
            height: 48px
            &:last-child
              padding-bottom: 68px
            border-1px(rgba(7, 17, 27, 0.1))
            .left
              display: inline-block;
              float: left
              padding: 12px 0
              line-height: 24px
              font-size: 14px
              color: rgb(7, 17, 27)
            .right
              float: right
              .price
                display: inline-block
                float: left
                margin: 0 12px 0 18px
                padding: 12px 0
                line-height: 24px
                font-size: 14px
                font-weight: 700
                color: rgb(240, 20, 20)
              .carControl-wrapper
                display: inline-block
                float: left
                height: 24px
                padding: 9px 0
</style>
