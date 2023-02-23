<template>
    <div>
        <Navbar />
        <div class="searchbar-container">
            <input class="searchbar autocomplete geoapify-autocomplete-input" type="text" placeholder="Search Locations"
            v-model="search" @input="searchLocations"
            @focusout="focusLost"
            @focus="focusIn"
            />
            <div v-if="query.length > 0" class="search-container">
                <ul class="search-list">
                    <li v-for="location in query" :key="location.id" class="search-suggestion" @click="selectionMade">
                        {{ location.properties.address_line1 }}, {{ location.properties.state_code }} {{ location.properties.postal_code }} {{ location.properties.country }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style>
.searchbar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.searchbar {
    width: 50%;
    height: 2rem;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 1.4rem 2rem;
    font-size: 1.4rem;
    outline: none;
}

.search-container {
    color: black;
    margin: auto;
    width: 50%;
}

.search-list {
    list-style: none;
    border: 1px solid #000;
    border-radius: 0px 0px 5px 5px;
    border-top: none;
}

.search-suggestion {
    height: 2rem;
    padding: 1.4rem 2rem;

    display: flex;
    align-items: center;
    transition: all 0.1s ease;
}

.search-suggestion:hover {
    background-color: var(--color-primary);
    color: white;
}

</style>

<script defer>

import Navbar from '@/components/Navbar/Main.vue'

import { GetAutocompleteQuery } from '@/geocoder'

export default {
    name: 'SearchView',

    components: {
        Navbar
    },

    data () {
        return {
            search: '',
            error: '',
            query: []
        }
    },

    methods: {
        async searchLocations () {
            if (this.search.length < 3) {
                this.query = []
                return
            }
            GetAutocompleteQuery(this.search, this.formatQuery)
        },

        formatQuery (query) {
            if (query == null) {
                this.query = []
                return
            }
            this.query = query.features
            this.styleBar()
        },

        styleBar () {
            const bar = document.querySelector('.searchbar')
            if (this.query.length > 0) {
                bar.style.borderRadius = '5px 5px 0px 0px'
                bar.style.borderBottom = 'none'
            } else {
                bar.style.borderRadius = '5px'
                bar.style.borderBottom = '1px solid #000'
            }
        },

        focusIn () {
            if (this.query.length > 0) this.styleBar()
            const suggestions = document.querySelector('.search-list')
            suggestions.style.display = 'block'
        },

        focusLost () {
            const bar = document.querySelector('.searchbar')
            bar.style.borderRadius = '5px'
            bar.style.borderBottom = '1px solid #000'

            const suggestions = document.querySelector('.search-list')
            suggestions.style.display = 'none'
        },

        selectionMade (selection) {
            this.search = selection
            this.focusLost()
        }
    }
}
</script>
