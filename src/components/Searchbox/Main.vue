<template>
    <div class="searchbox">
        <input
            class="searchbox-input"
            v-model="search"
            type="text"
            name="search"
            placeholder="Search for a city"
            autocomplete="off"
        />
    </div>
</template>

<style scope>
    .searchbox {
        margin-left: 1rem;
    }
    .searchbox-input {
        padding: 6px 2rem;
        font-size: .9rem;
        text-align: center;
        border: 1px solid #000;
        background: none;
        border-radius: 5px;
        color: #000;
        opacity: 0.6;

        transition: all 0.3s ease;
    }

    .searchbox-input:focus {
        outline: none;
        opacity: 1;
    }

    .searchbox-input::placeholder {
        color: #000;
    }
</style>
<script>

export default {
    name: 'SearchBox',
    data () {
        return {
            search: '',
            msg: 'Welcome to Your Vue.js App'
        }
    }
}

</script>
