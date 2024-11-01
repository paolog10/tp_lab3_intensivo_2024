import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmpresasView from '../views/EmpresasView.vue';
import PersonasView from '../views/PersonasView.vue';
import EmpresaDetalleView from '../views/EmpresaDetalleView.vue';
import PersonaDetalleView from '@/views/PersonaDetalleView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/empresas',
    name: 'Empresas',
    component: EmpresasView,
  },
  {
    path: '/personas',
    name: 'Personas',
    component: PersonasView,
  },
  {
    path: '/empresas/:id',
    name: 'EmpresaDetalle',
    component: EmpresaDetalleView,
    props: true,
  },
  {
    path: '/personas/:id',
    name: 'PersonaDetalle',
    component: PersonaDetalleView,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
