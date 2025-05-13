import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/user'
// Эта переменная содержит базовый URL для запросов к нашему серверу

export async function fetchWords({ token }) {

   try {
      // Здесь начинается попытка сделать запрос
      const data = await axios.get(API_URL, {
         headers: {
            Authorization: 'Bearer ' + token,
         },
      })

      return data.data
      // Возвращаем именно data.data,
      // потому что библиотека axios кладет полезную нагрузку внутрь ключа data
   } catch (error) {
      // В случае ошибки выбрасываем исключение с сообщением
      throw new Error(error.message)
   }
}
