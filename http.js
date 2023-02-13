import axios from "axios";
import rateLimit from "axios-rate-limit";

const QPS_LIMIT = process.env.QPS_LIMIT || 5;
const QPS_INTERVAL = process.env.QPS_INTERVAL || 1000;

const http = rateLimit(axios.create(), {
  maxRequests: QPS_LIMIT,
  perMilliseconds: QPS_INTERVAL
});

export default http;
