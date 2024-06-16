import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LivestreamOptionsView from '../views/LivestreamOptionsView.vue'
import LowerThirds from '../views/LowerThirds.vue'
import Scoreboard from '../views/Scoreboard.vue'

const routes = [
  { name: 'entry', path: '/', component: LoginView },
  { name: 'options', path: '/options', component: LivestreamOptionsView },
  { name: 'login', path: '/login', component: LoginView },
  { name: 'lower-thirds', path: '/stream/lower-thirds/:port', component: LowerThirds },
  { name: 'scoreboard-overall', path: '/scoreboard/overall/:port', component: Scoreboard }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
