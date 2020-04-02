const axios = require('axios');

const hostname = 'https://api.hgbrasil.com/weather?woeid=455827'

// module.exports = fetch(hostame, (err, res, body) => {
//   const weatherBody = JSON.parse(body)
//   console.log(`máxima de ${weatherBody.results.forecast[0].max} º graus | minima de ${weatherBody.results.forecast[0].min} º graus`)
//   return `máxima de ${weatherBody.results.forecast[0].max} º graus | minima de ${weatherBody.results.forecast[0].min} º graus`
// })

module.exports = function getWeather(){
    return axios.get(hostname)
    .then(function (response) {
        const weatherBody = response.data
        let emoji = '';
        if (weatherBody.results.forecast[0].description.toUpperCase().includes('CHUVA')) {
            emoji = ':cloud_rain:';
        } else if (weatherBody.results.forecast[0].description.toUpperCase().includes('NUBLADO')) {
            emoji = ':cloud:'
        } else if (weatherBody.results.forecast[0].description.toUpperCase().includes('SOL')) {
            emoji = ':sunny:'
        } else {
            emoji = ':thermometer:'
        }
        return `:arrow_up: Máxima de ${weatherBody.results.forecast[0].max} º graus
                
                :arrow_down: Mínima de ${weatherBody.results.forecast[0].min} º graus

                ${emoji} ${weatherBody.results.forecast[0].description} ${emoji}`
    })
}