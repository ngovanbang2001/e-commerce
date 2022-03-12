import axios from "axios";
import queryString from "query-string";
import firebase from "./../firebase/config";
import * as apiUrl from "./../constants/apiUrl";

// const getFirebaseToken = async () => {
//   const currentUser = firebase.auth().currentUser;
//   if (currentUser) return currentUser.getIdToken();

//   // Not logged in
//   const hasRememberedAccount = localStorage.getItem(
//     "firebaseui::rememberedAccounts"
//   );
//   console.log(hasRememberedAccount);
//   if (!hasRememberedAccount) return null;

//   // Logged in but current user is not fetched --> wait (10s)
//   return new Promise((resolve, reject) => {
//     const waitTimer = setTimeout(() => {
//       reject(null);
//       console.log("Reject timeout");
//     }, 10000);

//     const unregisterAuthObserver = firebase
//       .auth()
//       .onAuthStateChanged(async (user) => {
//         if (!user) {
//           reject(null);
//         }
//         const token = await user.getIdToken();
//         console.log("[AXIOS] Logged in user token: ", token);
//         resolve(token);
//         unregisterAuthObserver();
//         clearTimeout(waitTimer);
//       });
//   });
// };
const axiosClient = axios.create({
  baseURL: apiUrl.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify({ ...params }),
});
// Add a request interceptor
// axiosClient.interceptors.request.use(async (config) => {
//   const token = await getFirebaseToken();
//   console.log(token);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
