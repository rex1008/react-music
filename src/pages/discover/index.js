import React, { memo } from 'react'

import { discoverMenu } from '../../common/local-data'

import { 
  DiscoverWrapper,
  TopMenu
 } from './style'
import { NavLink } from 'react-router-dom'

export default memo(function MCDiscover() {
  return (
    <DiscoverWrapper>
      <div className='top'>
        <TopMenu className='wrap-v1'>
          {
            discoverMenu.map((item, index) => {
              return (
                <div className='item' key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </TopMenu>
      </div>
    </DiscoverWrapper>
  )
})
