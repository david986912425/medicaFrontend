export default {
    name: 'worker',
    component: () => import('../layouts/WorkerLayout.vue'),
    children: [
        {
            path: 'lista-colaboradores',
            name: 'list-workers',
            component: () => import('../views/ListWorkers.vue')
        },
        {
            path: 'add-worker',
            name: 'add-worker',
            component: () => import('../views/NewWorker.vue')
        },
        {
            path: 'editar-colaborador/:id',
            name: 'update-worker',
            component: () => import('../views/UpdateWorker.vue'),
            props: (route) => { 
              const id = Number( route.params.id )
              return isNaN( id ) ? { id: 1} : { id } 
            }
          },
    ]    
}