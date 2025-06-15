import React from 'react'

import MCDiscover from '@/pages/discover'
import MCMine from '@/pages/mine'
import MCFriend from '@/pages/friend'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const routes = [
  {
    path: '/',
    exact: true,
    render: () => (
      <Redirect to="/discover" />
    )
  },
  {
    path: '/discover',
    //exact: true,
    component: MCDiscover
  },
  {
    path: '/mine',
    exact: true,
    component: MCMine
  },
  {
    path: '/friend',
    exact: true,
    component: MCFriend
  }
]

export default routes