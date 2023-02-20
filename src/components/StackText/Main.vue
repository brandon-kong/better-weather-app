<template>
    <div class="stack-container">
        <h1 class="stack-title">Weather</h1>
        <h2 class="stack-subtitle">Like you've never seen before</h2>
        <p class="stack-text">Get extensive weather reports for any place in the world!</p>
    </div>
</template>

<style scoped>
    h1, h2, p {
        margin: 0;
        padding: 5px 0;
    }

    .stack-container {
        width: 80%;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        text-align: left;
        height: auto;
    }

    .stack-title {
        font-size: 1.7rem;
        font-weight: 900;
        color: #000;
        line-height: 1.2;
    }

    .stack-subtitle {
        font-size: 1.2rem;
        font-weight: 600;
        color: #a4a4a4;
        line-height: 1.1;
    }

    .stack-text {
        font-size: 1rem;
        font-weight: 400;
        color: #a4a4a4;
        line-height: 1.2;
    }

</style>

<script>

export default {
    name: 'StackText'
}

</script>
