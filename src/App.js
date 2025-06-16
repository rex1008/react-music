import React, { memo } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'


import routes from './router'

import MCAppHeader from './components/app-header'
import MCAppFooter from './components/app-footer'

export default memo(function App() {
  return (
    <HashRouter>
      <MCAppHeader/>
      {renderRoutes(routes)}
      <MCAppFooter/>
    </HashRouter>
  )
})
