import axios from 'axios'

const apiKey = 'GBDQESSQSEFC9JNRKB5Q8RXB8'

export const GetWeatherQuery = ({ lat, lon, name }, cb) => {
    let encoded = ''
    if (lat !== undefined && lon !== undefined) {
        encoded = lat + ',' + lon + '?unitGroup=us&key=' + apiKey + '&contentType=json'
    } else {
        encoded = encodeURIComponent(name) + '?unitGroup=us&key=' + apiKey + '&contentType=json'
    }
    axios({
        method: 'get',
        url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + encoded,
        headers: { }
    })
        .then(response => {
            cb(null, { data: response.data })
        })
        .catch(error => {
            cb(null, { error: error })
        })
}
