<template>
  <form @submit.prevent="handlSubmit">
    <h4>Create New PlayList</h4>
    <input type="text" required placeholder="Enter Playlist Name..." v-model="title">
    <textarea required placeholder="Enter Playlist description..." v-model="description" ></textarea>

    <!--Upload Cover Img-->
    <label> Upload Cover Img for your playlist</label>
    <input type="file" @change="handleChange" >
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPadding">Create Playlist</button>
    <button v-if="isPadding" disabled>Saving...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import getUser from "@/composables/getUser"
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/Firebase/config'
import {  useRouter } from 'vue-router'

export default {
    setup(){
        const {url, filepath, uploadImage} = useStorage()
        const { user } = getUser()
        const { error , addDoc} = useCollection('playlists')
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref('')
        const isPadding = ref(false)

        //allowed types
        const types = ['image/png','image/jpeg']

        const handlSubmit = async () =>{
            if(file.value){
                isPadding.value= true
              await uploadImage(file.value)
             const res =  await addDoc({
                title: title.value,
                description : description.value,
                userId: user.value.uid,
                userName: user.value.displayName,
                coverUrl: url.value,
                filePath : filepath.value,
                song:[],
                createdAt: timestamp()
              })
              isPadding.value=false
              if(!error.value){
                router.push({name:'PlaylistDetails', params:{ id: res.id }})
              }
              
            }
        }

         
        const handleChange = (e) =>{
            const selected = e.target.files[0];
      
            
            if(selected && types.includes(selected.type)){
                file.value = selected   
                fileError.value = null

            }else{
                file.value = null   
                fileError.value = 'Please select an Img file (png or jpeg)'   
            }
        }

        return{title, description , handlSubmit, handleChange,fileError, isPadding}
    }
}
</script>

<style>
    input[type="file"]{
        border: 0;
        padding: 0;
    }
    label{
        font-size: 12px;
        display: block;
        margin-top:30px ;
    }
    button{
        margin-top: 20px;
    }
</style>