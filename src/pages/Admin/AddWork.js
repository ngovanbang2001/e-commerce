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
        <h1 className="header-admin">Th??m s???n ph???m</h1>
        <hr />
        <label>
          <b>T??n s???n ph???m</b>
        </label>
        <input
          type="text"
          placeholder="Nh???p t??n s???n ph???m "
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <label>
          <b>Gi??</b>
        </label>
        <input
          type="text"
          placeholder="Nh???p Gi?? "
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
          placeholder="Nh???p Size"
          name="size"
          onChange={(e) => {
            setSize(e.target.value);
          }}
          value={size}
        />
        <label>
          <b>M?? t???</b>
        </label>
        <input
          type="text"
          placeholder="Nh???p M?? t???"
          name="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <label>
          <b>Ch???n danh m???c</b>
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
          <b>Link ???nh</b>
        </label>
        <input
          type="text"
          placeholder="Nh???p Link ???nh"
          name="thumbnailUrl"
          onChange={(e) => {
            setThumbnailUrl(e.target.value);
          }}
          value={thumbnailUrl}
        />
        <div className="clearfix flex">
          <button className="signupbtn" onClick={() => handleAdd()}>
            Th??m
          </button>
          <button
            className="rounded-lg bg-yellow-500 text-white px-12 py-0 my-[8px] mx-3"
            onClick={() => handleEdit()}
          >
            S???a
          </button>
          <button className="rounded-lg bg-green-500 text-white px-2 py-0 my-[8px] mx-3">
            L??m m???i
          </button>
        </div>
      </div>
    </form>
  );
}
export default AddWork;
