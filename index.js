// Recursively strip out fields in objects and subobjects
function stripFields(schema, obj) {
  var newObj = {};

  var schemaType = schema.constructor.name;
  var objType = obj.constructor.name;

  // If types match and this property is not an Object, return the value
  if (schemaType !== "Object") {
    if(schemaType === objType) {
      return obj;
    } else {
      return null;
    }
  }

  var keys = Object.keys(schema);
  keys.forEach(function(key) {
    if(key in obj) {
      // Get instance names for properties
      var schemaConstructor = schema[key].constructor.name;
      var objConstructor = obj[key].constructor.name;
 
      // Only copy fields with matching types.
      if (schemaConstructor === objConstructor) {
        // Handle cases with subObjects
        if (objConstructor === "Object") {
          var res = stripFields(schema[key], obj[key]);
          if (res !== null) {
            newObj[key] = res;
          }
        } else {
          //  Just copy in non-Object properties (String, Boolean, etc.)
          newObj[key] = obj[key];
        }
      }
    }
    if (newObj === {}) {
      return null;
    }
  });
  return newObj;
}

module.exports = stripFields;

