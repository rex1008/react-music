import * as actionTypes from "./constants"

import { getTopBanners } from '../../../../../services/recommend'

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.data.banners
})

export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      console.log("res", res)
      dispatch(changeTopBannerAction(res))
    })
  }
}