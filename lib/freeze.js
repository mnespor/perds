"use strict";

const Immutable = require("immutable");

const isPerdKey = Symbol("isPerdKey"); // TODO: Might make this a "backing type" or something so that we can tell arrays, pojos, and sets apart
const backingStoreKey = "backingStoreKey";

// TODO this is just the base case; need to go recursive
function freezePojo(obj) {
  const backingStore = Immutable.Map(obj);
  const handler = {
    get: (_, prop) => {
      if (prop === isPerdKey) {
        return true;
      }

      // TODO: For debugging. Remove this
      if (prop === backingStoreKey) {
        return backingStore;
      }

      return backingStore.get(prop);
    }
  };

  return new Proxy(Object.freeze(obj), handler);
}

// TODO
function freezeArray(array) {
  Object.freeze(array);
}

function freezeOther(obj) {
  for (key of Object.keys(obj)) {
    freeze(obj);
  }

  Object.freeze(obj);
}

/**
 * Deeply freeze `obj`. If `obj` is a plain old JavaScript object or a native array,
 * give it an Immutable.js backing store.
 */
function freeze(obj) {
  if (typeof obj === "undefined" || null) {
    return obj;
  }

  // Don't try to proxy something that's already proxied
  if (obj[isPerdKey]) {
    return obj;
  }

  // TODO: Actually check for type here
  return freezePojo(obj);
}

module.exports = freeze;
