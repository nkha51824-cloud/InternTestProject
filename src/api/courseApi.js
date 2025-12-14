import axiosClient from "./axiosClient";

export const courseApi = {
  getAll(params) {
    return axiosClient.get("/course", { params });
  },
  getById(id) {
    return axiosClient.get(`/course/${id}`);
  },
  add(data) {
    return axiosClient.post("/course", data);
  },
  update(id, data) {
    return axiosClient.put(`/course/${id}`, data);
  },
  remove(id) {
    return axiosClient.delete(`/course/${id}`);
  },
};
