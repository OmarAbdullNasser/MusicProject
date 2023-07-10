import { ref } from 'vue'
import { projrctAuth } from '../Firebase/config'

const error = ref(null)
const isPadding = ref(false)

const login = async (email, password) => {
  error.value = null
  isPadding.value = true; 
  try {
    const res = await projrctAuth.signInWithEmailAndPassword(email, password)
    error.value = null
    isPadding.value = false; 
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = 'Incorrect login credentials'
    isPadding.value = false;
  }
}

const useLogin = () => {
  return { error, login, isPadding}
}

export default useLogin