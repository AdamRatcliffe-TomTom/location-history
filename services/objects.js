import http from "../http";

const LOCATION_HISTORY_API_BASE_URL =
  process.env.LOCATION_HISTORY_API_BASE_URL ||
  "https://api.tomtom.com/locationHistory/1";

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
  const { data } = await http.get(url);
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
