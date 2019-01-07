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
  const cats = [{ name: "Fred" }, { name: "George" }];
  const frozenCats = frozen(cats);
  t.equal(frozenCats[0].name, "Fred");
  t.equal(frozenCats[1].name, "George");
});

test("retrieval works normally on mixed nested objects and arrays", t => {
  const trucks = [
    {
      model: "f150",
      cargo: [{ type: "cat", name: "fred" }, { type: "cat", name: "george" }]
    },
    {
      model: "silverado",
      cargo: [{ type: "cat", name: "waldo" }]
    }
  ];

  const frozenTrucks = frozen(trucks);
  t.equal(frozenTrucks[0].model, "f150");
  t.equal(frozenTrucks[0].cargo[1].type, "cat");
  t.equal(frozenTrucks[0].cargo[1].name, "george");
  t.equal(frozenTrucks[1].cargo[0].name, "waldo");
});

test("objects can't be modified", t => {
  const cat = frozen({ name: "fred" });
  cat.type = "dog";
  t.notOk(cat.type);
});

test("freezing works on non-collection types", t => {
  const frozenString = frozen("fred");
  t.equal("fred", frozenString);
  const frozenNumber = 4;
  t.equal(4, frozenNumber);
});

test("objects whose direct prototype is not Object are frozen correctly", t => {
  const foo = Object.create({});
  const bar = Object.create(foo);
  t.fail("not implemented");
});
