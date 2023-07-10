import { ref } from 'vue'
import { projectFirestore } from '../Firebase/config'

const useCollection = (collection) => {

  const error = ref(null)
  const isPadding = ref(false)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null
    isPadding.value = true
    try {
      const res=  await projectFirestore.collection(collection).add(doc)
      isPadding.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = 'could not send the message'
      isPadding.value = false
    }
  }

  return { error, addDoc }

}

export default useCollection