import firebase from "./../../firebase/config";
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import "firebase/compat/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import "./index.css";

const uiConfig = {
  signInFlow: "redirect",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};
function SignIn() {
  const history = useHistory();
  const { signIn } = useAuth();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(user.email, user.password);
      history.push("/");
      toast.success("Đăng nhập thành công !");
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
              Đăng nhập{" "}
            </h1>
            <p></p>
            <div className="input-box">
              <i></i>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Nhập Gmail"
              />
            </div>
            <div className="input-box">
              <i></i>
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="btn-box flex justify-between">
              <button type="submit">Đăng nhập</button>
            </div>
          </form>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
          <div className="text-black">
            Bạn đã có tài khoản ?{" "}
            <Link to="/signup" className="text-blue-500">
              Tạo tài khoản
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
