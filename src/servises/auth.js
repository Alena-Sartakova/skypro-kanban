import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/user";

export async function signIn(userData) {
   try {
      const data = await axios.post(API_URL + "/login", userData, {
         headers: {
            "Content-Type": "",
         },
      });

   return data.data.user;

   } catch (error) {
    console.error('Ошибка авторизации:', error);
      throw new Error(error.response.data.error || 'Ошибка авторизации');
   }
}

export async function signUp({ name, login, password }) {
   try {
      const data = await axios.post(
         API_URL,
         { login, name, password },
         {
         headers: {
            "Content-Type": "",
         },
      }
   );
   return data.data.user;
   } catch (error) {
      console.error('Ошибка регистрации:', error);
      throw new Error(error.response.data.error || 'Ошибка регистрации');
   }
}
