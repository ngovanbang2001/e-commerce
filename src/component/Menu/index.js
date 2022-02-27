import { Link, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./index.css";
import storeApi from "../../api/storeApi";
import { toast } from "react-toastify";
import logo from "../../assets/image/Screenshot 2022-01-20 221944.png";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "./../../context/AuthProvider";
import { cart } from "./../../features/cartSlice";

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  const [cates, setCate] = useState([]);
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
  }, []);
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        return (
          <li
            className={`nav-item group relative p-3 ${match ? "active" : ""}`}
          >
            <Link
              className="nav-link inline-block w-21"
              to={to}
              exact={activeOnlyWhenExact}
            >
              {label}
            </Link>
            {label === "Sản phẩm" && (
              <ul className="absolute top-full left-0 box-shadw z-[90] bg-white  rounded-md nav-effect ">
                {cates.map((cate, i) => (
                  <li
                    key={i}
                    className="text-black py-3 px-10 min-w-[180px] block hover:bg-[#3498db] child-radius font-medium"
                  >
                    <Link
                      to={`/products/category/${cate}`}
                      className="capitalize"
                    >
                      {" "}
                      {cate}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      }}
    />
  );
};

const sites = [
  { label: "Trang chủ", to: "/", exac: true },
  { label: "Sản phẩm", to: "#", exac: false },
  { label: "Liên hệ", to: "/contact", exac: false },
];
function Menu() {
  const { currentUser, signOut } = useAuth();
  const products = useSelector(cart);
  console.log(products);
  const logOut = async () => {
    try {
      await signOut();
      toast.success("Đăng xuất tài khoản thành công !");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="navbar flex justify-between items-center mt-768:mx-20 mx-2">
      <div className="mt-768:block hidden">
        <ul className=" flex p-2 font-medium  ">
          {sites.map((site, index) => (
            <MenuLink
              key={index}
              label={site.label}
              to={site.to}
              activeOnlyWhenExact={site.exact}
            />
          ))}
        </ul>
      </div>
      <div className="navbar-brand p-2 ">
        <Link className="flex items-center" to="/">
          <img className="w-12 h-12" src={logo} alt="" />
        </Link>
      </div>
      <div>
        <ul className="flex">
          <li className=" relative p-3">
            <a className="inline-block w-21" href="/cart">
              <div>
                {" "}
                <svg
                  className="h-5 w-5 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <circle cx="9" cy="21" r="1" />{" "}
                  <circle cx="20" cy="21" r="1" />{" "}
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <div className="absolute top-[3px] -right-[2px] rounded-2xl text-sm  px-2 bg-red-500 text-white">
                  {/* {products.length} */}
                </div>
              </div>
            </a>
          </li>
          <li className="p-3  relative">
            <label htmlFor="nav-user-category" className="flex">
              <svg
                className="h-5 w-5 text-black"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
                <circle cx="12" cy="7" r="4" />
              </svg>

              <svg
                className="h-5 w-5 text-black mt-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </label>
            <input type="checkbox" id="nav-user-category" className="hidden " />
            <label
              htmlFor="nav-user-category"
              className="nav-user__overlay"
            ></label>
            <ul className="w-40 p-2 rounded-lg bg-white hidden  absolute top-10 right-0 user-category-list">
              {Object.values(currentUser).length === 0 ? (
                <li>
                  <Link to="/login">Đăng nhập</Link>{" "}
                </li>
              ) : (
                <>
                  {" "}
                  <li>{currentUser.displayName}</li>
                  <li onClick={logOut}>Đăng xuất</li>
                </>
              )}
            </ul>
          </li>
        </ul>
      </div>
      <div className="block mt-768:hidden  ">
        {" "}
        <label htmlFor="nav-mobile-category">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <input
          type="checkbox"
          id="nav-mobile-category"
          className="hidden nav__category"
        />
        <label
          htmlFor="nav-mobile-category"
          className="w-screen h-screen z-0 bg-[#999999] opacity-50 hidden nav__overlay top-0 right-0 fixed"
        ></label>
        <ul className="pt-8 bg-black z-99 h-screen absolute right-full ease-in-out top-0 w-4/5 nav_mobile">
          {sites.map((site, index) => (
            <MenuLink
              key={index}
              label={site.label}
              to={site.to}
              activeOnlyWhenExact={site.exact}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Menu;
