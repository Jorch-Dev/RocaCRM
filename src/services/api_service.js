import Axios from "axios";
//export const Api_Url = `http://192.168.88.198:3000/api/v1/`;
export const Api_Url = `https://api.stage.rocafunnels.com/api/v1/`;

export const postForgotPassword = async (contact, resource) => {

  try {
    const result = await Axios(`${Api_Url}${resource}`, {
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
  let url = `${Api_Url}user`;

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
  let direccion = `${Api_Url}user/contact/excel?f=${f}`;
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
        return await Axios.get(`${Api_Url}${resource}`, {
          headers: getToken(),
        });
      } catch (error) {
        const data = error.response;
        return data;
      }
    case "post":
      try {
        return await Axios.post(`${Api_Url}${resource}`, data, {
          headers: getTokenContent(),
        });
      } catch (error) {
        
        const data = error.response;
      return data;
      }
    case "put":
      try {
        return await Axios.put(`${Api_Url}${resource}`, data, {
          headers: getTokenContent(),
        });
      } catch (error) {
        
        return 401;
      }
    case "delete":
      try {
        return await Axios.delete(`${Api_Url}${resource}`, {
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

