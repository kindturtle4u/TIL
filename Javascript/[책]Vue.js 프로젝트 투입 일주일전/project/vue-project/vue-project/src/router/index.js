import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataBinding from "@/views/DataBinding";
import DataBindingInputText from "@/views/DataBindingInputText";
import DataBindingCheckbox2 from "@/views/DataBindingCheckbox2";
import EventClick from "@/views/EventClick";

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
    path: '/databinding',
    name: 'databinding',
    component: DataBinding
  },
  {
    path: '/databindinginputtext',
    name: 'databindinginputtext',
    component: DataBindingInputText
  },
  {
    path: '/databindingcheckbox2',
    name: 'databindingcheckbox2',
    component: DataBindingCheckbox2
  },
  {
    path: '/eventclick',
    name: 'eventclick',
    component: EventClick
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
