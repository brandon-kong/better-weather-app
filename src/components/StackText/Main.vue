<template>
    <div class="stack-container">
        <div class="stack-status">{{ status }}</div>
        <h1 class="stack-title">{{ title }}</h1>
        <h2 class="stack-subtitle">{{ subtitle }}</h2>
        <p class="stack-text">{{ text }}</p>
    </div>
</template>

<style scoped>
    h1, h2, p {
        margin: 0;
        padding: 2px 0;
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
    }

    .stack-status {
        padding: .1rem 0rem;
        border-radius: 30px;
        font-size: 1.3git addrem;
        font-weight: 600;
        color: var(--color-primary);
        background-color: white;
    }

    .stack-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: #000;
        line-height: 1.1;
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
        line-height: 1.2;

        max-width: 25rem;
    }

</style>

<script>

export default {
    name: 'StackText',

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
        }
    }
}

</script>
