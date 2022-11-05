import axios from "axios";

export const api = axios.create({
  // NO IOS O LOCAHOST FUNCIONA, NO ANDROID NÃO
  // UTILIZAR O IP FÍSICO DA MÁQUINA
  baseURL: process.env.API_URL,
});
