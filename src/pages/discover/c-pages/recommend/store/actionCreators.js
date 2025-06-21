import * as actionTypes from "./constants"

import { 
  getTopBanners,
  getHotRecommends
 } from '../../../../../services/recommend'

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.data.banners
})

const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.data.result
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