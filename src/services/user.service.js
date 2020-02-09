import { urlEnvConfig, isObjEmpty } from "../helpers";
import jwt from "jsonwebtoken";
const { url } = urlEnvConfig();

//SAVE TOKEN TO LOCAL STORAGE
const saveToken = token => localStorage.setItem("user", JSON.stringify(token));

//GET TOKEN FROM BROWSER LOCAL STORAGE
const getToken = () => {
  return JSON.parse(localStorage.getItem("user"));
};

/**THIS FUNCTION CHECKS IF TOKEN EXISTS IN THE BROWSER LOCAL STORAGE
 * AND RETURNS TRUE IF TOKEN IS NULL AND EXPIRED  OR FALSE IF OTHERWISE*/
const isLoggedIn = () => {
  let token = getToken();
  let decode = jwt.decode(token);
  let date = new Date().getTime();
  let time = (date / 1000).toFixed(0);
  let timeToInt = parseInt(time);
  return token !== null && decode.exp > timeToInt;
};

//REQUEST SERVICES FOR USER LOGIN,CREATE PROJECT,LOAD PROJECT,AND LOAD LOCATION STARTS HERE
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

//REQUEST SERVICES FOR USER LOGIN,CREATE PROJECT,LOAD PROJECT,AND LOAD LOCATION ENDS HERE

//FUNCTION THAT LOGS USER OUT BY CLEARING BROWSER LOCAL STORAGE
const logout = () => {
  localStorage.clear();
};

//FUNCTION THAT HANDLES RESPONSE FROM LOGIN REQUEST AND RETURNS AN OBJECT
const handleLoginResponse = result => {
  const { data } = result;
  const { loginUser } = data;
  if (loginUser.message === "Login Succesful") {
    return { message: loginUser.message, token: loginUser.accessToken };
  } else return Promise.reject(loginUser.message);
};

//FUNCTION THAT HANDLES OTHER REQUESTS AND RETURNS A DATA OBJECT
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
