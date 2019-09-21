import axios from "axios";
import jsonpAdapter from "axios-jsonp";
import { getEntities } from "wikidata-sdk";

const endpoint = "https://www.wikidata.org/w/api.php";

export function fullSearch(query = "", lang = "") {
  const params = {
    action: "query",
    format: "json",
    list: "search",
    indexpageids: 1,
    utf8: 1,
    srsearch: query,
    srnamespace: "0",
    srlimit: "50",
    srinfo: "totalhits|suggestion|rewrittenquery",
    srprop: "titlesnippet|extensiondata",
    srinterwiki: 1,
    srenablerewrites: 1,
    uselang: lang
  };
  return axios.get(endpoint, {
    params,
    adapter: jsonpAdapter,
    callbackParamName: "c"
  });
}

export function fetchEntities(ids = []) {
  const requestsNumber = Math.ceil(ids.length / 50);

  const urls = new Array(requestsNumber).fill().map((value, index) => {
    const startIndex = index * 30;
    const list = ids.slice(startIndex, startIndex + 49);
    return getEntities({ ids: list, props: ["claims", "labels"] });
  });

  return Promise.all(urls.map(url => axios.get(url))).then(responses => {
    const data = responses.map(response => response.data.entities);
    return { data: { entities: Object.assign({}, ...data) } };
  });
}
