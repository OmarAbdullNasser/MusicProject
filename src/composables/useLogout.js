import { ref } from 'vue'
import { projrctAuth } from '../Firebase/config'

// refs
const error = ref(null)
const isPadding = ref(false)

// logout function
const logout = async () => {
  error.value = null
  isPadding.value = true

  try {
    await projrctAuth.signOut()
    isPadding.value = false

  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
    isPadding.value = false
  }
}

const useLogout = () => {
  return { error, logout }
}

export default useLogout