<template>
  <div class="error" v-if="error"> {{ error }}</div>
  <div v-if="playlist" class="playlist-details">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="onwership" @click="handleDelete">Delete this PlayList</button>
    </div>

    <!-- song list -->
    <div class="song-list">
     <div v-if="!playlist.song.length">No Songs have been added to this play list yet .</div>
     <div v-for="song in playlist.song" :key="song.id" class="single-song">
      <div class="details">
        <h3>{{ song.title }}</h3>
        <p>{{ song.artist }}</p>
      </div>
      <button v-if="onwership" @click="DeleteSong(song.id)">delete</button>
     </div>
      <AddSong v-if="onwership" :playlist="playlist"/>
    </div>
    
  </div>
</template>

<script>
import AddSong from '@/components/AddSong.vue'
import getDocument from '@/composables/getDocument'
import { computed } from 'vue'
import getUser from '@/composables/getUser'
import useDocumt from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import { useRouter } from 'vue-router'


export default {
  props: ['id'],
  components:{AddSong},
  setup(props) {
    const  { error, document: playlist } = getDocument('playlists', props.id);
    const {user} = getUser()
    const {errorDel, deletDoc, isPadding , updateDoc} =  useDocumt('playlists', props.id);
    const {deleteImage} = useStorage()
    const router = useRouter()
    const onwership = computed(() =>{
      return playlist.value && user.value && user.value.uid == playlist.value.userId
    }) 


    const handleDelete = async () =>{
      deleteImage(playlist.value.filePath)
      await deletDoc()
      router.push({name:'home'})
      if(!errorDel.value){
        console.log('this Playlist is deleted')
      }
    }

    const DeleteSong = async (id) =>{
        const songs = playlist.value.song.filter((song)=>{
          return id != song.id});
        await updateDoc({song: songs })
    }
    return { error, playlist ,onwership,handleDelete, isPadding,DeleteSong}
  }
}
</script>

<style>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: left;
  }
  .single-song{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--scondary);
    margin-bottom: 20px;
  }
</style>