import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { HOT_RECOMMEND_LIMIT } from '../../../../../../common/constants'

import ThemeHeaderRCM from './../../../../../../components/theme-header-rcm'
import SongsCover from './../../../../../../components/songs-cover'


import { 
  HotRecommendWrapper
 } from './style'

import { getHotRecommendAction } from '../../store/actionCreators'

export default memo(function HotRecommend() {
  // redux hooks
  const { hotRecommends } = useSelector(state => ({
    hotRecommends: state.recommend.get("hotRecommends")
  }), shallowEqual)
  const dispatch = useDispatch()

  // other hooks
  useEffect(() => {
    dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
  }, [dispatch])

  return (
    <HotRecommendWrapper>
      <ThemeHeaderRCM title="热门推荐" keywords={["华语","流行","民谣","摇滚", "电子"]} />
      <div className='recommend-list'>
        {
          hotRecommends.map((item, index) => {
            console.log(item)
            return <SongsCover key={item.id} info={item} />
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})
