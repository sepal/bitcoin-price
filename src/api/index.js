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
      // an object value + additional fields we'll need.
      let coins = {};
      data.forEach((coin) => {
        coins[coin.symbol] = {
          name: coin['name'],
          symbol: coin['symbol'],
          price: {
            eur: parseFloat(coin['price_eur']),
            usd: parseFloat(coin['price_usd'])
          },
          queryParam: `${coin['symbol'].toLowerCase()}_amount`,
          amount: 0,
          value: 0,
        };
      });
      return coins;
    });
}