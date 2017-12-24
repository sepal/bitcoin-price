import 'url-search-params-polyfill';

// @todo: Add polyfill for URL.

function getUrlParams() {
  const url = new URL(window.location);
  return new URLSearchParams(url.search);
}

/**
 * Returns a map with the settings that come from the current url params.
 * Currently only single value settings are allowed.
 */
export function getAllUrlParams() {
  let params = getUrlParams();
  let settings = new Map();

  for (const entry of params.entries()) {
    settings.set(entry[0], entry[1]);
  }

  return settings;
}

export function getCoinParams() {
  let params = getUrlParams();
  let coins = new Map();

  for (const entry of params.entries()) {
    if (entry[0].match(/.*_amount/gi)) {
      coins.set(entry[0], entry[1]);
    }
  }

  return coins;
}

export function getParam(key) {
  let params = getUrlParams();
  return params.get(key);
}

/**
 * Sets a new key with a value into the current url parameters.
 */
export function setUrlParam(key, value) {
  const url = new URL(window.location);
  let params = new URLSearchParams(url.search);
  params.append(key, value);
  window.history.replaceState('', '', `?${params.toString()}`);
}