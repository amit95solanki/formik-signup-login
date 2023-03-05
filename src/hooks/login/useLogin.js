import { useMutation } from "react-query";
import axios from "axios";

const API_URL_LOGIN = "http://134.209.229.112:5000/account/login";

function login(logindata) {
  return axios.post(API_URL_LOGIN, logindata);
}

export default function useLogin() {
  return useMutation(login);
}
