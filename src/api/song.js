import {baseUrl } from 'api/config'
import axios from 'axios'

export function getSongFile(mid) {
  const url = '/api/songsrc'
  return axios.get(baseUrl + url, { params: { songmid: mid } }).then((res) => {
      console.log('getSongFile', res)
      if (res.data.src) {
          return Promise.resolve(res.data.src)
      } else {
          return Promise.reject(new Error('未获取歌曲资源'))
      }
  })
}
