import axios from "axios";

const endpoint = "https://tools.wmflabs.org/monumental-glam/";

export async function getUserInfo() {
  const params = {
    action: "query",
    meta: "globaluserinfo",
    use_auth: "true"
  };

  return axios.get(endpoint, {
    params
  });
}
