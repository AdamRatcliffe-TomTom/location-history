var e=require("axios"),t=require("axios-rate-limit");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=/*#__PURE__*/r(e),i=process.env.QPS_LIMIT||5,n=process.env.QPS_INTERVAL||1e3,a=/*#__PURE__*/r(t).default(o.default.create(),{maxRequests:i,perMilliseconds:n}),s=process.env.LOCATION_HISTORY_API_BASE_URL||"https://api.tomtom.com/locationHistory/1",c=function(e){var t=e.apiKey,r=e.id;try{return Promise.resolve(a.get(s+"/objects/"+r+"?key="+t)).then(function(e){return e.data})}catch(e){return Promise.reject(e)}},u=process.env.LOCATION_HISTORY_API_BASE_URL||"https://api.tomtom.com/locationHistory/1";exports.addObject=function(e){var t=e.apiKey,r=e.adminKey,o=e.object;try{return Promise.resolve(a.post(s+"/objects?key="+t+"&adminKey="+r,o)).then(function(e){return e.data})}catch(e){return Promise.reject(e)}},exports.clearPositionHistory=function(e){var t=e.apiKey,r=e.adminKey;try{var o=a.delete(u+"/history/position?key="+t+"&adminKey="+r);return Promise.resolve(o.data)}catch(e){return Promise.reject(e)}},exports.deleteObject=function(e){var t=e.apiKey,r=e.id;try{var o=a.delete(s+"/objects/"+r+"?key="+t);return Promise.resolve(o.data)}catch(e){return Promise.reject(e)}},exports.editObject=function(e){var t=e.apiKey,r=e.adminKey,o=e.id,i=e.object;try{return Promise.resolve(a.put(s+"/objects/"+o+"?key="+t+"&adminKey="+r,i)).then(function(e){return e.data})}catch(e){return Promise.reject(e)}},exports.getObjectDetail=c,exports.getObjects=function(e){var t=e.apiKey;try{return Promise.resolve(axios.get(s+"/objects?key="+t)).then(function(e){var r=e.data.objects.map(function(e){return c({apiKey:t,id:e.id})});return Promise.resolve(Promise.all(r))})}catch(e){return Promise.reject(e)}},exports.lastPosition=function(e){var t=e.apiKey,r=e.objectId;try{return Promise.resolve(a.get(u+"/history/position/"+r+"?key="+t)).then(function(e){return e.data})}catch(e){return Promise.reject(e)}},exports.positionHistory=function(e){var t=e.apiKey,r=e.adminKey,o=e.objectId,i=e.from,n=e.to,s=e.maxResults,c=e.pageNumber;try{var y=u+"/history/positions/"+o+"?key="+t+"&adminKey="+r+"&from="+i;n&&(y+="&to="+n),s&&(y+="&maxResults="+s),c&&(y+="&pageNumber="+c);var m=a.get(y);return Promise.resolve(m.data)}catch(e){return Promise.reject(e)}},exports.sendPosition=function(e){var t=e.apiKey,r=e.longitude,o=e.latitude,i=e.altitude;try{var n=u+"/history/positions?key="+t,s=[r,o].concat(Boolean(i)?[i]:[]);return Promise.resolve(a.post(n,{type:"Feature",geometry:{type:"Point",coordinates:s}})).then(function(e){return e.data})}catch(e){return Promise.reject(e)}};
//# sourceMappingURL=index.js.map
