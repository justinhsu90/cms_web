import axios from "axios";
import qs from "qs";
import C from "js-cookie";
import Vue from "vue";

let ip = [
    "60.251.57.136",
    "60.251.57.137",
    "60.251.57.138",
    "60.251.57.139",
    "60.251.57.140",
    "60.251.57.141"
    // ,
    // "60.251.57.229",
    // "60.251.57.230",
    // "60.251.57.231",
    // "60.251.57.232",
    // "60.251.57.233",
    // "60.251.57.234"
];

// let port = ["8000", "8010", "8020", "8030"];
let port = ["8443"];

axios.defaults.timeout = 180000;
axios.interceptors.request.use(request => {
    if (request.isFormData) {
        return request;
    }
    if (!request.data.hasOwnProperty("token") &&
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
    let random1 = Math.floor(Math.random() * 6);
    let random2 = Math.floor(Math.random() * 4);

    // axios的配置
    axios.defaults.baseURL = `https://${ip[random1]}:${
    port[random2]
  }/data-server/`;

    // axios.defaults.baseURL = "https://127.0.0.1:8443/data-server/";
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