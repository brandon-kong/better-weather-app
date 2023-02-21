<template>
    <router-link to="/">
        <img draggable="false" class="logo" src="@/assets/logo.png" alt="logo" width="80" />
    </router-link>
</template>

<style scoped>
    .logo {
        cursor: pointer;
    }
</style>

<script>

export default {
    name: 'IconNav'
}

</script>
