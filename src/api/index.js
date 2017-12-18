import 'whatwg-fetch';

const API_URL = 'https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=15';

/**
 * Fetches the crypto currencies from coinmarketcap.com and returns the most
 * important data as an array in an promise.
 */
export function fetchCurrencies() {
  // Fetch the data.
  return fetch(API_URL)
    .then(function(response) {
      // Get the response as json.
      return response.json()
    }).then(function (data) {
      // return only the data we really need.
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