"use strict";

const backingStoreKey = require("./backing-store-key");
const proxied = require("./proxied");

module.exports = (key, value, obj) => {
  const backingStore = obj[backingStoreKey];
  if (!backingStore) {
    throw new Error("set called on unfrozen object");
  }

  const next = backingStore.set(key, value);
  return proxied(obj, next);
};
