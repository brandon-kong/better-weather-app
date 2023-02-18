<template>
    <button class="button">
        <slot> </slot>
    </button>
</template>

<style>
    .button {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 6px 12px;
        font-size: 1rem;
        cursor: pointer;
    }
</style>

<script>
export default {
    name: 'ButtonComponent'
}
</script>
