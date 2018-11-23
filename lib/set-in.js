"use strict";

const backingStoreKey = require("./backing-store-key");
const proxied = require("./proxied");

module.exports = (keyPath, value, obj) => {
  const backingStore = obj[backingStoreKey];
  if (!backingStore) {
    throw new Error("setIn called on unfrozen object");
  }

  return proxied(obj, backingStore.setIn(keyPath, value));
};
