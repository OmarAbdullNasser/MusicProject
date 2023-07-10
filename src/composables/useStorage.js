import { ref } from "vue"
import { projrctStorage } from "@/Firebase/config"
import getUser from "./getUser"

const { user } = getUser()


const useStorage = () =>{
    const error = ref(null)
    const url = ref(null)
    const filepath = ref(null)

    const uploadImage = async (file) =>{
        filepath.value= `cover/${user.value.uid}/${file.name}`
        const storageRef = projrctStorage.ref(filepath.value)
    

        try{
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        }catch(err){
            console.log(err.message)
            error.value= err.message
            
        }
    }

    const deleteImage= async (path) =>{
        const storageRef =  projrctStorage.ref(path)
        try{    
            await storageRef.delete()
        }catch(err){
            console.log(err.messaged);
            error.value= err.message
        }
    }


    return{error, url, filepath, uploadImage, deleteImage }
}

export default useStorage