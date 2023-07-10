<template>
<div class="add-song">
    <button v-if="isAdding" @click="isAdding = false">Add Song</button>
  <form v-else @submit.prevent="handleAdd">
    <h4>Add Songs</h4>
    <input type="text" placeholder="Enter Song Name" required v-model="title"/>
    <input type="text" placeholder="Enter Artist Name" required v-model="artist"/>
    <button>Add Song</button>
  </form>
</div>
</template>

<script>
import { ref } from 'vue'
import useDocumt from '@/composables/useDocument';
export default {
    props:['playlist'],
    setup(props){
        const title = ref('');
        const artist = ref('');
        const isAdding = ref(true)
        const { updateDoc } = useDocumt('playlists', props.playlist.id)



        const handleAdd = async () =>{
            const newsong={
                title:title.value,
                artist:artist.value,
                id:Math.floor(Math.random() * 10000000)
            }
            await updateDoc({
                song: [...props.playlist.song, newsong]
                
            })
            title.value= ''
            artist.value= ''
        };  


        return{title,artist,isAdding, handleAdd}
    }
}
</script>

<style scoped>
    .add-song{
        text-align: center;
        margin-top: 40px;
    }
    form{
        max-width: 100%;
        text-align: left;
    }
</style>