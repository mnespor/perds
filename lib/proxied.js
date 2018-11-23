"use strict";

const backingStoreKey = require("./backing-store-key");

module.exports = (obj, backingStore) => {
  const handler = {
    defineProperty: () => {
      throw new Error("Tried to define a property on a frozen object");
    },

    deleteProperty: () => {
      throw new Error("Tried to delete a property of a frozen object");
    },

    get: (_, prop) => {
      if (prop === backingStoreKey) {
        return backingStore;
      }

      return backingStore.get(prop);
    },

    has: (_, prop) => {
      return backingStore.has(prop);
    },

    isExtensible: () => false,

    ownKeys: () => {
      return Array.from(backingStore.key());
    },

    set: () => {
      throw new Error("Tried to set a property of a frozen object");
    }
  };

  return new Proxy(obj, handler);
};
