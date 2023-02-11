import axios from "axios";
import rateLimit from "axios-rate-limit";

const QPS_LIMIT = process.env.QPS_LIMIT || 5;
const QPS_INTERVAL = process.env.QPS_INTERVAL || 1000;
const LOCATION_HISTORY_API_BASE_URL =
  process.env.LOCATION_HISTORY_API_BASE_URL ||
  "https://api.tomtom.com/locationHistory/1";

const http = rateLimit(axios.create(), {
  maxRequests: QPS_LIMIT,
  perMilliseconds: QPS_INTERVAL
});

const addObject = async ({ apiKey, adminKey, object }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects?key=${apiKey}&adminKey=${adminKey}`;
  const { data } = await http.post(url, object);
  return data;
};

const editObject = async ({ apiKey, adminKey, id, object }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects/${id}?key=${apiKey}&adminKey=${adminKey}`;
  const { data } = await http.put(url, object);
  return data;
};

const getObjects = async ({ apiKey }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects?key=${apiKey}`;
  const { data } = await axios.get(url);
  const objectDetailRequests = data.objects.map(({ id }) =>
    getObjectDetail({ apiKey, id })
  );
  const objects = await Promise.all(objectDetailRequests);
  return objects;
};

const getObjectDetail = async ({ apiKey, id }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects/${id}?key=${apiKey}`;
  const { data } = await http.get(url);
  return data;
};

const deleteObject = async ({ apiKey, id }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects/${id}?key=${apiKey}`;
  const { data } = http.delete(url);
  return data;
};

export { addObject, editObject, getObjects, getObjectDetail, deleteObject };
