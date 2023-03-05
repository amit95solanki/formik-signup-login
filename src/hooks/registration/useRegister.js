import { useMutation } from "react-query";
import axios from "axios";

const API_URL = "http://134.209.229.112:5000/account/signup";

// const register = async (data) => {
//   try {
//     return await axios.post(API_URL, data);
//   } catch (error) {
//     console.log("Error while calling addUser api", error.massage);
//   }
// };

function register(registerData) {
  return axios.post(API_URL, registerData);
}

export default function useRegister() {
  return useMutation(register);
}
