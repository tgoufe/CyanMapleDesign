/**
 * Created by chenqifeng on 2016/8/26.
 */

export let sessionStorage = window.sessionStorage && window.sessionStorage.setItem && typeof window.sessionStorage.setItem === 'function';

export let localStorage = window.localStorage && window.localStorage.setItem && typeof window.localStorage.setItem === 'function';

export let replaceState = typeof history.replaceState === 'function';

export let pushState = typeof history.pushState === 'function';