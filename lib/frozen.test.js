"use strict";

const jsc = require("jsverify");
const test = require("tape");

const frozen = require("./frozen");

test("retrieval works normally on frozen objects", t => {
  const cats = { fred: { name: "Fred" }, george: { name: "George" } };
  const frozenCats = frozen(cats);
  t.ok(frozenCats.fred);
  t.ok(frozenCats.george);
  t.ok(frozenCats.fred.name);
  t.end();
});

test("retrieval works normally on frozen arrays", t => {
  t.fail("not implemented");
});

test("retrieval works normally on mixed nested objects and arrays", t => {
  t.fail("not implemented");
});

test("objects can't be modified", t => {
  t.fail("not implemented");
});

test("freezing works on non-collection types", t => {
  t.fail("not implemented");
});

test("objects whose direct prototype is not Object are frozen correctly", t => {
  const foo = Object.create({});
  const bar = Object.create(foo);
  t.fail("not implemented");
});
