<template>
  <div class='tab'>
    <router-link v-for='(item,index) in linkList' :key='index' tag='div' class='tab-item' :to='item.linkUrl'>
      <span class='tab-link'>{{item.tabName}}</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      linkList: [
        {
          tabName: '推荐',
          linkUrl: '/recommend'
        },
        {
          tabName: '歌手',
          linkUrl: '/singer'
        },
        {
          tabName: '排行',
          linkUrl: '/rank'
        },
        {
          tabName: '搜索',
          linkUrl: '/search'
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>