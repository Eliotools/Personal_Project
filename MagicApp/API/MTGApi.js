export function getCardsFromApiWithSearchedText (dict, page) {
    var url = 'https://api.magicthegathering.io/v1/cards?&contains=imageUrl&page=' + page
    for (const [key, value] of Object.entries(dict)) {
            url = url + '&' + key + '=' + value
        }
    console.log(url)
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getCardUuidFromApi(id) {
    var url = 'https://api.magicthegathering.io/v1/cards?&id=' + id
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getSets() {
    var url = 'https://api.magicthegathering.io/v1/sets'
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getTypes() {
    var url = 'https://api.magicthegathering.io/v1/types'
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}