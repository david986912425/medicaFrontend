<script setup>
    import ConfirmationModal from './ConfirmationModal.vue';
    import { ref } from 'vue';
    import useWorker from '../composables/useWorker';

    const isOpen = ref(false);
    const { goToUpdateWorker } = useWorker();
    const props = defineProps({
        worker: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <article class="worker">
        <img src="https://picsum.photos/80" alt="Administrador Icon" class="worker__img">
        <div class="worker__info">
            <span class="worker__name"> {{ props.worker.name }} {{ props.worker.lastname }} </span>
            <span class="worker__email"> {{ props.worker.email }} </span>
        </div>
        <div class="actions">
            <img 
                src="@/assets/icons/edit.png" 
                alt="" class="actions__icon edit"
                @click="goToUpdateWorker(props.worker.uid)" 
            >
            <img 
                src="@/assets/icons/delete.png" 
                alt="" class="actions__icon delete"
                @click="isOpen = true"
            >
            <Teleport to="body">
                <div class="modal" v-if="isOpen">
                    <ConfirmationModal
                        @close="isOpen = false"
                        :name = "props.worker.name"
                        :lastname = "props.worker.lastname"
                        :workerid = "props.worker.uid"
                    />
                </div> 
            </Teleport>
        </div>
    </article>
</template>

<style scoped>
.worker{
    width: 240px;
    height: 212px;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    background-color: var(--background-component-color);
    border-radius: 1rem;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow);
    position: relative;
    padding: 3.2rem;
}
.worker__img{
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 50%;
}
.worker__info{
    display: flex;
    flex-direction: column;
    gap: .8rem;
}
.worker__name{
    font-size: 1.6rem;
    font-weight: 600;
    text-align: center;
}
.worker__email {
    font-size: 1.4rem;
    font-weight: 400;
    text-align: center;
}
.actions{
    position: absolute;
    top: 12px;
    left: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.actions__icon{
    width: 22px;
    object-fit: cover;
    cursor: pointer;
}
.modal{
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal > div{
    background-color: var(--background-component-color);
    padding: 5rem;
    border-radius: 1rem;
}
</style>