"use strict";

const jsc = require("jsverify");
const test = require("tape");

const frozen = require("./frozen");

test("retrieval works normally", t => {
  const cats = { fred: { name: "Fred" }, george: { name: "George" } };
  const frozenCats = frozen(cats);
  t.ok(frozenCats.fred);
  t.ok(frozenCats.george);
  t.ok(frozenCats.fred.name);
  t.end();
});
