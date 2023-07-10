import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import Createplay from '../views/playlist/Createplay.vue'
import { projrctAuth } from '@/Firebase/config'
import PlaylistDetails from '../views/playlist/PlaylistDetails'
import UserPlaylist from '../views/playlist/UserPlaylist.vue'
//route graud

const requidAuth =(to ,from , next) =>{
  let user = projrctAuth.currentUser;
  if(!user){
    next({name:'Login'})
  }else{
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: requidAuth
  },
  {
    path:'/Login',
    name:'Login',
    component:Login
  },
  {
    path:'/Signup',
    name:'Signup',
    component:Signup
  },
  {
    path:'/playlist/create',
    name:'Createplay',
    component:Createplay,
    beforeEnter: requidAuth
  }, 
  {
    path:'/playlist/:id',
    name:'PlaylistDetails',
    component:PlaylistDetails,
    beforeEnter: requidAuth,
    props:true,
  },  {
    path:'/playlist/userplaylist',
    name:'UserPlaylist',
    component:UserPlaylist,
    beforeEnter: requidAuth
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
