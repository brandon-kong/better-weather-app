<template>
    <div>
        <Navbar />
        <div class="searchbar-container">
            <input class="searchbar autocomplete geoapify-autocomplete-input" type="text" placeholder="Search Locations" v-model="search" @change="searchLocations"/>
        </div>
        <div v-if="query.length > 0" class="search-container">
            <ul>
                <li v-for="location in query" :key="location.id">
                    {{ location.properties.address_line1 }}, {{ location.properties.state_code }} {{ location.properties.postal_code }} {{ location.properties.country }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.searchbar-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
}

.geoapify-autocomplete-input {

}

</style>

<script defer>

import Navbar from '@/components/Navbar/Main.vue'

import { GetAutocompleteQuery, apiKey } from '@/geocoder'
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete'

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

    mounted () {
        console.log('hi')
        const autocompleteInput = new GeocoderAutocomplete(
            document.getElementById('searchbar-container'),
            apiKey,
            { /* Geocoder options */ })

        autocompleteInput.on('select', (location) => {
        // check selected location here
        })

        autocompleteInput.on('suggestions', (suggestions) => {
        // process suggestions here
            console.log(suggestions)
        })
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
            console.log(query)
        }
    }
}
</script>
