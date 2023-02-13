import http from "../http";

const LOCATION_HISTORY_API_BASE_URL =
  process.env.LOCATION_HISTORY_API_BASE_URL ||
  "https://api.tomtom.com/locationHistory/1";

const sendPosition = async ({ apiKey, longitude, latitude, altitude }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/history/positions?key=${apiKey}`;
  const coordinates = [
    longitude,
    latitude,
    ...(Boolean(altitude) ? [altitude] : [])
  ];
  const position = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates
    }
  };
  const { data } = await http.post(url, position);
  return data;
};

const lastPosition = async ({ apiKey, objectId }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/history/position/${objectId}?key=${apiKey}`;
  const { data } = await http.get(url);
  return data;
};

const positionHistory = async ({
  apiKey,
  adminKey,
  objectId,
  from,
  to,
  maxResults,
  pageNumber
}) => {
  let url = `${LOCATION_HISTORY_API_BASE_URL}/history/positions/${objectId}?key=${apiKey}&adminKey=${adminKey}&from=${from}`;
  if (to) url += `&to=${to}`;
  if (maxResults) url += `&maxResults=${maxResults}`;
  if (pageNumber) url += `&pageNumber=${pageNumber}`;

  const { data } = http.get(url);
  return data;
};

const clearPositionHistory = async ({ apiKey, adminKey }) => {
  const url = `${LOCATION_HISTORY_API_BASE_URL}/history/position?key=${apiKey}&adminKey=${adminKey}`;
  const { data } = http.delete(url);
  return data;
};

export { sendPosition, lastPosition, positionHistory, clearPositionHistory };
