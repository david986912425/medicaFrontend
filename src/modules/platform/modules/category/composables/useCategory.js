import { useRouter } from "vue-router"

const useCategory = () => {
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

    const addCategory = async ( data ) => {
        await fetchWithNgrokHeader(`${ API }/api/category`, {
            method: 'POST',
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
        const response = await fetchWithNgrokHeader(`${ API }/api/category`, {
            method: 'GET',
        })
        const data = await response.json()
        return data.categorias
    }

    const getCategoryById = async ( id ) => {
        const response = await fetchWithNgrokHeader(`${API}/api/category/${id}`, {
            method: 'GET',
        });
        const data = await response.json();
        return data;
    }

    const updateCategory = async ( id, data ) => {
        await fetchWithNgrokHeader(`${API}/api/category/${id}`, {
            method: 'PUT',
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
        fetchWithNgrokHeader(`${API}/api/category/${id}`, {
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