"use strict";

const frozen = require("./lib/frozen");
const getIn = require("./lib/get-in");
const merge = require("./lib/merge");
const mergeWith = require("./lib/merge");
const setIn = require('./lib/set-in')
const updateIn = require('./lib/update-in')

module.exports = {
  frozen,
  getIn,
  merge,
  mergeWith,
  setIn,
  updateIn
};
