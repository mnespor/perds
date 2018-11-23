"use strict";

const Immutable = require("immutable");

const backingStoreKey = require("./backing-store-key");
const proxied = require("./proxied");

function isPojo(obj) {
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  return Object.getPrototypeOf(obj) === Object.prototype;
}

function mapValues(obj, transform) {
  const next = {};

  for (const key of Object.keys(obj)) {
    if (key !== "__proto__") {
      next[key] = transform(obj[key]);
    }
  }

  return next;
}

/**
 * Deeply frozen copy of `obj`. If `obj` is a plain old JavaScript object or a native array,
 * give it an Immutable.js backing store.
 */
function frozen(obj) {
  if (typeof obj === "undefined" || obj === null) {
    return obj;
  }

  // Don't try to proxy something that's already proxied
  if (obj[backingStoreKey]) {
    return obj;
  }

  if (typeof obj === "string") {
    return Object.freeze(obj);
  }

  if (Array.isArray(obj)) {
    const frozenChildren = obj.map(child => frozen(child));
    const backingStore = Immutable.List(frozenChildren);
    return proxied([...obj], backingStore);
  }

  if (isPojo(obj)) {
    const frozenChildren = mapValues(obj, frozen);
    const backingStore = Immutable.Map(frozenChildren);
    return proxied({ ...obj }, backingStore);
  }

  return Object.freeze(mapValues(obj, frozen));
}

module.exports = frozen;
