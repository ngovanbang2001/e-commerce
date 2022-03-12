import { useEffect, useState } from "react";
import storeApi from "../../api/storeApi";
function TaskList(props) {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      try {
        const params = {};
        response = await storeApi.getAllProducts({ params });
        setProduct(response);
      } catch {
        console.log("error");
      }
    };
    getList();
  }, []);
  const handleDelete = async (id) => {
    try {
      await storeApi.deleteProduct(id);
    } catch {
      console.log("error");
    }
  };
  const handleEdit = (product) => {
    props.onEdit(product);
  };
  return (
    <table className="w-full max-w-full border  border-[#ddd] text-black text-center">
      <thead>
        <tr>
          <th className="text-center">STT</th>
          <th className="text-center">Tên sản phẩm</th>
          <th className="text-center">Giá</th>
          <th className="text-center">Size</th>
          <th className="text-center">Mô tả</th>
          <th className="text-center">Danh mục </th>
          <th className="text-center">Link ảnh</th>
          <th className="text-center">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr className="border">
            <td className="flex-wrap">{product.id}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.size}</td>
            <td>{product.description}</td>
            <td>{product.categoryId}</td>
            <td>{product.thumbnailUrl}</td>
            <td className="">
              <button
                className="px-3 py-2 rounded-lg text-white bg-yellow-500 my-1"
                onClick={() => handleEdit(product)}
              >
                Sửa
              </button>
              <button
                className="px-3 py-2 rounded-lg text-white bg-red-500 my-1"
                onClick={() => handleDelete(product.id)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default TaskList;
