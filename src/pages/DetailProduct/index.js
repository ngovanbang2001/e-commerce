import { useEffect, useState } from "react";
import storeApi from "../../api/storeApi";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { useParams, Link, useHistory } from "react-router-dom";
import Loader from "./../../component/Loader/index.js";
import ProductItem from "../../component/ProductItem";
import { useAuth } from "./../../context/AuthProvider";

import { addProduct } from "./../../features/cartSlice";
import "./index.css";

function DetailProduct() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(1);
  const { history } = useHistory();
  const { currentUser } = useAuth();
  const { category, id } = useParams();
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [preload, setPreLoad] = useState(false);
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    infinite: true,
    pauseOnHover: false,
    swipeToSlide: true,
  };
  const settings1 = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    infinite: true,
    pauseOnHover: false,
    swipeToSlide: true,
  };
  const getDetailProduct = async () => {
    setPreLoad(true);
    let response = null;
    try {
      const params = {};
      response = await storeApi.getDetailProduct(id, { params });
      setProduct(response);
      setPreLoad(false);
    } catch {
      console.log("error");
    }
  };
  const getRelatedProduct = async () => {
    let response = null;
    try {
      const params = {};
      response = await storeApi.getProducts(category, {
        params,
      });
      setRelatedProduct(response);
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getDetailProduct();
    getRelatedProduct();
  }, [id]);
  const check = () => {
    if (!currentUser) {
      alert("Bạn phải đăng nhập");
      history.push("/login");
      return false;
    }

    return true;
  };
  const addToCart = async () => {
    try {
      if (check()) {
        await dispatch(addProduct({ product, quantity: value }));
      }
      toast.success("Thêm hàng Thành Công !");
    } catch (e) {
      toast.error(e.error);
    }
  };
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-5 gap-4  my-12">
        {preload && <Loader />}
        <div className="col-span-2  ">
          <div className="bg-[#ededeb] py-4 px-8">
            <div
              className="bg-contain bg-center bg-no-repeat relative h-[330px]  "
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
          </div>
          <div className="relative mt-2">
            {" "}
            <Slider {...settings}>
              <div className=" ">
                <div
                  className="bg-contain bg-center bg-no-repeat relative h-[100px] bg-[#ededeb] mx-2 py-2 "
                  style={{ backgroundImage: `url(${product.image})` }}
                />
              </div>
              <div className="">
                <div
                  className="bg-contain bg-center bg-no-repeat relative h-[100px] bg-[#ededeb] mx-2 py-2"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
              </div>
              <div className="">
                <div
                  className="bg-contain bg-center bg-no-repeat relative h-[100px] bg-[#ededeb] mx-2 py-2"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
              </div>
              <div className="">
                <div
                  className="bg-contain bg-center bg-no-repeat relative h-[100px] bg-[#ededeb] mx-2 py-2"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
              </div>
            </Slider>
          </div>
        </div>
        <div className="col-span-3 mx-8 mt-4">
          <h1 className="font-bold text-3xl my-8 text-[#2d2518]">
            {product.title}
          </h1>
          <div className="font-bold text-xl my-2">${product.price} </div>
          <div>
            <div>{product.description}</div>
          </div>
          <div className="text-lg font-bold">Số lượng :</div>
          <div className="flex my-2">
            <button
              className="border-[1px] mx-[1px] border-[#707070] py-1 px-3 font-bold "
              onClick={() => setValue(value - 1)}
            >
              -
            </button>
            <div className="border-[1px] py-1 px-4 border-[#707070]">
              {value}
            </div>
            <button
              className="border-[1px] mx-[1px] border-[#707070] py-1 px-3 font-bold "
              onClick={() => setValue(value + 1)}
            >
              +
            </button>
          </div>
          <div className="flex">
            <label
              htmlFor="box-cart"
              onClick={() => addToCart()}
              className=" px-4 py-2 bg-[#3498db] text-white"
            >
              Thêm vào giỏ
            </label>

            <Link
              to="/cart"
              onClick={() => dispatch(addProduct(product, value))}
              className="ml-2 px-4 py-2 bg-black text-white"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>

      <div className="section mb-8 ">
        <div className="flex justify-center mb-8">
          <h2 className="text-4xl font-semibold   text-black p-2">
            Similar Product
          </h2>
        </div>

        <Slider {...settings1}>
          {relatedProduct.map((product, i) => (
            <ProductItem key={i} product={product} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default DetailProduct;
