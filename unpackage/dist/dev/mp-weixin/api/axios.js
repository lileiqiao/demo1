"use strict";
const common_vendor = require("../common/vendor.js");
const instance = common_vendor.axios.create({
  baseURL: "http://192.168.8.106:8888/",
  timeout: 6e4
});
function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params
    }).then((response) => {
      resolve(response.data);
    }).catch((err) => {
      reject(err);
    });
  });
}
exports.get = get;
