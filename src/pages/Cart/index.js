import CartItem from "./../../component/CartItem/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cart } from "./../../features/cartSlice.js";

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const carts = useSelector(cart);

  useEffect(() => {
    setTotalPrice(
      carts.reduce((total, cart) => {
        return (
          total.toFixed(2) + Number(cart.product.price) * Number(cart.quantity)
        );
      }, 0)
    );
  }, [carts]);

  return (
    <div className="max-w-[1200px] m-auto">
      <h1 className="text-2xl font-bold text-center my-8">GIỎ HÀNG</h1>
      {carts.length ? (
        <div className="">
          <div className="w-full grid grid-cols-5 gap-4 font-bold text-xl my-4">
            <div className="col-span-2">Sản phẩm</div>
            <div>Đơn giá</div>
            <div>Số lượng</div>
            <div></div>
          </div>
          {carts.map((item, i) => (
            <CartItem item={item} key={i} />
          ))}

          <div className="flex justify-end text-xl font-bold">
            Tổng tiền :{totalPrice} $
          </div>
        </div>
      ) : (
        <div>
          <h1 className=" text-center my-4">Giỏ hàng trống</h1>
        </div>
      )}

      <div className="flex justify-end">
        <Link className=" py-2 px-4 bg-[#676767] text-white m-1" to="/">
          TIẾP TỤC MUA HÀNG
        </Link>
        <button className=" py-2 px-4 bg-black text-white m-1">
          THỰC HIỆN THANH TOÁN
        </button>
      </div>
    </div>
  );
}
export default Cart;
