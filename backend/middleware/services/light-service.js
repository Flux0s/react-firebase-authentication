let lightModel = require("./models/light-model");
// let lightTemplate = require("./models/light-model").template;
const socketEmitter = require("../socket.io").socketEmitter;

//
// TODO: Extract manipulation of buisness objects to buisness logic layer
//

// TODO: Add filtering parameter
let getLights = () =>
  lightModel.find({}, { __v: false }, (err, lights) => {
    if (err) {
      // console.log(err);
      return Promise.reject(err);
    } else {
      // console.log(JSON.stringify(lights));
      Promise.resolve(JSON.stringify(lights));
    }
  });

let getLightById = (id) => {
  return lightModel.findOne({ _id: id }, (err, light) =>
    err ? Promise.reject(err) : Promise.resolve(light)
  );
};

let getLightByName = (name) => {
  return lightModel.findOne({ Name: name }, (err, light) =>
    err ? Promise.reject(err) : Promise.resolve(light)
  );
};

// NOTE: This method is depreciated. This was moved into the buisness logic of the front end light service.
// let getEmptyLightObject = () => {
//   return Promise.resolve(lightTemplate);
// };

let getLightSchema = () => {
  let lightSchema = {};
  for (var path in lightModel.schema.paths)
    if (path.indexOf("_") == -1)
      lightSchema[path] = {
        // TODO: Add logic for setting type to color if name is color
        type: lightModel.schema.paths[path].instance,
        required: lightModel.schema.paths[path].isRequired
      };
  return Promise.resolve(lightSchema);
};

// Clients should use getEmptyLightObject to get correct parameter format
// Returns: List of lights after adding the new object, or err if failed validation or during save operation
let addNewLightObject = (lightObject) => {
  newLightObject = new lightModel(lightObject);
  console.log(JSON.stringify(lightObject));
  let validationError = newLightObject.validateSync();
  if (validationError) return Promise.reject(validationError);
  else {
    return newLightObject.save((err) => {
      if (err) return Promise.reject(err);
      else return getLights();
    });
  }
};

let updateExistingLight = (id, lightObject) => {
  // socketEmitter.emit("test", "data");
  return lightModel
    .findOne({ _id: id }, (err, light) => {
      return err ? Promise.reject(err) : Promise.resolve(light);
    })
    .then((light) => {
      Object.keys(lightObject)
        .filter((field) => field.indexOf("_") == -1)
        .forEach((field) => {
          light[field] = lightObject[field];
        });
      light.save();
      return Promise.resolve();
    });
};

let deleteLight = (id) => {
  return lightModel.deleteOne({ _id: id }, (err) =>
    err ? Promise.reject(err) : Promise.resolve()
  );
};

module.exports = {
  getLights,
  getLightByName,
  getLightById,
  getLightSchema,
  addNewLightObject,
  updateExistingLight,
  deleteLight
};
