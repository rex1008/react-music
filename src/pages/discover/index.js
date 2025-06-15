import React, { memo } from 'react'

import { 
  DiscoverWrapper,
  TopMenu
 } from './style'

export default memo(function MCDiscover() {
  return (
    <DiscoverWrapper>
      <div className='top'>
        <TopMenu className='wrap-v1'>
          discover music conent
        </TopMenu>
      </div>
    </DiscoverWrapper>
  )
})
