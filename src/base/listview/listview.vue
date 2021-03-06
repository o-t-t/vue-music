<template>
  <scroll class='listview' :listen-scroll='listenScroll' :probe-type='probeType' :data='data' @scroll='scroll' ref='listview'>
    <ul>
      <li ref='listGroup' class='list-group' v-for='(group,index) in data' :key='index'>
        <h2 class='list-group-title'>{{group.title}}</h2>
        <ul>
          <li class='list-group-item' v-for='(item,index) in group.items' :key='index' @click='selectItem(item)'>
            <img class='avatar' v-lazy='item.avatar' alt="">
            <span class='name'>{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

    <div class="list-shortcut" @touchstart='onshortcutTouchStart' @touchmove.stop.prevent='onshortcutTouchMove'>
      <ul>
        <li class='item' :data-index='index' v-for='(item,index) in shortcutList' :key='index' :class="{'current' : currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>

    <div class="list-fixed" v-show='fixedTitle' ref='fixed'>
      <div class="fixed-title">
        {{fixedTitle}}
      </div>
    </div>

    <div class="loading-container" v-show='!data.length'>
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
import Loading from 'base/loading/loading'
let ANCHOR_HEIGHT = 18
let TITLE_HEIHHT = 30
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
      currentIndex: 0,
      scrollY: -1,
      diff: -1
    }
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0,1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      },20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY为>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length -1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i+1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        } 
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      console.log(newVal)
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIHHT) ? newVal - TITLE_HEIHHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`
    }
  },
  created() {
    this.listenScroll = true
    this.probeType = 3
    this.touch = {}
    this.listHeight = []
  },
  methods: {
    selectItem(item){
      this.$emit('select',item)
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    onshortcutTouchStart(e){
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex

      this._scrollTo(anchorIndex)
    },

    onshortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) /ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    //计算高度
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }

      this.scrollY = -this.listHeight[index]
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
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background      
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>