<template>
  <div class="home">
   <div class="error" v-if="error"> Could not fetch the data</div>
   <div class="documents" v-if="documents">
      <ListVeiw :playlists="documents" />
    </div>
    </div> 
</template>

<script>
import getCollection  from '@/composables/getCollection';
import ListVeiw from '@/components/ListVeiw.vue'
export default {
  name: 'HomeView',
  components: {ListVeiw},
  setup(){
    const {error , documents} = getCollection('playlists');

    return{error, documents}
  }
}
</script>
