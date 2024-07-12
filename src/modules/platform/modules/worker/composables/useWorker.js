import { useRouter } from "vue-router"

const useWorker = () => {
    const API = import.meta.env.VITE_APP_API
    const router = useRouter()

    const addWorker = async ( data ) => {
        await fetch(`${ API }/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
                'x-token': localStorage.getItem('idToken')
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) { 
                router.push({
                    name: 'list-workers'
                })
            }
        })
    }

    const getWorkers = async () => {
        const response = await fetch(`${ API }/api/user`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "ngrok-skip-browser-warning": "true",
                'x-token': localStorage.getItem('idToken')
            }
        })
        const data = await response.json()
        return data.usuarios
    }

    const getWorkerById = async ( id ) => {
        const response = await fetch(`${API}/api/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "ngrok-skip-browser-warning": "true",
                'x-token': localStorage.getItem('idToken')
            }
        });
        const data = await response.json();
        return data;
    }

    const getWorkerByRole = async ( role ) => {
        let workers = await getWorkers()
        return workers.filter( worker => worker.role === role ) 
    }

    const updateWorker = async ( id, data ) => {
        await fetch(`${API}/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                "ngrok-skip-browser-warning": "true",
                'x-token': localStorage.getItem('idToken')
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) { 
                router.push({
                    name: 'list-workers'
                })
            }
        })
    }

    const deleteWorker = ( id ) => {
        fetch(`${API}/api/user/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                "ngrok-skip-browser-warning": "true",
                'x-token': localStorage.getItem('idToken')
            }   
        })
        .then(res => {
            if (res.ok) { 
                console.log("HTTP request successful")
                router.go() 
            }
        })
    }

    const cancelActions = () => {
        router.push({ name: 'list-workers' })
    }

    const goToUpdateWorker = ( id ) => {
        router.push({
            name: 'update-worker',
            params: { id }
        })
    }

    return {
        addWorker,
        cancelActions,
        getWorkerByRole,
        deleteWorker,
        goToUpdateWorker,
        getWorkerById,
        updateWorker
    }
}

export default useWorker