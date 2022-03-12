import ProductsGrid from "../../component/ProductsGrid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import storeApi from "../../api/storeApi";
function Catelog({ match }) {
  const [cates, setCate] = useState([]);
  const { catalog } = useParams();
  console.log(catalog);
  useEffect(() => {
    const getCategory = async () => {
      let response = null;
      try {
        const params = {};
        response = await storeApi.getCategory({ params });
        setCate(response);
      } catch {
        console.log("error");
      }
    };
    getCategory();
  }, [catalog]);
  console.log(match);
  return (
    <div>
      <ProductsGrid category={cates} />
    </div>
  );
}
export default Catelog;
