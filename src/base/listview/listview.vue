<template>
  <scroll class='listview' :listen-scroll='listenScroll' :probe-type='probeType' :data='data' ref='listview'>
    <ul>
      <li ref='listGroup' class='list-group' v-for='(group,index) in data' :key='index'>
        <h2 class='list-group-title'>{{group.title}}</h2>
        <ul>
          <li class='list-group-item' v-for='(item,index) in group.items' :key='index'>
            <img class='avatar' v-lazy='item.avatar' alt="">
            <span class='name'>{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut" @touchstart='onshortcutTouchStart'>
      <ul>
        <li class='item' :data-index='index' v-for='(item,index) in shortcutList' :key='index' :class="{'current' : currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
export default {
  props: {
    data: {
      type: Array,
      /* eslint-disable*/
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  components: {
    Scroll
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0,1)
      })
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
  },
  methods: {
    onshortcutTouchStart(e){
      console.log(e)
      let anchorIndex = getData(e.target, 'index')
      console.log(anchorIndex)
      this._scrollTo(anchorIndex)
    },
    _scrollTo(index) {
      console.log(index)
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      pading-bottom: 30px
      .list-group-title
        heigth: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex;
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px;
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px;
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
</style>