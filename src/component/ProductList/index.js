import { useEffect, useState } from "react";
import ProductItem from "../ProductItem/index";
import storeApi from "../../api/storeApi";
import Loader from "./../Loader/index.js";
import "./index.css";
function ProductList() {
  const [products, setProduct] = useState([]);
  const [preload, setPreLoad] = useState(false);
  useEffect(() => {
    const getList = async () => {
      setPreLoad(true);
      let response = null;
      try {
        const params = {};
        response = await storeApi.getAllProducts({ params });
        setProduct(response.slice(0, 12));
        setPreLoad(false);
      } catch {
        console.log("error");
      }
    };
    getList();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-4">
      {preload && <Loader />}
      {products.map((product, i) => (
        <ProductItem key={i} product={product} />
      ))}
    </div>
  );
}
export default ProductList;
