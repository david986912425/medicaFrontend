import {useAuthStore} from '@/store'
import { useRouter } from 'vue-router';


const useAuth = () => {
    
    const API = import.meta.env.VITE_APP_API
    const store = useAuthStore()
    const router = useRouter()

    const registerUser = async ( data ) => {
        await fetch(`${API}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) { 
                router.push({ name: 'login' }) 
            }
        })
    }

    const loginUser = async ( data ) => {
        await fetch(`${API}/api/auth`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            res.json().then( data => {
                if ( data.ok) {
                    store.getUserData(data.user, data.token)
                    router.push({ name: 'platform' })
                }
            })
        })
    }

    const logoutUser = () => {
        router.push({ name: 'login' })
        store.clearEntryes()
    }

    return {
        registerUser,
        loginUser,
        logoutUser
    }
    
}

export default useAuth