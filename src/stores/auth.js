// stores/auth.js
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const loginUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/auth/login`;
const registerUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/auth/register`;

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const isRegisterSuccess = ref(false);

  const authLogin = async (input) => {
    try {
      const res = await axios.post(loginUrl, input);
      const { username, role, token } = res.data;
      user.value = { username, role, token };

      localStorage.setItem("user", JSON.stringify({ username, role, token }));
      isRegisterSuccess.value = false;
    } catch (err) {
      return err;
    }
  };

  const authRegister = async (input) => {
    try {
      await axios.post(registerUrl, input);

      isRegisterSuccess.value = true;
    } catch (err) {
      return err;
    }
  };

  return { user, authLogin, isRegisterSuccess, authRegister };
});
