import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "./config/Routes.js";
import { useEffect } from "react";
import Header from "./component/Header/index";
import Footer from "./component/Footer/index";
import firebase from "./firebase/config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import AuthProvider from "./context/AuthProvider.js";
function App() {
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          // user logs out, handle something here
          console.log("User is not logged in");
          return;
        }
        const token = await user.getIdToken();
        const setjson = JSON.stringify(user.providerData);
        localStorage.setItem("firebaseui::rememberedAccounts", setjson);
        console.log("Logged in user token: ", token);
      });

    return () => unregisterAuthObserver();
  }, []);

  const showContentMenu = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ));
    }
    return result;
  };
  return (
    <Router>
      <AuthProvider>
        <Header />

        <Switch>{showContentMenu(routes)}</Switch>
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </Router>
  );
}

export default App;
