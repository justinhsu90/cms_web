import axios from "axios";
import qs from "qs";
import C from "js-cookie";
//axios的配置
// axios.defaults.baseURL = 'http://118.163.10.109:8000/data-server/';
axios.defaults.baseURL = "http://60.251.57.138:8000/data-server/";
// axios.defaults.baseURL = 'http://127.0.0.1:8080/data-server/';
axios.interceptors.request.use(request => {
  if (request.isFormData) {
    return request;
  }
  request.data = qs.stringify(request.data);
  return request;
});
axios.interceptors.response.use(response => {
  if (response.data.message == "Token is expired") {
    C.remove("name");
    C.remove("userName");
    C.remove("privilege");
    C.remove("token");
    window.location = "/";
  }
  return response.data;
});
function Ajax(config = {}) {
  if (_.isEmpty(config)) {
    Promise.reject("请输入ajax配置");
  }
  let promise = new Promise(response => {
    axios(config)
      .then(res => {
        response(res);
      })
      .catch(() => {
        axios.defaults.baseURL = "http://118.163.10.109:8000/data-server/";
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

            Promise.reject("服务器错误");
          });
      });
  });
  return promise;
}

export default Ajax;
