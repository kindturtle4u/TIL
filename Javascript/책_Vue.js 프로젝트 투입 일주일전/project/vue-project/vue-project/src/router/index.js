import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataBinding from "@/views/DataBinding";
import DataBindingInputText from "@/views/DataBindingInputText";
import DataBindingCheckbox2 from "@/views/DataBindingCheckbox2";
import EventClick from "@/views/EventClick";
import DataBindingList2 from "@/views/DataBindingList2";
import NestedComponent from "@/views/NestedComponent";
import ParentComponent from "@/views/ParentComponent";

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
  },
  {
    path: '/databindinglist2',
    name: 'databindinglist2',
    component: DataBindingList2
  },
  {
    path: '/nestedcomponent',
    name: 'nestedcomponent',
    component: NestedComponent
  },
  {
    path: '/parentcomponent',
    name: 'parentcomponent',
    component: ParentComponent
  },
  {
    path: '/kakaologin',
    name: 'kakaologin',
    component: () => import( /* webpackChunkName: "kakaologin" */ '../views/KakaoLogin.vue')
  },
  {
    path: '/naverlogin',
    name: 'NaverLogin',
    component: () => import( /* webpackChunkName: "parent" */ '../views/NaverLogin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
