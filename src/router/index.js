import MCDiscover from '@/pages/discover'
import MCMine from '@/pages/mine'
import MCFriend from '@/pages/friend'


const routes = [
  {
    path: '/',
    exact: true,
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