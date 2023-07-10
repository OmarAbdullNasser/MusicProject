<template>
    <form @submit.prevent="HandleSignup" >
      <h3>Signup</h3>
      <input type="text" placeholder="Enter your Name..." v-model="displayName">
      <input type="email" placeholder="Enter your email..." v-model="email">
      <input type="password" placeholder="Enter your password..." v-model="password">
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPadding">Signup</button>
      <button v-if="isPadding" disabled>loading...</button>
    </form>
  </template>
  
  <script>
  import useSignup from '@/composables/useSignup';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'

  export default {
      setup(){
          const {error, signup, isPadding} = useSignup();
          const router = useRouter()  

          const email = ref('');
          const password = ref ('');
          const displayName = ref ('');

          const HandleSignup = async() =>{
              const res= await signup(email.value,password.value,displayName.value)
              if(!error.value){
                  console.log('user Signed up')
              }   
              router.push({name:'UserPlaylist'})   
          }
          return{email, password , displayName, HandleSignup,error,isPadding}
  
      }
  }
  </script>
  
  <style>
  
  </style>