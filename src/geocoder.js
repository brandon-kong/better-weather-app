import axios from 'axios'
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete'

export const GetAutocompleteQuery = (text, cb) => {
    if (text === '') {
        cb()
    }
    const config = {
        method: 'get',
        url: 'https://api.geoapify.com/v1/geocode/autocomplete?text=' + text + '&apiKey=0ca5fe98d6d244c3a5f5d753d0d5f5eb',
        headers: { }
    }
    axios(config)
        .then(response => {
            cb(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}

export const apiKey = '0ca5fe98d6d244c3a5f5d753d0d5f5eb'

const autocompleteInput = new GeocoderAutocomplete(
    document.getElementById('app'),
    apiKey,
    { /* Geocoder options */ })

autocompleteInput.on('select', (location) => {
// check selected location here
})

autocompleteInput.on('suggestions', (suggestions) => {
// process suggestions here
    console.log(suggestions)
})

export default GetAutocompleteQuery
