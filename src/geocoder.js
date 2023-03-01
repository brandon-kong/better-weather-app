import axios from 'axios'

const apiKey = '0ca5fe98d6d244c3a5f5d753d0d5f5eb'

export const GetAutocompleteQuery = (text, cb) => {
    if (text === '') {
        cb()
    }
    const config = {
        method: 'get',
        url: 'https://api.geoapify.com/v1/geocode/autocomplete?text=' + text + '&apiKey=' + apiKey,
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

export const GetLocationFromCoords = ({ lat, lon }, cb) => {
    const config = {
        method: 'get',
        url: 'https://api.geoapify.com/v1/geocode/reverse?lat=' + lat + '&lon=' + lon + '&apiKey=' + apiKey,
        headers: { }
    }
    return axios(config)
}

export const DeserializeName = (name, cb) => {
    const sliced = name.split(',')
    return { lat: sliced[0], lon: sliced[1] }
}

export const SerializeName = ({ lat, lon }) => {
    const stringLat = lat.toString()
    const stringLon = lon.toString()

    const b = stringLat.replaceAll('.', '|')
    const c = stringLon.replaceAll('.', '|')

    return b + ',' + c
}

export default GetAutocompleteQuery
