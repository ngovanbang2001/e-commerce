import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteProduct, changeQuantity } from "./../../features/cartSlice";
import { toast } from "react-toastify";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(item.product);
  const [quantity, setQuantity] = useState(item.quantity);
  useEffect(() => {
    setQuantity(item.quantity);
    setProduct(item.product);
  }, [item]);
  const updateQuantity = async (opt) => {
    if (opt === "+") {
      await dispatch(changeQuantity({ product, quantity: quantity + 1 }));
    }
    if (opt === "-") {
      dispatch(
        changeQuantity({
          product,
          quantity: quantity - 1 === 0 ? 1 : quantity - 1,
        })
      );
    }
  };
  const removeProduct = () => {
    try {
      dispatch(deleteProduct(product));
      toast.success("Xóa khỏi giỏ hàng thành công !");
    } catch (e) {
      toast.error(e.error);
    }
  };

  return (
    <div className="w-full grid grid-cols-5 gap-4 ">
      <div className="col-span-2">
        <div className="flex items-center  text-left">
          <img className="w-[50px] h-[50px] m-2" src={product.image} />
          {product.title}
        </div>
      </div>
      <div className="my-auto ">{product.price} $</div>
      <div className="my-auto">
        <button
          className="px-2 border-[1px] border-[#e8e8e8] text-[#58717b]"
          onClick={() => updateQuantity("-")}
        >
          -
        </button>
        <input
          className="px-2 border-[1px] border-[#e8e8e8] text-[#58717b] w-[40px]"
          value={item.quantity}
          disabled
        />
        <button
          className="px-2 border-[1px] border-[#e8e8e8] text-[#58717b]"
          onClick={() => updateQuantity("+")}
        >
          +
        </button>
      </div>
      <div className="m-auto">
        <button
          onClick={() => removeProduct()}
          className="bg-red-500 text-white px-2 rounded-sm py-1"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;
