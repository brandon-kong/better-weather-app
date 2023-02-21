<template>
    <router-link :to="to" class="button">
        <slot></slot>
    </router-link>
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
        text-decoration: none;

        width: fit-content;
        display: block;
    }

    .button:hover {
        background-color: var(--color-primary-dark);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    }

</style>

<script>

export default {
    name: 'RouterButton',
    props: {
        to: {
            type: String,
            default: '/'
        }
    }
}
</script>
