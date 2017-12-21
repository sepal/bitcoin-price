import 'url-search-params-polyfill';

// @todo: Add polyfill for URL.

/**
 * Returns a map with the settings that come from the current url params.
 * Currently only single value settings are allowed.
 */
export function getAllUrlParams() {
  const url = new URL(window.location);
  let params = new URLSearchParams(url.search);
  let settings = new Map();

  for (const entry of params.entries()) {
    settings.set(entry[0], entry[1]);
  }

  return settings;
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