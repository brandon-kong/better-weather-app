<template>
    <router-link to="/">
        <img v-if="!isWhite" draggable="false" class="logo" src="@/assets/logo.png" alt="logo" width="80" />
        <img v-else draggable="false" class="logo" src="@/assets/logo-white.png" alt="logo" width="80" />
    </router-link>
</template>

<style scoped>
    .logo {
        cursor: pointer;
    }
</style>

<script>

export default {
    name: 'IconNav',
    props: {
        isWhite: {
            type: Boolean,
            default: false
        }
    }
}

</script>
