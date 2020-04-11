const axios = require('axios');

const searchHostname = 'https://kgsearch.googleapis.com/v1/entities:search?query=SEARCH&key=AIzaSyCZ1atNm5A1DKxNzJNHS0ek91mISVhCJzA&limit=1&indent=True&languages=pt  '
const weatherHostname = 'https://api.hgbrasil.com/weather?woeid=455827'
const lolMasteryHostname = 'https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/SUMMONERID?api_key=RGAPI-33acc577-41ff-4564-9779-aabc955d086b'
const lolMasteryPointsHostname = 'https://br1.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/SUMMONERID?api_key=RGAPI-33acc577-41ff-4564-9779-aabc955d086b'
const lolSummonerData = 'https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/SUMMONERNAME?api_key=RGAPI-33acc577-41ff-4564-9779-aabc955d086b'
const lolChampionsData = 'http://ddragon.leagueoflegends.com/cdn/10.7.1/data/en_US/champion.json'
const lolQueuesData = 'https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/SUMMONERID?api_key=RGAPI-33acc577-41ff-4564-9779-aabc955d086b'

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
        },

        getLolMastery: async function getLolMastery(summonerName){
            const summonerID = await getSummonerId(summonerName)

            return axios.get(lolMasteryHostname.replace('SUMMONERID', summonerID))
            .then(async function(response){
                const masteryBody = response.data
                return `Champion 1 -> ${await getChampionName(masteryBody[0].championId)}
                        Mastery points-> ${masteryBody[0].championPoints}
                        
                        Champion 2 -> ${await getChampionName(masteryBody[1].championId)}
                        Mastery points-> ${masteryBody[1].championPoints}
                        
                        Champion 3 -> ${await getChampionName(masteryBody[2].championId)}
                        Mastery points-> ${masteryBody[2].championPoints}
                        
                        Total mastery points -> ${await getMasteryPoints(summonerID)}`
            })
            .catch(err => 'Não encontrado :(')
        },

        getLolQueues: async function getLolQueues(summonerName){
            const summonerID = await getSummonerId(summonerName)
            return axios.get(lolQueuesData.replace('SUMMONERID', summonerID))
            .then(async function(response){
                const queuesBody = response.data
                let queuesResponse = ''
                for(let i = 0; i < response.data.length; i++){
                    queuesResponse += `Queue -> ${queuesBody[i].queueType.includes('FLEX') ? 'Flex' : 'Solo/Duo'}
                                      Tier -> ${queuesBody[i].tier + ' ' +queuesBody[i].rank}
                                      W ${queuesBody[i].wins}/L ${queuesBody[i].losses} (${Math.round(queuesBody[i].wins / (queuesBody[i].wins + queuesBody[i].losses) * 100)}%)
                                      League Points -> ${queuesBody[i].leaguePoints}
                                      \n`
                }
                return queuesResponse
            })
            .catch(err => 'Não encontrado :(')
        }
    }
}

async function getChampionName(championId){
    const championList = await axios.get(lolChampionsData)
                        .then(function(response) {
                            return response.data.data
                        })
                        .catch(err => 'Não encontrado :(')

    for (let i in championList) {
        if (championList[i].key == championId){
            return championList[i].name;
        }
    }
}

async function getSummonerId(summonerName){
    return await axios.get(lolSummonerData.replace('SUMMONERNAME', summonerName))
    .then(function(response){
        const summonerDataBody = response.data
        return summonerDataBody.id
    })
    .catch(err => 'Não encontrado :(')
}

async function getMasteryPoints(summonerId) {
    return await axios.get(lolMasteryPointsHostname.replace('SUMMONERID', summonerId))
    .then(function(response){
        return response.data
    })
    .catch(err => 'Não encontrado :(')
}