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
        border: 1px solid #a4a4a4;
        background: none;
        border-radius: 5px;
        color: #ffffff;
        opacity: 0.3;

        transition: all 0.3s ease;
    }

    .searchbox-input:focus {
        outline: none;
        opacity: .7;
    }

    .searchbox-input::placeholder {
        color: #fff;
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
