import axiosClient from "./axiosClient";

const category = {
  nike: "nike",
  adidas: "adidas",
  jordan: "jordan",
  yezzy: "yezzy",
};
const storeApi = {
  getProducts: (id, params) => {
    const url = `/categories/${id}/products`;
    return axiosClient.get(url, params);
  },
  getAllProducts: (params) => {
    const url = "/products";
    return axiosClient.get(url, params);
  },
  getDetailProduct: (id, params) => {
    const url = `/products/${id}`;
    return axiosClient.get(url, params);
  },
  getCategory: (params) => {
    const url = "/categories";
    return axiosClient.get(url, params);
  },
  addProduct: (product) => {
    const url = "/products";
    return axiosClient.post(url, product);
  },
  deleteProduct: (id) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  editProduct: (id, newProduct) => {
    const url = `/products/${id}`;
    return axiosClient.put(url, newProduct);
  },
};
export default storeApi;
