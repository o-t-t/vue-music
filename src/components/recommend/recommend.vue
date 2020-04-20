<template>
  <div class='recommend'>
    <scroll :data='discList' class='recommend-content' ref='scroll'>
      <div>
        <div class='slider-wrapper' v-if="recommends.length">
          <slider>
            <div v-for='(item,index) in recommends' :key='index'>
              <a :href="item.linkUrl">
                <img @load='loadImage' :src="item.picUrl" alt="" class='neddsclick'>
              </a>
            </div>
          </slider>
        </div>
        <div class='recommend-list'>
          <h1 class='list-title'>热门歌单推荐</h1>
          <ul>
            <li class='item' v-for='(item,index) in discList' :key='index'>
              <div class='icon'>
                <img v-lazy="item.imgurl" width='60' height='60' alt="">
              </div>
              <div class='text'>
                <h2 class='name' v-html='item.creator.name'></h2>
                <p class='desc' v-html='item.dissname'></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import {getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  components: {
    Slider,
    Scroll
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      /* getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
        }
      }) */
      /* eslint-disable*/
      this.recommends = eval([{"id":26753,"linkUrl":"https://y.qq.com/n/yqq/album/https://y.qq.com/m/digitalbum/gold/index.html?openinqqmusic=1&_video=true&mid=001xjeAV0oMzmS&g_f=yqqjiaodian.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2292762.jpg"},{"id":26765,"linkUrl":"https://y.qq.com/n/yqq/album/7458130060.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2289979.jpg"},{"id":26854,"linkUrl":"https://y.qq.com/n/yqq/album/7528675741.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2292060.jpg"},{"id":26791,"linkUrl":"https://y.qq.com/n/yqq/album/7523631123.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2276417.jpg"},{"id":26830,"linkUrl":"https://y.qq.com/n/yqq/album/000Ms0yP08V5oO.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2285571.jpg"},{"id":26805,"linkUrl":"https://y.qq.com/n/yqq/album/7525027231.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2285695.jpeg"},{"id":26799,"linkUrl":"https://y.qq.com/n/yqq/album/0033XaHI4SILGt.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2290113.jpg"},{"id":26721,"linkUrl":"https://y.qq.com/n/yqq/album/https://y.qq.com/m/digitalbum/gold/index.html?openinqqmusic=1&_video=true&mid=003NIazp1MKvRn&g_f=yqqjiaodian.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2292558.jpg"},{"id":26797,"linkUrl":"https://y.qq.com/n/yqq/album/004UNNF103F6QD.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2286127.jpg"},{"id":26845,"linkUrl":"https://y.qq.com/n/yqq/album/000JRa3r43GMpG.html","picUrl":"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2285149.jpg"}])
      //console.log(this.recommends)
    },

    _getDiscList() {
      getDiscList().then((res) => {
        if(res.code === ERR_OK){
          this.discList = res.data.list
        }
      })
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .recommend
    position: fixed
    width: 100%
    top: 88px;
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%;
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
</style>