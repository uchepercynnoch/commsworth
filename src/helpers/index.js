import { createBrowserHistory } from "history";

//browser history reference
export const history = createBrowserHistory();

//set environment for request url
export const urlEnvConfig = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      url: "/api/v1"
    };
  }

  return {
    url: "https://frontendassesment20200204015954.azurewebsites.net"
  };
};

//check if object is empty or not
export const isObjEmpty = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};
