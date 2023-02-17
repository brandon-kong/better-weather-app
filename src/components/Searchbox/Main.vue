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
        padding: 6px 4rem;
        font-size: .9rem;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .searchbox-input:focus {
        outline: none;
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
    },

    created () {
        console.log(this.search)
    }
}

</script>
