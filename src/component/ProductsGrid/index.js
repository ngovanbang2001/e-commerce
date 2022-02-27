import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import storeApi from "../../api/storeApi";
import ProductItem from "../ProductItem/index";
import Loader from "./../Loader/index.js";
function ProductsGrid() {
  const [products, setProduct] = useState([]);
  const [preload, setPreLoad] = useState(false);
  const { catalog } = useParams();
  useEffect(() => {
    setPreLoad(true);
    const getProduct = async () => {
      let response = null;
      try {
        const params = {};
        response = await storeApi.getProducts(catalog, { params });
        setProduct(response);
        setPreLoad(false);
      } catch {
        console.log("error");
      }
    };
    getProduct();
  }, [catalog]);

  return (
    <div className="grid grid-cols-5 gap-4 max-w-[1200px] mx-auto my-8">
      {preload && <Loader />}
      <div className="col-span-1"></div>
      <div className="col-span-4 grid grid-cols-4 gap-4">
        {products.map((product, i) => (
          <ProductItem key={i} product={product} />
        ))}
      </div>
    </div>
  );
}
export default ProductsGrid;
