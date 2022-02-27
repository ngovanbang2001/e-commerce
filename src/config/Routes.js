import Home from "../pages/Home/index.js";
import Contact from "../pages/Contact/index.js";
import Catalog from "../pages/Catalog/index.js";
import DetailProduct from "../pages/DetailProduct/index.js";
import SignIn from "../pages/SignIn/index.js";
import Cart from "../pages/Cart/index.js";
import SignUp from "../pages/SignUp/index.js";
import NotFound from "../pages/NotFound/index.js";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/contact",
    exact: false,
    main: () => <Contact />,
  },
  {
    path: "/products/catalog/:catalog",
    exact: false,
    main: () => <Catalog />,
  },
  {
    path: "/products/:catalog/:id",
    exact: false,
    main: () => <DetailProduct />,
  },
  {
    path: "/cart",
    exact: false,
    main: () => <Cart />,
  },
  {
    path: "/login",
    exact: false,
    main: () => <SignIn />,
  },
  {
    path: "/signup",
    exact: false,
    main: () => <SignUp />,
  },
  {
    path: "*",
    exact: false,
    main: () => <NotFound />,
  },
];
export default routes;
