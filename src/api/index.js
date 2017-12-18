import 'whatwg-fetch';

const API_URL = 'https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=15';

export function fetchCoinPrice() {
  return fetch(API_URL)
    .then(function(response) {
      return response.json()
    }).then(function (data) {
      return data.map((coin) => {
        return {
          name: coin['name'],
          symbol: coin['symbol'],
          price_eur: coin['price_eur'],
          price_usd: coin['price_usd'],
          query_param: `${coin['symbol'].toLowerCase()}_amount`,
        }
      });
    });
}