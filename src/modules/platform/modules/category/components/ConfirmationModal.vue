<script setup>
import useCategory from '../composables/useCategory';

const { deleteCategory, capitalizeFirstLetter } = useCategory()

const props = defineProps({
    categoryid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

defineEmits(['close'])
</script>

<template>
    <div>
        <div class="content">
            <h2>¿Estás seguro de eliminar la categoría "{{ capitalizeFirstLetter( props.name ) }}"?</h2>
            <p>Recuerda que esta acción no se puede deshacer</p>
        </div>
        <div class="actions">
            <button 
                class="actions__cancel"
                @click="$emit('close')" 
            > Cancelar </button>
            <button 
                class="actions__delete"
                @click="deleteCategory(props.categoryid)"
            > Sí, eliminar </button>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    gap: .8rem;
    align-items: center ;
}
h2{
    font-size: 2.4rem;
    font-weight: 600;
    color: var(--text-color);
}
p{
    font-size: 1.6rem;
    font-weight: 400;
    color: var(--text-color);
}
.actions{
    display: flex;
    gap: 3.2rem;
    align-items: center;
    justify-content:center;
    margin-top: 2.4rem;
}

.actions__cancel {
    color: var(--color-secundary);
    border: none;
    font-size: 1.6rem;
    padding: 1rem 3.2rem;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    background-color: var(--backgroud-component-color);
}
.actions__delete{
    color: var(--color-primary);
    border: none;
    font-size: 1.6rem;
    background-color: #F1FAFF;
    padding: 1rem 3.2rem;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    transition: color .4s ease-in-out, background-color .3s ease-in-out;
}
.actions__delete:hover{
    background-color: var(--color-primary);
    color: #F1FAFF;
    transition: color .4s ease-in-out, background-color .3s ease-in-out;
}
</style>