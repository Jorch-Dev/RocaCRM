import Axios from "axios";
export const ApiUrl = `https://roca-funnels.herokuapp.com/api/v1/`;

export const ApiLogin = async (obj) => {
  let url = `${ApiUrl}user/login`;

  try {
    const result = await Axios.post(url, {
      email: obj.email,
      password: obj.password,
    });
    const data = result.data;

    return data;
  } catch (error) {
    if (error.response.status === 400) {
      const data = error.response;
      return data;
    }
  }
};

export const ApiService = async (method, resource, data) => {
  switch (method) {
    case "get":
      try {
        return await Axios.get(`${ApiUrl}${resource}`, {
          headers: getToken(),
        });
      } catch (error) {
        console.log(error);
        return 401;
      }
    case "post":
      try {
        return await Axios.post(`${ApiUrl}${resource}`, data, {
          headers: getTokenContent(),
        });
      } catch (error) {
        console.log(error);
        return 401;
      }
    case "put":
      try {
        console.log(`${data}`);
        return await Axios.put(`${ApiUrl}${resource}`, data, {
          headers: getTokenContent(),
        });
      } catch (error) {
        console.log(error);
        return 401;
      }
    case "delete":
      try {
        return await Axios.delete(`${ApiUrl}${resource}`, data, {
          headers: {
            headers: getToken(),
          },
        });
      } catch (error) {
        console.log(error);
        return 401;
      }
    default:
      console.log(`algo ha salido mal con el metodo  ${method}.`);
  }
};

const getToken = () => {
  let token = JSON.parse(localStorage.getItem("token"));

  return {
    "RF-Token": `${token}`,
    "Content-Type": "application/json",
  };
};

const getTokenContent = () => {
  let token = JSON.parse(localStorage.getItem("token"));

  return {
    "RF-Token": `${token}`,
    "Content-Type": "application/json",
  };
};
