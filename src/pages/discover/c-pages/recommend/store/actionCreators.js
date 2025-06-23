import * as actionTypes from "./constants"

import { 
  getTopBanners,
  getHotRecommends,
  getNewAlbums
 } from '../../../../../services/recommend'

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.data.banners
})

const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.data.result
})

const changeNewAlbumAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbums: res.data.albums
})


export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      //console.log("res", res)
      dispatch(changeTopBannerAction(res))
    })
  }
}

export const getHotRecommendAction = (limit) => {
  return dispatch => {
    getHotRecommends(limit).then(res => {
      //console.log(res)
      dispatch(changeHotRecommendAction(res))
    })
  }
}

export const getNewAlbumAction = (limit) => {
  return dispatch => {
    getNewAlbums(limit).then(res => {
      //console.log(res)
      dispatch(changeNewAlbumAction(res))
    })
  }
}