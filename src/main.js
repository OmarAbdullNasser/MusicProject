import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// styles
import './assets/main.css'
import { projrctAuth } from './Firebase/config';

let app;
projrctAuth.onAuthStateChanged(()=>{
    if(!app){
        app=createApp(App).use(router).mount('#app')
    }
})

