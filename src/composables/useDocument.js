import { ref } from 'vue'
import { projectFirestore } from '../Firebase/config'

const useDocumt = (collection, id) => {

  const errorDel = ref(null)
  const isPadding = ref(false)

  let docRef = projectFirestore.collection(collection).doc(id) 
   
  // delet old doc
  const deletDoc = async () => {
    isPadding.value = true,
    errorDel.value= null
    try{
        const res= await docRef.delete()
        isPadding.value= false
        return res
    }catch(err){
        console.log(err.message)
        isPadding.value=false
        errorDel.value = 'Counld not delete this playlis'
    }
  } 
  
  //update doc  
  const updateDoc = async (updates) =>{
    isPadding.value=true
      try{
        const res = await docRef.update(updates)
        isPadding.value= false
        return res
      }catch(err){
        console.log(err.message)
        isPadding.value=false
        errorDel.value = 'Counld not update this playlis'
      }
  }
  return { errorDel, deletDoc, isPadding, updateDoc}
}
export default useDocumt