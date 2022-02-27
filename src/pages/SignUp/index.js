import firebase from "./../../firebase/config";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./index.css";

function SignUp() {
  const history = useHistory();
  const { signUp } = useAuth();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setNewUser({ ...newUser, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(newUser.email, newUser.password);
      history.push("/login");
      toast.success("Đăng kí tài khoản thành công !");
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <>
      <div className="container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1 className="text-[#009999] text-4xl font-bold mb-[30px]">
              Đăng kí
            </h1>
            <div className="input-box">
              <i></i>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
                placeholder="Nhập Gmail"
              />
            </div>
            <div className="input-box">
              <i></i>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <div className="input-box">
              <i></i>
              <input
                type="password"
                name="passwordConfirm"
                value={newUser.passwordConfirm}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                required
              />
            </div>
            <div className="btn-box flex justify-between">
              <button type="submit">Đăng nhập</button>
            </div>
            <div className="text-black mt-2">
              Chuyển sang{" "}
              <Link to="/login" className="text-blue-500">
                Đăng nhập ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default SignUp;
