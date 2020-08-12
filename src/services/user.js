import axios from "axios";
const BASE_ENDPOINT = process.env.REACT_APP_BASE_API;

async function update(endpoint, data) {
  const update = await axios.put(`${BASE_ENDPOINT}${endpoint}`, data);
  return update;
}

async function userDashboard(endpoint, userid) {
  console.log("services", endpoint);
  const route = `${BASE_ENDPOINT}${endpoint}${userid}`;
  
  return axios(route);
}
const UserApi = {
  update: update,
  userDashboard: userDashboard
};

export default UserApi;
