const axios = require('axios');

const searchHostname = 'https://kgsearch.googleapis.com/v1/entities:search?query=SEARCH&key=AIzaSyCZ1atNm5A1DKxNzJNHS0ek91mISVhCJzA&limit=1&indent=True&languages=pt  '
const weatherHostname = 'https://api.hgbrasil.com/weather?woeid=455827'

module.exports = function() {
    return {
        getSearch: function getSearch(search){
            return axios.get(searchHostname.replace('SEARCH', search.replace(/ /g, '+')))
            .then(function (response){
                const searchBody = response.data
                if (searchBody.itemListElement[0].result.description != undefined && searchBody.itemListElement[0].result.image.contentUrl != undefined){
                    return {
                        body : searchBody.itemListElement[0].result.detailedDescription.articleBody,
                        link: searchBody.itemListElement[0].result.detailedDescription.url,
                        image: searchBody.itemListElement[0].result.image.contentUrl
                    }
                } else if (searchBody.itemListElement[0].result.detailedDescription.url) {
                    return {
                        body : searchBody.itemListElement[0].result.detailedDescription.articleBody,
                        link: searchBody.itemListElement[0].result.detailedDescription.url
                    }
                }

            })
            .catch(err => 'Não encontrado :(')
        },

        getWeather: function getWeather(){
            return axios.get(weatherHostname)
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
    }
}