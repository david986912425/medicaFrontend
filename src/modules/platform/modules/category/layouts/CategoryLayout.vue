<template>
    <router-view v-slot="{ Component }" class="view">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style scoped>
    .main {
        max-width: 1440px;
        margin: 3.2rem auto;
        padding: 0 3.2rem;
        min-height: calc(100vh - 102px);
        display: flex;
        gap: 3.2rem;
    }
    .view {
        width: 100%;
    }
</style>