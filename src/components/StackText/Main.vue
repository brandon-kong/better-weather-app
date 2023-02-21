<template>
    <div class="stack-container">
        <div class="stack-status">{{ status }}</div>
        <h1 class="stack-title">{{ title }}</h1>
        <h2 class="stack-subtitle">{{ subtitle }}</h2>
        <p class="stack-text">{{ text }}</p>
        <RouterButton class="cta-button" :to="to">{{ call_to_action }}</RouterButton>
    </div>
</template>

<style scoped>
    h1, h2, p {
        margin: 0;
    }

    .stack-container {
        width: 30rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        text-align: left;
        height: auto;
        gap: 1rem;
    }

    .stack-status {
        padding: .1rem 0rem;
        border-radius: 30px;
        font-size: 1.3;
        font-weight: 600;
        color: var(--color-primary);
        background-color: white;
    }

    .stack-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #000;
        line-height: 1.3;
        width: 20rem;
    }

    .stack-subtitle {
        font-size: 1.5rem;
        font-weight: 700;
        color: #303030;
        line-height: 1.1;
    }

    .stack-text {
        font-size: 1.3rem;
        font-weight: 100;
        color: #a4a4a4;
        line-height: 1.4;
        max-width: 25rem;
    }

    .cta-button {
        font-weight: 500;
        margin-top: 1rem;
    }

</style>

<script>

import RouterButton from '@/components/Home/RouterButton.vue'

export default {
    name: 'StackText',

    components: {
        RouterButton
    },

    props: {
        status: {
            type: String,
            default: 'New'
        },
        title: {
            type: String,
            default: 'Stack Text'
        },
        subtitle: {
            type: String,
            default: 'Like you\'ve never seen before'
        },
        text: {
            type: String,
            default: 'Get extensive weather reports for any place in the world!'
        },
        call_to_action: {
            type: String,
            default: 'Get Started'
        },
        to: {
            type: String,
            default: '/'
        }
    }
}

</script>
