<template>
  <form @submit.prevent="HandleSubmit" >
    <h3>Login</h3>
    <input type="email" placeholder="Enter your email..." v-model="email">
    <input type="password" placeholder="Enter your password..." v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPadding">Login</button>
    <button v-if="isPadding" disabled>loading...</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin';
import { ref } from 'vue';
import { useRouter } from 'vue-router'

export default {
    setup(){
        const {error, login, isPadding} = useLogin();
        const router = useRouter()


        const email = ref('');
        const password = ref ('');

        const HandleSubmit = async() =>{
            const res= await login(email.value,password.value)
            if(!error.value){
                console.log('user Logged in')
            }
            router.push({name:'UserPlaylist'})   
        }
        return{email, password, HandleSubmit,error,isPadding}

    }
}
</script>

<style>

</style>