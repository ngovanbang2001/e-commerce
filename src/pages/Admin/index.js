import "./index.css";
import storeApi from "../../api/storeApi";
import AddWork from "./AddWork.js";
import TaskList from "./TaskList.js";
import { useEffect, useState } from "react";

function Admin() {
  const [display, setDisplay] = useState(false);
  const [product, setProduct] = useState();
  const onEdit = (product) => {
    setProduct(product);
    setDisplay(true);
  };
  return (
    <div className="container">
      <div className="text-center">
        <h1 className="text-black ">Quản Lý Sản Phẩm</h1>
        <hr />
      </div>
      <div className={display ? "grid grid-cols-3 gap-4" : "grid "}>
        {display ? <AddWork product={product} /> : ""}
        <div className="col-span-2">
          <button
            className="rounded-xl bg-[#4caf50] opacity-90 px-4 py-2 text-white mb-6"
            onClick={() => setDisplay(display ? false : true)}
          >
            Thêm Sản Phẩm
          </button>
          <TaskList onEdit={onEdit} />
        </div>
      </div>
    </div>
  );
}
export default Admin;
