import axiosClient from "./axiosClient";
export const category = {
  electronics: "electronics",
  jewelery: "jewelery",
  menClothing: "men's clothing",
  womenClothing: "women's clothing",
};
const storeApi = {
  getProducts: (category, params) => {
    const url = `products/category/${category}`;
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
    const url = "/products/categories";
    return axiosClient.get(url, params);
  },
};
export default storeApi;
