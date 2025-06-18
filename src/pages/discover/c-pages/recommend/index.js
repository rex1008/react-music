import React, { memo, useEffect } from 'react'

import { getTopBannerAction } from './store/actionCreators'
import { useDispatch, useSelector } from 'react-redux'

function MCRecommend(props) {

  const { topBanners } = useSelector(state => ({
    topBanners: state.recommend.topBanners
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])

  return (
    <div>
      <h2>MCRecommend: {topBanners.length}</h2>
    </div>
  )
}

export default memo(MCRecommend)
