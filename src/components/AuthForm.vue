<template>
  <div>
    <div class="wrapper">
      <div class="container-signin">
        <div class="modal">
          <div class="modal__block">
            <div class="modal__ttl">
              <h2>Вход</h2>
            </div>
            <form class="modal__form-login" id="formLogIn" action="#" @submit="handleSubmit">
              <BaseInput
                :class="[{ error: errors.name }]"
                v-show="isSignUp"
                name="name"
                id="formname"
                placeholder="Имя"
                v-model="formData.name"
                @focus="clearError('name')"
              />
              <BaseInput
                :class="[{ error: errors.login }]"
                type="text"
                name="login"
                id="formlogin"
                placeholder="Эл. почта"
                v-model="formData.login"
                @focus="clearError('login')"
              />
              <BaseInput
                :class="[{ error: errors.password }]"
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                v-model="formData.password"
                @focus="clearError('password')"
              />
              <button  class="modal__btn-enter _hover01" id="btnEnter">

                <RouterLink to="/" :onClick="handleSignIn">Войти</RouterLink>
              </button>
              <div v-show="!isSignUp" class="modal__form-group">
                <p>Нужно зарегистрироваться?</p>
                <RouterLink to="/sign-up">Регистрируйтесь здесь</RouterLink>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { signIn, signUp } from '@/servises/auth'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import BaseInput from './BaseInput.vue'
const router = useRouter() // Инициализация роутера

async function handleSignIn(e) {
  e.preventDefault() // Предотвращаем перезагрузку страницы
  localStorage.setItem('userInfo', 'true') // Сохраняем флаг авторизации
  router.push('/') // Перенаправляем на главную страницу
}

 const props = defineProps({
  isSignUp: Boolean,
})

// Создаём объект состояния, где хранится "name"
const formData = ref({

  login: '',
  password: '',
}) // formData теперь хранит поле имени

const errors = ref({

  login: false,
  password: false,
})
const error = ref('')

function validateForm() {
let isValid = true
error.value = ''
// Сбросим все ошибки

errors.value.login = false
errors.value.password = false
// Проверка имени (только для регистрации)

// Проверка логина (эл. почты)
if (!formData.value.login.trim()) {
errors.value.login = true
isValid = false
}
// Проверка пароля
if (!formData.value.password.trim()) {
errors.value.password = true
isValid = false
}
// Если есть ошибки, установим общее сообщение
if (!isValid) {
error.value = 'Пожалуйста, заполните все обязательные поля'
}
return isValid
}
// Функция, которая срабатывает при сабмите формы
async function handleSubmit(event) {
  event.preventDefault()

if (!validateForm()) {
  return
}

try {
  const data = props.isSignUp
  ? await signUp(formData.value)
  : await signIn ({ login: formData.value.login, password: formData.value.password})
  if (data){
    localStorage.setItem ('userInfo', JSON.stringify(data))
    router.push('/')
  }
  }
 catch (err) {
    error.value = err.message
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

a,
a:visited {
  text-decoration: none;
  cursor: pointer;
}

button,
._btn {
  cursor: pointer;
}

ul li {
  list-style: none;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
}

div,
button,
a {
  font-family: 'Roboto', sans-serif;
}

.wrapper {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #eaeef6;
}

.container-signin {
  display: block;
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
}

._hover01:hover {
  background-color: #33399b;
}

.modal {
  width: 100%;
  height: 100%;
  min-width: 320px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 368px;
  width: 100%;
  padding: 50px 60px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  box-shadow: 0px 4px 67px -12px rgba(0, 0, 0, 0.13);
}
.modal__ttl h2 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: -0.6px;
  margin-bottom: 20px;
}
.modal__form-login {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal__form-login input:first-child {
  margin-bottom: 7px;
}
.modal__input {
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  outline: none;
  padding: 10px 8px;
}
.modal__input::-moz-placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}
.modal__input::placeholder {
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #94a6be;
}
.modal__btn-enter {
  width: 100%;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  letter-spacing: -0.14px;
  color: #ffffff;
}
.modal__btn-enter a {
  width: 100%;
  height: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__form-group {
  text-align: center;
}
.modal__form-group p,
.modal__form-group a {
  color: rgba(148, 166, 190, 0.4);
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.14px;
}
.modal__form-group a {
  text-decoration: underline;
}

@media screen and (max-width: 375px) {
  .modal {
    background-color: #ffffff;
  }
  .modal__block {
    max-width: 368px;
    width: 100%;
    padding: 0 16px;
    border-radius: none;
    border: none;
    box-shadow: none;
  }
  .modal__btn-enter {
    height: 40px;
  }
}
</style>
