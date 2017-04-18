<template>
  <div class="rating-select">
    <div class="select-wrapper border-1px">
      <div class="block positive" :class="{'active':currentType===2}" @click="changeType(2)">{{types.all}}
        <span class="ratingNum">{{allNumber}}</span>
      </div>
      <div class="block positive" :class="{'active':currentType===0}" @click="changeType(0)">{{types.positive}}
        <span class="ratingNum">{{positiveNumber}}</span></div>
      <div class="block negative" :class="{'active':currentType===1}" @click="changeType(1)">{{types.negative}}
        <span class="ratingNum">{{negativeNumber}}</span></div>
    </div>
    <div class="only-content" @click="onlyGetContent">
      <i class="icon-check_circle" :class="{'active':onlyContent}"></i>
      <span class="text">只有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  export default{
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      types: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      currentType: {
        type: Number,
        default: ALL
      }
    },
    computed: {
      allNumber() {
        let num = 0;
        if (this.ratings && this.ratings.length) {
          num = this.ratings.length;
          return num;
        }
        return 0;
      },
      positiveNumber() {
        let num = 0;
        if (this.ratings && this.ratings.length) {
          this.ratings.forEach((val) => {
            if (val.rateType === POSITIVE) {
              num++;
            }
          });
          return num;
        }
        return 0;
      },
      negativeNumber() {
        let num = 0;
        if (this.ratings && this.ratings.length) {
          this.ratings.forEach((val) => {
            if (val.rateType === NEGATIVE) {
              num++;
            }
          });
          return num;
        }
        return 0;
      }
    },
    methods: {
      changeType(type) {
        this.$root.eventHub.$emit('change-type', type);
      },
      onlyGetContent() {
        this.$root.eventHub.$emit('only-getContent', !this.onlyContent);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  .rating-select
    .select-wrapper
      padding: 18px 0
      margin: 0 18px
      font-size: 0
      border-1px(rgba(7, 17, 27, 0.1))
      .block
        display: inline-block
        margin-right: 6px
        padding: 8px 12px
        line-height: 16px
        border-radius: 2px
        font-size: 12px
        .ratingNum
          font-size: 10px
        &.positive
          color: rgb(77, 85, 93)
          background-color: rgba(0, 160, 220, 0.2)
          &.active
            color: #fff
            background-color: rgb(0, 160, 220)
        &.negative
          color: rgb(77, 85, 93)
          background-color: rgba(77, 85, 93, 0.2)
          &.active
            color: #fff
            background-color: rgb(77, 85, 93)
    .only-content
      padding: 12px 0
      border-1px(rgba(7, 17, 27, 0.1))
      line-height: 24px
      font-size: 0
      .icon-check_circle
        display: inline-block
        margin-right: 4px
        margin-left: 18px
        vertical-align: top
        font-size: 24px
        color: rgb(147, 153, 159)
        &.active
          color: #008F34
      .text
        color: rgb(147, 153, 159)
        font-size: 12px
</style>
