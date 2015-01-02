var stripFields = require("../stripfields");
var _ = require("lodash"); // for _.isEqual() deep compare
var expect = require("expect.js");

var schema = {
  a: 1, 
  b: 1,
  c:{ 
      foo:"bar",
      obj:{nestedField:1}
  },
  d:[1]
};


describe("stripfields test suite", function() {
  it("Test 1", function() {
    var testObj = {
      a: 7,
      b: 8,
      c:{
          foo:"bar"
      },
      d:[4,5]
    };

    var expectedRes = { a: 7, b: 8, c: { foo: 'bar' }, d: [ 4, 5 ] };
    var res = stripFields(schema, testObj);
    expect(_.isEqual(res, expectedRes)).to.be.ok();
  });

  it("Test 2", function() {
    var testObj = {
      a: 1,
      b: 2,
      c:{
          foo:"bar",
          obj:{nestedField:213}
      },
      d:[1,3,4],
      e:"someOtherField"
    };

    var expectedRes = { a: 1, b: 2, c: { foo: 'bar', obj: { nestedField: 213 } }, d: [ 1, 3, 4 ] };
    var res = stripFields(schema, testObj);
    expect(_.isEqual(res, expectedRes)).to.be.ok();
  });

  it("Test 3", function() {
    var testObj = {
      a: 1,
      c:{
          foo:"some string",
          bar:1
      },
      d:"string instead of array"
    };

    var expectedRes = { a: 1, c: { foo: 'some string' } };
    var res = stripFields(schema, testObj);
    expect(_.isEqual(res, expectedRes)).to.be.ok();
  });

  it("Test 4", function() {
    var res = stripFields([1,2,3], ['a']);
    expect(_.isEqual(res, ['a'])).to.be.ok();
  });

});




