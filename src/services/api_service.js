import Axios from "axios";
//export const ApiUrl = `http://192.168.88.198:3000/api/v1/`;
//servidor Produccion
export const ApiUrl = `https://api.stage.rocafunnels.com/api/v1/`

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
      const data = error.response;
      return data;
  }
};

export const postForgotPassword = async (contact, resource) => {

  try {
    const result = await Axios(`${ApiUrl}${resource}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: contact,
    });

    const data = result.data;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const ApiRegister = async (obj) => {
  let url = `${ApiUrl}user`;

  try {
    const result = await Axios.post(url, {
      "Usr_Email": obj.Usr_Email,
      "Usr_Name": obj.Usr_Name,
      "Usr_Lastname": obj.Usr_Lastname,
      "Usr_Password": obj.Usr_Password,
    });
    const data = result.data;
 
    return data
    
  } catch (error) {
    if (error.response.status === 400) {
      const data = error.response;
      return data;
    }
  }
};

export const getContactExcel = async (f) => {
  let direccion = `${ApiUrl}user/contact/excel?f=${f}`;
  try {
    const response = await Axios({
      url: direccion,
      method: "get",
      responseType: "blob",
      headers: getToken(),
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
    });
    const a = document.createElement("a");
    const href = URL.createObjectURL(blob);
    a.href = href;
    a.Download = `${Date.now().toString()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(href);

    return true;
  } catch (error) {
    return false;
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
        console.log(error.response);
        return 401;
      }
    case "post":
      try {
        return await Axios.post(`${ApiUrl}${resource}`, data, {
          headers: getTokenContent(),
        });
      } catch (error) {
        console.log(error.response);
        const data = error.response;
      return data;
      }
    case "put":
      try {
        return await Axios.put(`${ApiUrl}${resource}`, data, {
          headers: getTokenContent(),
        });
      } catch (error) {
        
        return 401;
      }
    case "delete":
      try {
        return await Axios.delete(`${ApiUrl}${resource}`, {
          headers: getToken(),
        });
      } catch (error) {
        
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

