<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-li border-1px menu-item-hook"
            :class="{'menu-active':currentIndex === index}" @click="selectMenu(index,$event)">
          <span
            class="text"><span class="icon" v-show="item.type>0" :class="classMath[item.type]">
          </span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div ref="foodsWrapper" class="foods-wrapper">
      <div class="foods-ul">
        <div class="content-item content-item-hook" v-for="(goodsItem,goodsIndex) in goods">
          <div class="content-head">
            <span>{{goodsItem.name}}</span>
          </div><!--content-head-->
          <div @click="selectFood(item,$event)" class="content-detail border-1px"
               v-for="(item,index) in goodsItem.foods">

            <div class="cartControl-wrapper">
              <cartControl :current-food="item"></cartControl>
            </div>

            <img class="detail-icon" height="54" width="54" :src="item.icon">
            <div class="detail-info">
              <div class="info-name">{{item.name}}</div>
              <div v-show="item.description" class="info-description">{{item.description}}</div>
              <div class="info-rating">
                <span class="sellCount">月售{{item.sellCount}}份</span><span class="rating">好评率{{item.rating}}%</span>
              </div>
              <div class="allPrice">
                <span class="price"><span class="icon-before">￥</span>{{item.price}}</span>
                <del v-show="item.oldPrice" class="oldPrice">￥{{item.oldPrice}}</del>
              </div>
            </div><!--detail-info-->
          </div><!--content-detail-->
        </div><!--content-item-->
      </div><!--foods-ul-->
    </div><!--foods-wrapper-->
    <foodDetail ref="foodDetail" :food="selectedFood"></foodDetail>
    <shopCart ref="shopCart1" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopCart>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopCart from '../shopCart/shopCart';
  import cartControl from '../cartControl/cartControl';
  import foodDetail from '../foodDetail/foodDetail';
  const ERR_OK = 0;
  export default{
    props: {
      seller: Object
    },
    components: {
      shopCart,
      cartControl,
      foodDetail
    },
    data() {
      return {
        goods: [],
        contentEH: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    methods: {
      _initScroll() {
        this.menuS = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsS = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        });
        this.foodsS.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      heightCompute() {
        let foodsHook = this.$refs.foodsWrapper.getElementsByClassName('content-item-hook');
        let currentH = 0;
        this.contentEH.push(0);
        for (let i = 0; i < foodsHook.length; i++) {
          currentH = currentH + foodsHook[i].clientHeight;
          this.contentEH.push(currentH);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        console.log('click');
        let foodsHook = this.$refs.foodsWrapper.getElementsByClassName('content-item-hook');
        this.foodsS.scrollToElement(foodsHook[index], 300);
      },
      drop(target) {
        this.$refs.shopCart1._drop(target);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.foodDetail.show();
      }
    },
    // 计算属性在属性不发生变化的时候不会重新运行，而是直接调用之前计算并缓存下来的值
    computed: {
      currentIndex() {
        let scroll = this.scrollY;
        let menuHook = this.$refs.menuWrapper.getElementsByClassName('menu-item-hook');
        for (let i = 0; i < menuHook.length; i++) {
          let height1 = this.contentEH[i];
          let height2 = this.contentEH[i + 1];
          if (!height2 || (scroll >= height1 && scroll < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let selects = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count && food.count > 0) {
              selects.push(food);
            }
          });
        });
        return selects;
      }
    },
    created() {
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.erron === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this.heightCompute();
          });
        }
      });
      this.classMath = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$root.eventHub.$on('drop_el', (target) => {
        this.drop(target);
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .goods
    display: flex
    position: absolute
    top: 174px
    left: 0
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      wdith: 80px
      padding-left: 0
      background-color: #f3f5f7
      .menu-li
        display: table
        vertical-align: middle
        height: 54px
        width: 56px
        padding: 0 12px 0 12px
        line-height: 12px
        font-size: 12px
        border-1px(rgba(7, 17, 27, 0.1))
        &.menu-active
          z-index: 10
          margin-top: -1px
          background-color: #fff
          font-weight: 700
          border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          .icon
            display: inline-block
            height: 12px
            width: 12px
            margin-right: 2px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_3')
            &.discount
              bg-img('discount_3')
            &.guarantee
              bg-img('guarantee_3')
            &.guarantee
              bg-img('invoice_3')
            &.special
              bg-img('special_3')
    .foods-wrapper
      flex: 1
      overflow: auto
      background-color: #fff
      color: #000
      .content-item
        .content-head
          height: 26px
          padding-left: 14px
          font-size: 12px
          line-height 26px
          color: rgb(147, 153, 159)
          border-left: 1px solid #d9dde1
          background-color: #f3f5f7
        .content-detail
          display: flex
          margin: 0 18px 0 18px
          padding: 18px 0 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .cartControl-wrapper
            position: absolute
            bottom: 10px
            right: 10px
          &:last-child
            border-none()
          .detail-icon
            flex: 0 0 54px
          .detail-info
            display: inline-block
            flex: 1
            vertical-align: top
            margin-left: 10px
            margin-top: 2px
            color: rgb(147, 153, 159)
            .info-name
              padding-bottom: 8px
              line-height: 14px
              font-size: 14px
              font-weight: 700
              color: rgb(7, 17, 27)
            .info-description
              word-break: break-all
              word-wrap: break-word
              padding-bottom: 8px
              line-height: 10px
              overflow: hidden
              font-size: 10px
            .info-rating
              line-height: 10px
              font-size: 10px
              .sellCount
                margin-right: 12px
            .allPrice
              .price
                display: inline-block
                margin-right: 8px
                line-height: 24px
                font-size: 14px
                font-weight: 700
                color: red
                .icon-before
                  font-weight: normal
                  font-size: 10px
              .oldPrice
                display: inline-block
                line-height: 24px
                font-size: 10px
</style>
