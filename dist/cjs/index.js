var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.js
var location_history_exports = {};
__export(location_history_exports, {
  addObject: () => addObject,
  deleteObject: () => deleteObject,
  editObject: () => editObject,
  getObjectDetail: () => getObjectDetail,
  getObjects: () => getObjects
});
module.exports = __toCommonJS(location_history_exports);

// services/objects.js
var import_axios = __toESM(require("axios"));
var import_valvelet = __toESM(require("valvelet"));
var QPS_LIMIT = process.env.QPS_LIMIT || 5;
var QPS_INTERVAL = process.env.QPS_INTERVAL || 1e3;
var LOCATION_HISTORY_API_BASE_URL = process.env.LOCATION_HISTORY_API_BASE_URL || "https://api.tomtom.com/locationHistory/1";
var addObject = async ({ apiKey, adminKey, object }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects?key=${apiKey}&adminKey=${adminKey}`;
  const { data } = await import_axios.default.post(url, object);
  return data;
};
var editObject = async ({ apiKey, adminKey, id, object }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects/${id}?key=${apiKey}&adminKey=${adminKey}`;
  const { data } = await import_axios.default.put(url, object);
  return data;
};
var getObjects = async ({ apiKey }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects?key=${apiKey}`;
  const { data } = await import_axios.default.get(url);
  const objectDetailRequests = data.objects.map(
    ({ id }) => getObjectDetail({ apiKey, id })
  );
  const objects = await Promise.all(objectDetailRequests);
  return objects;
};
var getObjectDetail = (0, import_valvelet.default)(
  async ({ apiKey, id }) => {
    const url = `${LOCATION_HISTORY_API_BASE_URL}/objects/${id}?key=${apiKey}`;
    const { data } = await import_axios.default.get(url);
    return data;
  },
  QPS_LIMIT,
  QPS_INTERVAL
);
var deleteObject = async ({ apiKey, id }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects/${id}?key=${apiKey}`;
  const { data } = import_axios.default.delete(url);
  return data;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addObject,
  deleteObject,
  editObject,
  getObjectDetail,
  getObjects
});
