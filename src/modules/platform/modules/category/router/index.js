export default {
    name: 'category',
    component: () => import('../layouts/CategoryLayout.vue'),
    children: [
        {
            path: 'lista-categorias',
            name: 'list-categories',
            component: () => import('../views/ListCategories.vue')
        },
        {
            path: 'add-category',
            name: 'add-category',
            component: () => import('../views/NewCategory.vue')
        },
        {
            path: 'editar-categoria/:id',
            name: 'update-category',
            component: () => import('../views/UpdateCategory.vue'),
            props: (route) => { 
              const id = Number( route.params.id )
              return isNaN( id ) ? { id: 1} : { id } 
            }
          },
    ]    
}