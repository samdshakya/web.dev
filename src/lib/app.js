/**
 * @fileoverview Site entrypoint. This runs only in supported browsers and is
 * dynamically inserted by "bootstrap.js" if the user's browser is supported.
 *
 * This is web.dev's core JS bundle; it includes unistore, routing, Service
 * Worker initialization, component loading for routes, et al.
 */

import {checkUserPreferredLanguage} from './actions';
import {store} from './store';
import {localStorage} from './utils/storage';
import removeServiceWorkers from './utils/sw-remove';

// Read preferred language from the url, a cookie or browser settings.
checkUserPreferredLanguage();

// Configures global page state (loading, signed in).
function onGlobalStateChanged({isSignedIn}) {
  document.body.classList.toggle('lh-signedin', isSignedIn);

  const main = document.querySelector('main');

  // Cache whether the user was signed in, to help prevent FOUC in future and
  // for Analytics, as this can be read synchronosly and Firebase's auth takes
  // ~ms to arrive.
  localStorage['webdev_isSignedIn'] = isSignedIn ? 'probably' : '';
}
store.subscribe(onGlobalStateChanged);
onGlobalStateChanged(store.getState());

removeServiceWorkers();
