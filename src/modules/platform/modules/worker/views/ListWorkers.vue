<script setup>
    import { ref, onMounted } from 'vue'
    import useWorker from '../composables/useWorker'
    import WorkerCard from '../components/WorkerCard.vue'

    const admins = ref([])
    const employees = ref([])
    const { getWorkerByRole } = useWorker();

    onMounted( async () => {
        admins.value = await getWorkerByRole('admin')
        employees.value = await getWorkerByRole('employee')
    })
</script>

<template>
  <div class="workers__section">
      <div class="listWorkers__container">
          <div class="categorys">
              <span class="categorys__title">Admistradores</span>
          </div>
          <section class="workers">
            <WorkerCard 
                v-for="admin in admins" 
                :key="admin.id" 
                :worker="admin" 
            />
          </section>
      </div>
      <div class="listWorkers__container">
          <div class="categorys">
              <span class="categorys__title">Colaboradores</span>
          </div>
          <section class="workers">
            <WorkerCard
                v-for="employee in employees"
                :key="employee._id"
                :worker="employee"
            />
          </section>
      </div>
  </div>
</template>
  

  
<style scoped>
    .listWorkers__container{
        width: inherit;
        margin-bottom: 6.4rem;
        display: flex;
        flex-direction: column;
    }
    .categorys{
        width: 100%;
        background-color: var(--background-component-color);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 3.2rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        height: 8rem;
    }
    .categorys__title{
        color: var(--color-primary);
        font-size: 2.4rem;
        font-weight: 700;
    }
  .workers {
    margin: 3.2rem auto;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3.2rem;
}

  </style>