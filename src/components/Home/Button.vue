<template>
    <button class="button">
        <slot> </slot>
    </button>
</template>

<style>
    .button {
        background-color: var(--color-primary);
        color: #fff;
        border: none;
        border-radius: 30px;
        padding: 10px 25px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .button:hover {
        background-color: var(--color-primary-dark);
    }
</style>

<script>
export default {
    name: 'ButtonComponent'
}
</script>
