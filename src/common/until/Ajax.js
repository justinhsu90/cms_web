import axios from "axios";
import qs from "qs";
import C from "js-cookie";
import Vue from "vue";

axios.defaults.timeout = 180000;
axios.interceptors.request.use(request => {
  if (request.isFormData) {
    return request;
  }
  if (request.method == "get") {
    return request;
  }
  if (
    !request.data.hasOwnProperty("token") &&
    C.get("token") &&
    !request.noToken
  ) {
    request.data.token = C.get("token");
  }
  request.data = qs.stringify(request.data);
  return request;
});
axios.interceptors.response.use(
  response => {
    if (response.data.message == "Token is expired") {
      C.remove("name");
      C.remove("userName");
      C.remove("privilege");
      C.remove("token");
      location.href = "/";
    }
    return response.data;
  },
  error => {
    if (error.message.search("timeout") != -1) {
      Vue.prototype.$message.error("請求連線超時,請重新進行操作");
    }
    throw new Error();
  }
);

function Ajax(config = {}) {
  if (_.isEmpty(config)) {
    Promise.reject("請輸入ajax配置");
  }
  // axios的配置
  axios.defaults.baseURL = "https://api.myfbmanage.com:8443/data-server/";

  let promise = new Promise((response, reject) => {
    axios(config)
      .then(res => {
        response(res);
      })
      .catch(() => {
        reject("服務器錯誤");
      });
  });
  return promise;
}

export default Ajax;
