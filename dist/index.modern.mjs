import t from"axios";import e from"axios-rate-limit";const a=process.env.QPS_LIMIT||5,o=process.env.QPS_INTERVAL||1e3,i=e(t.create(),{maxRequests:a,perMilliseconds:o}),s=process.env.LOCATION_HISTORY_API_BASE_URL||"https://api.tomtom.com/locationHistory/1",n=async({apiKey:t,adminKey:e,object:a})=>{const o=`${s}/objects?key=${t}&adminKey=${e}`,{data:n}=await i.post(o,a);return n},r=async({apiKey:t,adminKey:e,id:a,object:o})=>{const n=`${s}/objects/${a}?key=${t}&adminKey=${e}`,{data:r}=await i.put(n,o);return r},c=async({apiKey:t})=>{const e=`${s}/objects?key=${t}`,{data:a}=await i.get(e),o=a.objects.map(({id:e})=>y({apiKey:t,id:e}));return await Promise.all(o)},y=async({apiKey:t,id:e})=>{const a=`${s}/objects/${e}?key=${t}`,{data:o}=await i.get(a);return o},p=async({apiKey:t,id:e})=>{const a=`${s}/objects/${e}?key=${t}`,{data:o}=await i.delete(a);return o};function d(){return d=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var o in a)Object.prototype.hasOwnProperty.call(a,o)&&(t[o]=a[o])}return t},d.apply(this,arguments)}const m=process.env.LOCATION_HISTORY_API_BASE_URL||"https://api.tomtom.com/locationHistory/1",$=async({apiKey:t,adminKey:e,objectId:a,longitude:o,latitude:s,altitude:n,timestamp:r})=>{const c=`${m}/history/positions?key=${t}&adminKey=${e}`,y=d({type:"Feature",geometry:{type:"Point",coordinates:[o,s,...Boolean(n)?[n]:[]]},object:a},r&&{timestamp:r}),{data:p}=await i.post(c,y);return p},u=async({apiKey:t,objectId:e})=>{const a=`${m}/history/position/${e}?key=${t}`,{data:o}=await i.get(a);return o},l=async({apiKey:t,objectId:e,from:a,to:o,maxResults:s,pageNumber:n})=>{let r=`${m}/history/positions/${e}?key=${t}&from=${a}`;o&&(r+=`&to=${o}`),s&&(r+=`&maxResults=${s}`),n&&(r+=`&pageNumber=${n}`);const{data:c}=await i.get(r);return c},b=async({apiKey:t,adminKey:e})=>{const a=`${m}/history/position?key=${t}&adminKey=${e}`,{data:o}=await i.delete(a);return o};export{n as addObject,b as clearPositionHistory,p as deleteObject,r as editObject,y as getObjectDetail,c as getObjects,u as lastPosition,l as positionHistory,$ as sendPosition};
//# sourceMappingURL=index.modern.mjs.map
