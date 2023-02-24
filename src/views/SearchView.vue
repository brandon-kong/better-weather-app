<template>
    <div>
        <Navbar />
        <div class="">
            <form class="searchbar-container">
                <input class="searchbar autocomplete geoapify-autocomplete-input" type="text" placeholder="Search Locations"
                v-model="search" @input="searchLocations"
                @focus="focusIn"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp"
                @keydown.enter="onEnter"
                name="search"
                autocomplete="off"
                />
            </form>
            <div v-show="isOpen" class="search-container">
                <ul class="search-list">
                    <li v-for="(result, i) in query" :key="i"
                        :class="{ 'is-active': i === arrowIndex }"
                        class="search-suggestion"
                        @click="setResult(result)"
                        @mouseover="setArrowIndex(i)"
                        >
                        {{ result.properties.formatted }}
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
    opacity: 0.6;
    transition: all 0.3s ease;
}

.searchbar:focus {
        outline: none;
        opacity: 1;

        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
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

.is-active {
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
            query: [],
            isOpen: false,
            arrowIndex: 0,
            resultObj: {}
        }
    },

    methods: {
        async searchLocations () {
            if (this.search.length < 3) {
                this.query = []
                this.styleBar()
                return
            }
            this.resultObj = {}
            GetAutocompleteQuery(this.search, this.formatQuery)
        },

        formatQuery (query) {
            if (query == null) {
                this.query = []
                this.isOpen = false
                return
            }
            this.query = query.features
            this.isOpen = true
            this.styleBar()
        },

        styleBar () {
            const bar = document.querySelector('.searchbar')
            if (this.isOpen) {
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

        setResult (result) {
            this.search = result.properties.formatted
            this.resultObj = result
            this.isOpen = false
            this.focusLost()

            this.forceSearchResult()
        },

        onArrowDown () {
            if (this.arrowIndex === this.query.length - 1) {
                this.arrowIndex = 0
            } else {
                this.arrowIndex++
            }
        },

        onArrowUp () {
            if (this.arrowIndex === 0) {
                this.arrowIndex = this.query.length - 1
            } else {
                this.arrowIndex--
            }
        },

        onEnter () {
            this.setResult(this.query[this.arrowIndex])
        },

        setArrowIndex (i) {
            this.arrowIndex = i
        },

        forceSearch () {
            this.$router.push({ name: 'results', params: { search: this.search } })
        },

        forceSearchResult () {
            if (this.resultObj.properties == null) {
                this.forceSearch()
            } else {
                console.log('hi')
                // the result object is not null, so redirect to actual weather page
                this.$router.push({ name: 'home', params: { lat: this.resultObj.geometry.coordinates[1], lon: this.resultObj.geometry.coordinates[0] } })
            }
        }
    }
}
</script>
