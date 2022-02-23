import Axios from "axios";
//export const Api_Url = `http://192.168.88.198:3000/api/v1/`;
export const Api_Url = `https://api.stage.rocafunnels.com/api/v1/`;

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
      console.log("entre")
      try {
        return await Axios.post(`${Api_Url}${resource}`, data, {
          headers: getToken(),
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
  };
};

const getTokenContent = () => {
  let token = JSON.parse(localStorage.getItem("token"));

  return {
    "RF-Token": `${token}`,
    "Content-Type": "application/json",
  };
};
