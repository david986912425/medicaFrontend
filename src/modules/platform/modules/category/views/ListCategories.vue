<script setup>
import { ref, onMounted } from 'vue'
import useCategory from '../composables/useCategory';
import CategoryCard from '../components/CategoryCard.vue';

const { getCategories } = useCategory();
const categories = ref([]);

onMounted(async () => {
    categories.value = await getCategories();
})

</script>

<template>
    <section class="categories__section">
      <div class="categories__container">
          <div class="container__header">
              <span class="header__title">Lista de categorías</span>
          </div>
          <section class="categories__list">
            <CategoryCard 
                v-for="category in categories" 
                :key="category._id" 
                :category="category" 
            />
          </section>
      </div>
  </section>
</template>

<style scoped>
.categories__container {
    width: inherit;
    margin-bottom: 6.4rem;
    display: flex;
    flex-direction: column;
}

.container__header {
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

.header__title {
    color: var(--color-primary);
    font-size: 2.4rem;
    font-weight: 700;
}

.categories__list {
    margin: 3.2rem auto;
    width: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3.2rem;
}
</style>