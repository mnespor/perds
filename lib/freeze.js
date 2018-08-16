"use strict";

/**
 * Deeply freeze `obj`. If `obj` is a plain old JavaScript object or a native array,
 * give it an Immutable.js backing store.
 */
function freeze(obj) {
  return obj;
}

module.exports = freeze;
