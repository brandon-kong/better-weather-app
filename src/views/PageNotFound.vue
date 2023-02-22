<template>
    <div class="page-not-found-container">
        <Navbar />
        <div class="page-not-found">
            <img draggable="false" class="not-found-image" src="@/assets/not-found.svg" alt="404"/>
            <h1>404</h1>
            <h2 class="secondary-text">Page not found</h2>
            <RouterButton to="/">Go back to home</RouterButton>
        </div>
    </div>
</template>

<style scoped>
    .page-not-found {
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
    }

    .secondary-text {
        padding-bottom: 1rem;
    }

    .not-found-image {
        width: 300px;
    }
</style>

<script>

// Components
import RouterButton from '@/components/Home/RouterButton.vue'
import Navbar from '@/components/Navbar/Main.vue'

export default {
    name: 'PageNotFound',

    components: {
        Navbar,
        RouterButton
    }
}

</script>
