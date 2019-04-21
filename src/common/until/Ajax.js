import axios from "axios";
import qs from "qs";
import C from "js-cookie";
import Vue from "vue";
//axios的配置
axios.defaults.baseURL = "http://60.251.57.138:8000/data-server/";
// axios.defaults.baseURL = "http://127.0.0.1:8080/data-server/";
// axios.defaults.baseURL = "http://192.168.2.140:8000/data-server/";
axios.defaults.timeout = 20000;
axios.interceptors.request.use(request => {
  if (request.isFormData) {
    return request;
  }
  if (!request.data.hasOwnProperty("token") && C.get("token")) {
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
  }
);

function Ajax(config = {}) {
  if (_.isEmpty(config)) {
    Promise.reject("請輸入ajax配置");
  }
  let promise = new Promise(response => {
    axios(config)
      .then(res => {
        response(res);
      })
      .catch(() => {
        axios.defaults.baseURL = "http://60.251.57.138:8000/data-server/";
        // axios.defaults.baseURL = 'http://localhost:8080/data-server/';

        axios(config)
          .then(res => {
            axios.defaults.baseURL = "http://60.251.57.138:8000/data-server/";
            // axios.defaults.baseURL = 'http://localhost:8080/data-server/';

            response(res);
          })
          .catch(() => {
            axios.defaults.baseURL = "http://60.251.57.138:8000/data-server/";
            // axios.defaults.baseURL = 'http://localhost:8080/data-server/';

            Promise.reject("服務器錯誤");
          });
      });
  });
  return promise;
}

export default Ajax;
