import { urlEnvConfig, isObjEmpty } from "../helpers";
import jwt from "jsonwebtoken";
const { url } = urlEnvConfig();

const saveToken = token => localStorage.setItem("user", JSON.stringify(token));

const getToken = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const isLoggedIn = () => {
  let token = getToken();
  let decode = jwt.decode(token);
  let date = new Date().getTime();
  let time = (date / 1000).toFixed(0);
  let timeToInt = parseInt(time);
  return token !== null && decode.exp > timeToInt;
};

const loginService = credentials => {
  const { email, password } = credentials;
  const query = JSON.stringify({
    query: `mutation {
      loginUser(user:{email:"${email}",password:"${password}"}){message accessToken}
    }`
  });

  return fetch(`${url}/graphql`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: query
  })
    .then(res => res.json())
    .then(handleLoginResponse);
};

const createProjectService = data => {
  const {
    title,
    budget,
    startDate,
    endDate,
    contractorName,
    contractorAddress
  } = data;

  let startDateToLocale = new Date(startDate).toLocaleDateString();
  let endDateToLocale = new Date(endDate).toLocaleDateString();
  let budgetToFloat = parseFloat(budget);
  const query = JSON.stringify({
    query: `
    mutation{
      createProject(project:{title:"${title}",budget:${budgetToFloat},startDate:"${startDateToLocale}",endDate:"${endDateToLocale}",contractorName:"${contractorName}",contractorAddress:"${contractorAddress}"}){message status}
    }
    `
  });
  return fetch(`${url}/graphql`, {
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    method: "POST",
    body: query
  })
    .then(res => res.json())
    .then(handleOtherResponse);
};

const loadProjectService = () => {
  const query = JSON.stringify({
    query: `
    query{
      loadProject{
        id
        title
        budget
        contractorName
        contractorAddress
        startDate
        endDate
      }
    }
    `
  });
  return fetch(`${url}/graphql`, {
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    method: "POST",
    body: query
  })
    .then(res => res.json())
    .then(handleOtherResponse);
};

const loadLocationsService = () => {
  const query = JSON.stringify({
    query: `
    query{
      loadLocations{
        latitude
        location
        longitude
      }
    }
    `
  });
  return fetch(`${url}/graphql`, {
    headers: { "Content-Type": "application/json", Authorization: getToken() },
    method: "POST",
    body: query
  })
    .then(res => res.json())
    .then(handleOtherResponse);
};

const logout = () => {
  localStorage.clear();
};

const handleLoginResponse = result => {
  const { data } = result;
  const { loginUser } = data;
  if (loginUser.message === "Login Succesful") {
    return { message: loginUser.message, token: loginUser.accessToken };
  } else return Promise.reject(loginUser.message);
};

const handleOtherResponse = result => {
  const { data } = result;
  if (!isObjEmpty(data)) {
    return data;
  } else return Promise.reject(data);
};

export {
  loginService,
  getToken,
  isLoggedIn,
  saveToken,
  logout,
  loadProjectService,
  loadLocationsService,
  createProjectService
};
