import "./index.css";
import storeApi from "../../api/storeApi";
import { useEffect, useState } from "react";

function AddWork(props) {
  const [cates, setCate] = useState([]);
  const [oldId, setOldId] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [size, setSize] = useState();
  const [description, setDescription] = useState();
  const [categoryId, setCategoryId] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState();

  const editProduct = async (data) => {
    console.log(data);
    try {
      await storeApi.editProduct(oldId, { ...data });
    } catch {
      console.log("error");
    }
  };
  const addProduct = async (data) => {
    try {
      await storeApi.addProduct({ id: createId(), ...data });
    } catch {
      console.log("error");
    }
  };
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
    const { product } = props;
    if (product) {
      setOldId(product.id);
      setTitle(product.title);
      setPrice(product.price);
      setSize(product.size);
      setDescription(product.description);
      setCategoryId(product.categoryId);
      setThumbnailUrl(product.thumbnailUrl);
    }
  }, []);
  const createId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  const handleAdd = () => {
    // addProduct(data);

    const newProduct = {
      title: title,
      price: price,
      size: size,
      description: description,
      categoryId: categoryId,
      thumbnailUrl: thumbnailUrl,
    };
    addProduct(newProduct);
  };

  const handleEdit = () => {
    const newProduct = {
      id: oldId,
      title: title,
      price: price,
      size: size,
      description: description,
      categoryId: categoryId,
      thumbnailUrl: thumbnailUrl,
    };
    editProduct(newProduct);
  };
  return (
    <form>
      <div className="container">
        <h1 className="header-admin">Thêm sản phẩm</h1>
        <hr />
        <label>
          <b>Tên sản phẩm</b>
        </label>
        <input
          type="text"
          placeholder="Nhập tên sản phẩm "
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label>
          <b>Giá</b>
        </label>
        <input
          type="text"
          placeholder="Nhập Giá "
          name="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
        />
        <label>
          <b>Size</b>
        </label>
        <input
          type="text"
          placeholder="Nhập Size"
          name="size"
          onChange={(e) => {
            setSize(e.target.value);
          }}
          value={size}
        />
        <label>
          <b>Mô tả</b>
        </label>
        <input
          type="text"
          placeholder="Nhập Mô tả"
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <label>
          <b>Chọn danh mục</b>
        </label>
        <select
          className=" ml-8 inline-block "
          name="categoryId"
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
          value={categoryId}
        >
          <option value>Select...</option>
          {cates.map((cate, i) => (
            <option key={i} value={cate.id}>
              {cate.name}
            </option>
          ))}
        </select>
        <hr />
        <label>
          <b>Link ảnh</b>
        </label>
        <input
          type="text"
          placeholder="Nhập Link ảnh"
          name="thumbnailUrl"
          onChange={(e) => {
            setThumbnailUrl(e.target.value);
          }}
          value={thumbnailUrl}
        />
        <div className="clearfix flex">
          <button className="signupbtn" onClick={() => handleAdd()}>
            Thêm
          </button>
          <button
            className="rounded-lg bg-yellow-500 text-white px-12 py-0 my-[8px] mx-3"
            onClick={() => handleEdit()}
          >
            Sửa
          </button>
          <button className="rounded-lg bg-green-500 text-white px-2 py-0 my-[8px] mx-3">
            Làm mới
          </button>
        </div>
      </div>
    </form>
  );
}
export default AddWork;
