"use strict";
const api_axios = require("./axios.js");
const getTypeOne = () => api_axios.get("/home");
const lbt = () => api_axios.get("/");
exports.getTypeOne = getTypeOne;
exports.lbt = lbt;
