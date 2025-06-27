<template>
  <div class="wrapper">
    <RouterView />

  </div>
</template>

<script setup>
import { onMounted, provide, ref } from 'vue'
import { RouterView } from 'vue-router'

// Создаем реактивную переменную для хранения данных пользователя
const userInfo = ref(null)

// Функция для установки данных пользователя
function setUserInfo(value) {
  userInfo.value = value
  try {
    localStorage.setItem('userInfo', JSON.stringify(value))
  } catch (e) {
    console.error('Ошибка при сохранении данных:', e)
    return null
  }
}

// Функция для удаления данных пользователя
function removeUserInfo() {
  userInfo.value = null
  try {
    localStorage.removeItem('userInfo')
  } catch (e) {
    console.error('Ошибка при удалении данных:', e)
  }
}

// Предоставляем данные для всего приложения
provide('auth', {
  userInfo: userInfo,
  setUser: setUserInfo,
  removeUser: removeUserInfo,
  setUserInfo: setUserInfo,
});

/* // Выводим информацию для отладки
console.log('Provided auth:', {
  userInfo: userInfo,
  setUser: setUserInfo,
  removeUser: removeUserInfo,
}) */

// При монтировании компонента загружаем данные из localStorage
onMounted(() => {
  try {
    const data = localStorage.getItem('userInfo')
    if (data) {
      userInfo.value = JSON.parse(data)
      /* console.log('Загруженные данные:', userInfo.value) */
    }
  } catch (e) {
    userInfo.value = null
    console.error('Ошибка при загрузке данных:', e)
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f1f1f1;
}
</style>
