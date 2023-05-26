const useCategory = () => {
    const API = import.meta.env.VITE_APP_API

    const getCategories = async () => {
        const response = await fetch(`${ API }/api/category`)
        const data = await response.json()
        return data.categorias
    }

    return {
        getCategories
    }
}

export default useCategory