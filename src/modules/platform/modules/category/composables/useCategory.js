import { useRouter } from "vue-router"

const useCategory = () => {
    const API = import.meta.env.VITE_APP_API
    const router = useRouter()

    const addCategory = async ( data ) => {
        await fetch(`${ API }/api/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('idToken')
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) { 
                router.push({
                    name: 'list-categories'
                })
            }
        })
    }

    const getCategories = async () => {
        const response = await fetch(`${ API }/api/category`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'x-token': localStorage.getItem('idToken')
            }
        })
        const data = await response.json()
        return data.categorias
    }

    const getCategoryById = async ( id ) => {
        const response = await fetch(`${API}/api/category/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'x-token': localStorage.getItem('idToken')
            }
        });
        const data = await response.json();
        return data;
    }

    const updateCategory = async ( id, data ) => {
        await fetch(`${API}/api/category/${id}`, {
            method: 'PUT',
            headers: {  
                'Content-type': 'application/json',
                'x-token': localStorage.getItem('idToken')
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) { 
                router.push({
                    name: 'list-categories'
                })
            }
        })
    }

    const deleteCategory = ( id ) => {
        fetch(`${API}/api/category/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
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
        router.push({ name: 'list-categories' })
    }

    const goToUpdateCategory = ( id ) => {
        router.push({
            name: 'update-category',
            params: { id }
        })
    }

    const capitalizeFirstLetter = ( string ) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return {
        addCategory,
        cancelActions,
        getCategories,
        deleteCategory,
        goToUpdateCategory,
        getCategoryById,
        updateCategory,
        capitalizeFirstLetter
    }
}

export default useCategory