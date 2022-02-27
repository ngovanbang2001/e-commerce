import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "./../../features/cartSlice";
function ProductItem(props) {
  const { product } = props;
  const dispatch = useDispatch();
  return (
    <Link
      to={`/products/${product.category}/${product.id}`}
      className="bg-[#ededeb] p-4 "
    >
      <div
        className="mt-320:h-[200px] mt-1280:h-[200px] bg-contain bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
      <div>
        <h1 className="font-bold h-12 text-clip overflow-hidden">
          {product.title}
        </h1>
        <div className="flex justify-between">
          <div className="text-[#3498db]">{product.price} $</div>
          <div onClick={() => dispatch(addProduct(product))}>
            <svg
              className="h-5 w-5 text-[#3498db]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ProductItem;
