import { useRouter } from "vue-router"
import { ref } from 'vue';


const useProduct = () => {
    
    const API = import.meta.env.VITE_APP_API
    const router = useRouter()

    const getProducts = async () => {
        const response = await fetch(`${ API }/api/products`)
        const data = await response.json()
        return data.products
    }

    const getProductById = async ( id ) => {
        const response = await fetch(`${API}/api/products/${id}`);
        const data = await response.json();
        return data.product;
    }

    const getProductByName = async ( name ) => {
        const response = await fetch(`${API}/api/products?search=${name}`);
        const data = await response.json();
        return data.products;
    }

    const addProduct = async ( data ) => {
        await fetch(`${ API }/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true",
            },
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
        fetch(`${API}/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }   
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
        fetch(`${API}/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
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