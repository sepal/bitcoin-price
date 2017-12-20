import 'url-search-params-polyfill';

// @todo: Add polyfill for URL.

/**
 * Returns an iterator with the key, value pairs of the current url parameters.
 */
export function getAllUrlParams() {
  const url = new URL(window.location);
  let params = new URLSearchParams(url.search);

  return params.entries();
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