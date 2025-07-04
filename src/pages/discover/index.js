import React, { memo, useEffect } from 'react'

import { renderRoutes } from 'react-router-config'
import { NavLink } from 'react-router-dom'

import { discoverMenu } from '../../common/local-data'

import { 
  DiscoverWrapper,
  TopMenu
 } from './style'

export default memo(function MCDiscover(props) {

  const { route } = props;

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
      {renderRoutes(route.routes)}
    </DiscoverWrapper>
  )
})
