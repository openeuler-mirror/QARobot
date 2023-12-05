import axios from "axios";
import { ElMessage } from "element-plus";

export const server = axios.create({
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

server.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      ElMessage.error("数据异常");
    }
  },
  (error) => {
    ElMessage.error("请求失败");
  }
);
