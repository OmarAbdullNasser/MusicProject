<template>
    <div class="user-playlists">
        <h2>My playlist</h2>
        <div v-if="Myplaylists">
            <ListVeiw :playlists="Myplaylists" />
        </div>
        <router-link class="btn" :to="{name:'Createplay'}">Create New PlayList</router-link>
    </div>
   
</template>

<script>
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser'
import ListVeiw from '@/components/ListVeiw.vue';

export default {
    components:{ListVeiw},
    setup(){
        const {user} =getUser()
        const {documents: Myplaylists } = getCollection('playlists',
        ['userId' ,'==' , user.value.uid])

        console.log(Myplaylists)

        return{ Myplaylists}
    }
    
}
</script>

<style>

</style>