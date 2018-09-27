"use strict";

const Immutable = require("immutable");

const backingStoreKey = Symbol("backingStoreKey");

function isPojo(obj) {
  if (obj === null || typeof obj !== "object") {
    return false;
  }

  return Object.getPrototypeOf(obj) === Object.prototype;
}

function set(obj, key, value) {
  const backingStore = obj[backingStoreKey];
  if (backingStore) {
    const next = backingStore.set(key, value);
    const handler = {
      get: (_, prop) => {
        if (prop === backingStoreKey) {
          return next;
        }

        return next.get(prop);
      }
    };

    return new Proxy(obj, handler);
  }

  return Object.assign({}, obj, { key: value });
}

function frozenPojo(obj) {
  const copy = Object.assign({}, obj);
  const backingStore = Immutable.Map(obj);
  const handler = {
    get: (_, prop) => {
      if (prop === backingStoreKey) {
        return backingStore;
      }

      return backingStore.get(prop);
    },

    has: (_, prop) => {
      return backingStore.has(prop);
    },

    ownKeys: () => {
      return backingStore.keys();
    }
  };

  return new Proxy(Object.freeze(copy), handler);
}

// TODO
function frozenArray(array) {
  return Object.freeze(Object.assign([], array));
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

  if (Array.isArray(obj)) {
    return frozenArray(obj);
  }

  if (isPojo(obj)) {
    return frozenPojo(obj);
  }

  const clone = {};

  for (const key of Object.keys(obj)) {
    if (key !== "__proto__") {
      clone[key] = frozen(obj[key]);
    }
  }

  return Object.freeze(clone);
}

module.exports = frozen;
