import axios from 'axios'

const apiKey = 'GBDQESSQSEFC9JNRKB5Q8RXB8'

export const GetWeatherQuery = ({ lat, lon }, cb) => {
    const encoded = lat + ',' + lon + '?unitGroup=us&key=' + apiKey + '&contentType=json'
    axios({
        method: 'get',
        url: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + encoded,
        headers: { }
    })
        .then(response => {
            cb(response.data)
        })
        .catch(error => {
            console.log(error)
        })
}
