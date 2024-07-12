import { useRouter } from "vue-router"

const useWorker = () => {
    const API = import.meta.env.VITE_APP_API
    const router = useRouter()

    const fetchWithNgrokHeader = async (url, options = {}) => {
        const defaultHeaders = {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning": "true",
            'x-token': localStorage.getItem('idToken')
        };

        options.headers = { ...defaultHeaders, ...options.headers };

        const response = await fetch(url, options);
        return response;
    };

    const addWorker = async ( data ) => {
        await fetchWithNgrokHeader(`${ API }/api/user`, {
            method: 'POST',
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
        const response = await fetchWithNgrokHeader(`${ API }/api/user`, {
            method: 'GET',
        })
        const data = await response.json()
        return data.usuarios
    }

    const getWorkerById = async ( id ) => {
        const response = await fetchWithNgrokHeader(`${API}/api/user/${id}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    }

    const getWorkerByRole = async ( role ) => {
        let workers = await getWorkers()
        return workers.filter( worker => worker.role === role ) 
    }

    const updateWorker = async ( id, data ) => {
        await fetchWithNgrokHeader(`${API}/api/user/${id}`, {
            method: 'PUT',
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
        fetchWithNgrokHeader(`${API}/api/user/${id}`, {
            method: 'DELETE',
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