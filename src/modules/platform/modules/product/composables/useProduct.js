import { useRouter } from "vue-router"
import { ref } from 'vue';


const useProduct = () => {
    
    const API = import.meta.env.VITE_APP_API
    const router = useRouter()

    const fetchWithNgrokHeader = async (url, options = {}) => {
        const defaultHeaders = {
            "ngrok-skip-browser-warning": "true",
            'Content-Type': 'application/json'
        };

        options.headers = { ...defaultHeaders, ...options.headers };

        const response = await fetch(url, options);
        return response;
    };

    const getProducts = async () => {
        const response = await fetchWithNgrokHeader(`${ API }/api/products`)
        const data = await response.json()
        return data.products
    }

    const getProductById = async ( id ) => {
        const response = await fetchWithNgrokHeader(`${API}/api/products/${id}`);
        const data = await response.json();
        return data.product;
    }

    const getProductByName = async ( name ) => {
        const response = await fetchWithNgrokHeader(`${API}/api/products?search=${name}`);
        const data = await response.json();
        return data.products;
    }

    const addProduct = async ( data ) => {
        await fetchWithNgrokHeader(`${ API }/api/products`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) { 
                router.push({
                    name: 'list-products'
                })
            }
        })
    }

    const deleteProduct = ( id ) => {
        fetchWithNgrokHeader(`${API}/api/products/${id}`, {
            method: 'DELETE',
        })
        .then(res => {
            if (res.ok) { 
                console.log("HTTP request successful")
                router.go() 
            }
        })
    }

    const goToUpdateProduct = ( id ) => {
        router.push({
            name: 'update-product',
            params: { id }
        })
    }

    const goToSearchProducts = ( name ) => {
        router.push({
            name: 'search-product',
            params: { name }
        })
    }

    const updateProduct = ( id, data ) => {
        fetchWithNgrokHeader(`${API}/api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok) { 
                console.log("HTTP request successful")
                router.push({
                    name: 'list-products'
                })
            }
        })
    }

    const goToInfoProduct = (id) => {
        console.log(id)
        router.push({
            name: 'info-product',
            params: { id }
        })
    }

    const cancelActions = () => {
        router.push({ name: 'list-products' })
    }

    return {
        addProduct,
        deleteProduct,
        goToUpdateProduct,
        cancelActions,
        getProducts,
        getProductById,
        updateProduct,
        goToInfoProduct,
        goToSearchProducts,
        getProductByName
    }
}

export default useProduct