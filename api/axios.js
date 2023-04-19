import axios from "axios"; // 引用axios
const instance = axios.create({
<<<<<<< HEAD
  baseURL:"http://192.168.8.106:8888/",
  timeout: 60000,
=======
	baseURL: "http://192.168.8.106:8888",
	timeout: 60000,
	// headers: {
	//  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
	//  },
>>>>>>> 27b91af42b0a624945dd302b4a4d1db01ca760e8
});
//get请求
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		instance.get(url, {
				params: params,
			})
			.then((response) => {
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}
//post请求
export function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		instance.post(url, data).then(
			(response) => {
				resolve(response.data);
			},
			(err) => {
				reject(err);
			}
		);
	});
}