// stores/auth.js
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const loginUrl = `${import.meta.env.VITE_AUTH_ENDPOINT}/auth/login`;

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const authLogin = async (input) => {
    try {
      let res = await axios.post(loginUrl, input);
      let { username, role, token } = res.data;
      user.value = { username, role, token };

      localStorage.setItem("user", JSON.stringify({ username, role, token }));
    } catch (err) {
      return err;
    }
  };

  return { user, authLogin };
});
