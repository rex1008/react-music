import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'


import routes from './router'

import MCAppHeader from '@/components/app-header'
import MCAppFooter from '@/components/app-footer'
import { HashRouter } from 'react-router-dom'

export default memo(function App() {
  return (
    <HashRouter>
      <MCAppHeader/>
      {renderRoutes(routes)}
      <MCAppFooter/>
    </HashRouter>
  )
})
