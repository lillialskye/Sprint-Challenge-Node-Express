const fetch = require('node-fetch');
const config = require('../config.js');

const KEY_GMAPS_PLACES = config.gmaps.apiKeys;
console.log(config.gmaps.apiKeys);
const URI_TEXT_SEARCH = 'https://api.coindesk.com/v1/bpi/historical/close.json?query=';
const URI_PRICE_DETAILS = 'https://www.coindesk.com/apa/maps/api/price/details/json??start=<VALUE>&end=<VALUE>';

function getIds(query) {
  console.log(query);
  return new Promise((resolve, reject) => {
    const searchUrl = URI_TEXT_SEARCH + query + '&key=AIzaSyBWLPbqSyVHo_V0XyHhrXVYLBsW5BhKuPw ';
    console.log(searchUrl)
    fetch(searchUrl)
      .then(places => places.json())
      .then(places => places.results.map(place => place.place_id))
      .then(ids => {
        resolve(ids);
      })
      .catch(err => {
        reject(err);
      });
  });
}
        
function getDetails(ids) {
  return new Promise((resolve, reject) => {
    const details = ids.map(id => {
      const detailsUrl = URI_PRICE_DETAILS + id + '&key=&key=AIzaSyBWLPbqSyVHo_V0XyHhrXVYLBsW5BhKuPw' + KEY_GMAPS_PLACES;
      return fetch(detailsUrl)
        .then(detailed => detailed.json())
        .then(detailed => detailed.result);
    });

    Promise.all(details)
      .then(details => {
        resolve(details);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  getIds,
  getDetails
}

>