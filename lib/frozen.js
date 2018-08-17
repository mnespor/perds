"use strict";

const Immutable = require("immutable");

const backingStoreKey = Symbol("backingStoreKey");

function set(obj, key, value) {
    const backingStore = obj[backingStoreKey]
    if (backingStore) {
        const next = backingStore.set(key, value)
        const handler = {
            get: (_, prop) => {
                if (prop === backingStoreKey) {
                    return next
                }

                return next.get(prop)
            }
        };

        return new Proxy(obj, handler)
    }

    return Object.assign({}, obj, { key: value })
}

function frozenPojo(obj) {
    const copy = Object.assign({}, obj)
  const backingStore = Immutable.Map(obj);
  const handler = {
    get: (_, prop) => {
      if (prop === isPerdKey) {
        return true;
      }

      if (prop === backingStoreKey) {
        return backingStore;
      }

      return backingStore.get(prop);
    },

      has: (_, prop) => {
          return backingStore.has(prop)
      },

      ownKeys: () => {
          return backingStore.
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
  if (typeof obj === "undefined" || null) {
    return obj;
  }

    for (key of Object.keys(obj)) {
        if (key !== '__proto__') {
            obj[key] = frozen(obj)
        }
    }

  // Don't try to proxy something that's already proxied
  if (obj[backingStoreKey]) {
    return obj;
  }

    if (Array.isArray(obj)) {
        return frozenArray(obj)
    }

    if (isPojo(obj)) {
        return frozenPojo(obj);
    }

    return Object.freeze(Object.assign({}, obj))
}

module.exports = frozen;
