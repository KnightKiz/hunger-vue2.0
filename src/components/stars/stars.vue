<template>
  <div class="star" :class="starSize">
    <span v-for="(starItem,index) in starItems" :class="starItem" class="star-item" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      score: {
        type: Number
      },
      size: {
        type: Number
      }
    },
    computed: {
      starSize() {
        return 'star' + this.size;
      },
      starItems() {
        let starArray = [];
        let onCount = Math.floor(this.score);
        let isHasHalf = (this.score - onCount) >= 0.5;
        for (let i = 0; i < onCount; i++) {
          starArray.push('on');
        }
        if (isHasHalf) starArray.push('half');
        while (5 - starArray.length > 0) {
          starArray.push('off');
        }
        return starArray;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin';
  .star
    display: inline-block
    vertical-align: bottom
    &.star24
      .star-item
        display: inline-block
        height: 10px
        width: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-img('star24_on')
        &.half
          bg-img('star24_half')
        &.off
          bg-img('star24_off')
    &.star36
      .star-item
        display: inline-block
        height: 15px
        width: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-img('star36_on')
        &.half
          bg-img('star36_half')
        &.off
          bg-img('star36_off')
    &.star48
      .star-item
        display: inline-block
        height: 20px
        width: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-img('star48_on')
        &.half
          bg-img('star48_half')
        &.off
          bg-img('star48_off')
</style>
