import React, { memo, useEffect, useState } from 'react'

import { getTopList } from '../../../../../../services/recommend'

import ThemeHeaderRCM from './../../../../../../components/theme-header-rcm'
import TopRanking from './../../../../../../components/top-ranking'
import { RankingWrapper } from './style'

export default memo(function RecommendRanking() {

  const [topUpList, setTopUpList] = useState([])
  const [topNewList, setTopNewList] = useState([])
  const [topOriginList, setOriginList] = useState([])

  useEffect(() => {
    getTopList(19723756).then(res => {
      console.log("榜单1", res)
      setTopUpList(res.data.playlist)
    })
  }, [])

  useEffect(() => {
    getTopList(3779629).then(res => {
      console.log("榜单2", res)
      setTopNewList(res.data.playlist)
    })
  }, [])

  useEffect(() => {
    getTopList(2884035).then(res => {
      console.log("榜单3", res)
      setOriginList(res.data.playlist)
    })
  }, [])

  return (
    <RankingWrapper>
      <ThemeHeaderRCM title="榜单" />
      <div className='tops'>
          <TopRanking info={topUpList} size={80} />
          <TopRanking info={topNewList} size={80} />
          <TopRanking info={topOriginList} size={80} />
      </div>
    </RankingWrapper>
  )
})
