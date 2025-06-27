import React, { memo } from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'


import routes from './router'
import store from './store'

import MCAppHeader from './components/app-header'
import MCAppFooter from './components/app-footer'

import AppPlayerBar from './pages/player/app-player-bar'

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <MCAppHeader/>
        {renderRoutes(routes)}
        <MCAppFooter/>
        <AppPlayerBar/>
      </HashRouter>
    </Provider>
  )
})
