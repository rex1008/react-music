import React, { memo } from 'react'

import TopBanner from './c-cpns/top-banner'
import { RecommendWrapper } from './style'

function MCRecommend(props) {
  return (
    <RecommendWrapper>
      <TopBanner/>
    </RecommendWrapper>
  )
}

export default memo(MCRecommend)
