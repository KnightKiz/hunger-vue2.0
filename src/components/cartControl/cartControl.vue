<template>
  <div class="cart-control">
    <transition name="control-transition">
      <i class="icon-remove_circle_outline" @click.stop="countDec" v-show="currentFood.count&&currentFood.count>0"></i>
    </transition>
    <span class="counts" v-show="currentFood.count&&currentFood.count>0">{{currentFood.count}}</span>
    <i class="icon-add_circle" @click.stop="countAdd"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      currentFood: Object
    },
    methods: {
      countDec() {
        this.currentFood.count--;
      },
      countAdd() {
        if (!this.currentFood.count) {
          Vue.set(this.currentFood, 'count', 1);
        } else {
          this.currentFood.count++;
        }
        this.$root.eventHub.$emit('drop_el', event.target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cart-control
    position: relative
    color: rgb(0, 160, 220)
    .control-transition-enter-active, .control-transition-leave-active
      transition: all 0.3s ease
    .control-transition-enter, .control-transition-leave-active
      transform: translateX(24px) rotate(180deg)
      opacity: 0
    .icon-remove_circle_outline
      display: inline-block
      height: 24px
      width: 24px
      padding: 3px
      font-size: 24px
      text-align: center
    .counts
      display: inline-block
      vertical-align: top
      margin: 0 3px
      line-height: 30px
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      height: 24px
      width: 24px
      padding: 3px
      font-size: 24px
      text-align: center
</style>
