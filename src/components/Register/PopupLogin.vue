<template>
    <div class="popup-class">
        <div class="brand-container">
            <div class="google-icon">
                <img class="brand-icon" src="@/assets/google-colored.svg" />
            </div>
            <div class="google-text">
                <span>Sign in with Google</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .google-icon {
        color: #4285f4;
    }

    .brand-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .8rem;
        cursor: pointer;
        color: #777;

        padding: .5rem 8rem;
        border: 2px solid #ededed;

        font-size: 1rem;
        font-weight: 400;
    }

    .brand-icon {
        width: 1.5rem;
        height: 1.5rem;
    }

</style>
<script>

export default {
    name: 'PopupLogin'
}

</script>
