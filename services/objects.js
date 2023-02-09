import axios from "axios";
import valvelet from "valvelet";

const QPS_LIMIT = process.env.QPS_LIMIT || 5;
const QPS_INTERVAL = process.env.QPS_INTERVAL || 1000;
const LOCATION_HISTORY_API_BASE_URL =
  process.env.LOCATION_HISTORY_API_BASE_URL ||
  "https://api.tomtom.com/locationHistory/1";

const addObject = async ({ apiKey, adminKey, object }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects?key=${apiKey}&adminKey=${adminKey}`;
  const { data } = await axios.post(url, object);
  return data;
};

const editObject = async ({ apiKey, id, object }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects/${id}?key=${apiKey}`;
  const { data } = await axios.put(url, object);
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

const getObjectDetail = valvelet(
  async ({ apiKey, id }) => {
    const url = `${LOCATION_HISTORY_API_BASE_URL}/objects/${id}?key=${apiKey}`;
    const { data } = await axios.get(url);
    return data;
  },
  QPS_LIMIT,
  QPS_INTERVAL
);

const deleteObject = async ({ apiKey, id }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/objects/${id}?key=${apiKey}`;
  const { data } = axios.delete(url);
  return data;
};

export { addObject, editObject, getObjects, getObjectDetail, deleteObject };
