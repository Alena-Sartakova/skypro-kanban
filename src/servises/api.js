import axios from 'axios'

const API_URL = 'https://wedev-api.sky.pro/api/kanban'
// Добавляем интерцептор для обработки 401 ошибки
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export async function fetchTasks({ token }) {
  try {
    const { data } = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data.tasks
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка загрузки задач')
  }
}

export async function postTask({ token, task }) {
  try {
    const { data } = await axios.post(API_URL, task, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': '' // Явное указание Content-Type
      }
    })
    return data
  } catch (error) {
    // Детализация ошибки
    const serverMessage = error.response?.data?.error
      || error.response?.data?.message
      || 'Ошибка создания задачи'
    throw new Error(serverMessage)
  }
}

export async function editTask({ token, id, task }) {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, task, { // Исправлен URL
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': ''
      }
    })
    return data.tasks
  } catch (error) {
    const message = error.response?.data?.message || 'Ошибка обновления задачи'
    throw new Error(message)
  }
}

export async function deleteTask({ token, id }) {
  try {
    const { data } = await axios.delete(`${API_URL}/${id}`, { // Исправлен URL и параметры
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data.tasks
  } catch (error) {
    const message = error.response?.data?.message || 'Ошибка удаления задачи'
    throw new Error(message)
  }

}
