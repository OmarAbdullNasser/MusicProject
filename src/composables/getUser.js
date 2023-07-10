import { ref } from 'vue'
import { projrctAuth } from '../Firebase/config'

// refs
const user = ref(projrctAuth.currentUser)


// auth changes
projrctAuth.onAuthStateChanged(_user => {
  console.log('User state change. Current user is:', _user)
  user.value = _user
});

const getUser = () => {
  return { user } 
}

export default getUser