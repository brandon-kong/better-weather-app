<template>
    <div class="stack-container">
        <div class="stack-status">New</div>
        <h1 class="stack-title"><strong>Weather</strong></h1>
        <h2 class="stack-subtitle">Like you've never seen before</h2>
        <p class="stack-text">Get extensive weather reports for any place in the world!</p>
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
        padding: .1rem 1rem;
        border-radius: 30px;
        font-size: 1rem;
        font-weight: 400;
        color: #fff;
        background-color: #a24ab0;
    }

    .stack-title {
        font-size: 2.5rem;

        color: #000;
        line-height: 1.3;
    }

    .stack-subtitle {
        font-size: 1.8rem;
        font-weight: 400;
        color: #a4a4a4;
        line-height: 1.1;
    }

    .stack-text {
        font-size: 1.2rem;
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
