import {
	get,
	post
} from "./axios.js";
// export const getData = (params) => get("后端接口名",params);
// export const getData1 = (data) => post("后端接口名",data);
// //此处如果有参数传入给后端就需要写上参数 params/data 否则可以为空
<<<<<<< HEAD
export const getTypeOne = () => get("/home"); //index top 导航栏
export const lbt = () => get("/"); //轮播图
export const indexshangpinlist = (params) => get("/floorList", params); //idnex 商品  触底加载 
export const xiangqing = (params) => get("/products", params); //详情
export const getlist = (params) => get('/classify/getCategoryProductList?sortType=0&sortValue=0&pageSize=20', params)
=======
export const getTypeOne = () => get("/home");  //index top 导航栏
export const lbt = () => get("/");    //轮播图
export const indexshangpinlist = (params) => get("/floorList",params);   //idnex 商品  触底加载 
export const xiangqing = (params) => get("/products",params);  //详情
export const pinlun = (params) => get("/getCommentList",params);   //评论
>>>>>>> f7cc2cf4b103c91b5d01cdb602df9c16b27d8a20
