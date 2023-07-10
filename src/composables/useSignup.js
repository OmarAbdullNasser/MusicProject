import { ref } from 'vue'
import { projrctAuth } from '../Firebase/config'

const error = ref(null)
const isPadding = ref(false)

const signup = async (email, password, displayName) => {
  error.value = null
  isPadding.value = true


  try {
    const res = await projrctAuth.createUserWithEmailAndPassword(email, password)
    
    if (!res) {
      throw new Error('Could not complete signup')
    }
    await res.user.updateProfile({ displayName })
    error.value = null
    isPadding.value = false
    
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = err.message
    isPadding.value = false
  }
}

const useSignup = () => {
  return { error, signup, isPadding }
}

export default useSignup