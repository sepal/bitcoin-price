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
      // Return a map with the coins symbol as key and the important data as
      // an object value.
      let coins = {};
      data.forEach((coin) => {
        coins[coin.symbol] = {
          name: coin['name'],
          symbol: coin['symbol'],
          price: {
            eur: coin['price_eur'],
            usd: coin['price_usd']
          },
          query_param: `${coin['symbol'].toLowerCase()}_amount`,
        };
      });
      return coins;
    });
}