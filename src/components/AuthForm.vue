<template>
  <div>
    <div class="wrapper">
      <div class="container-signin">
        <div class="modal">
          <div class="modal__block">
            <div class="modal__ttl">
              <h2>{{ isSignUp ? 'Регистрация' : 'Вход' }}</h2>
            </div>
            <form class="modal__form-login" @submit.prevent="handleSubmit">
              <!-- Поле имени только для регистрации -->
              <BaseInput
                :class="{ error: submitted && errors.name }"
                v-show="isSignUp"
                name="name"
                id="formname"
                placeholder="Имя"
                v-model="formData.name"
                @focus="clearError('name')"
                autocomplete="name"
                spellcheck="false"
              />
              <!-- Поле email -->
              <BaseInput
                :class="{ error: submitted && errors.login }"
                type="text"
                name="login"
                id="formlogin"
                placeholder="Логин"
                v-model="formData.login"
                @focus="clearError('login')"
                autocomplete="username"
                spellcheck="false"
              />
              <!-- Поле пароля -->
              <BaseInput
                :class="{ error: submitted && errors.password }"
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                v-model="formData.password"
                @focus="clearError('password')"
                autocomplete="current-password"
                spellcheck="false"
              />
              <p v-show="error" class="error-text">
                {{ error }}
              </p>
              <!-- Кнопка отправки -->
              <BaseButton
                type="secondary"
                :fullWidth="true"
                class="button-enter"
                :disabled="isLoading || isSuccess"
                :class="{
                  loading: isLoading,
                  success: isSuccess,
                  'error-state': error,
                }"
                @click="handleSubmit"
              >
                {{ buttonText }}
              </BaseButton>

              <!-- Ссылки для переключения между формами -->
              <div v-show="!isSignUp" class="modal__form-group">
                <p>Нужно зарегистрироваться?</p>
                <a href="#" @click.prevent="toggleAuthMode">Регистрируйтесь здесь</a>
              </div>
              <div v-show="isSignUp" class="modal__form-group">
                <p>
                  Уже есть аккаунт?
                  <a href="#" @click.prevent="toggleAuthMode">Войдите здесь</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import { signIn, signUp } from '@/servises/auth'

const auth = inject('auth')

// Внутреннее состояние вместо маршрутизации
const isSignUp = ref(false)
const formData = ref({ name: '', login: '', password: '' })
const errors = ref({ name: false, login: false, password: false })
const error = ref('')
const submitted = ref(false)
const isLoading = ref(false)
const isSuccess = ref(false)

const buttonText = computed(() => {
  if (isSuccess.value) return isSignUp.value ? 'Успешная регистрация!' : 'Успешный вход!'
  if (isLoading.value) return isSignUp.value ? 'Регистрация...' : 'Вход...'
  return isSignUp.value ? 'Зарегистрироваться' : 'Войти'
})
// Переключение режима формы
const toggleAuthMode = () => {
  isSignUp.value = !isSignUp.value
  resetForm()
}

// Сброс формы
const resetForm = () => {
  formData.value = { name: '', login: '', password: '' }
  errors.value = { name: false, login: false, password: false }
  error.value = ''
  submitted.value = false
  isLoading.value = false
  isSuccess.value = false
}

// Валидация (оставляем оригинальную)
function validateForm() {
  let isValid = true
  error.value = ''
  errors.value = { name: false, login: false, password: false }

  if (isSignUp.value && !formData.value.name.trim()) {
    errors.value.name = true
    isValid = false
  }

  if (!formData.value.login.trim()) {
    errors.value.login = true
    isValid = false
  }

  if (!formData.value.password.trim()) {
    errors.value.password = true
    isValid = false
  }

  if (!isValid) {
    const messages = []
    if (errors.value.name) messages.push('Заполните имя')
    if (errors.value.login) messages.push('Введите логин')
    if (errors.value.password) messages.push('Введите пароль')
    error.value = messages.join(', ')
  }

  return isValid
}

// Обработчик отправки
async function handleSubmit(event) {
  event.preventDefault()
  submitted.value = true

  if (!validateForm() || isLoading.value) return

  isLoading.value = true
  error.value = ''

  try {
    const data = isSignUp.value ? await signUp(formData.value) : await signIn(formData.value)

    if (data.error) throw new Error(data.message || 'Ошибка сервера')

    auth.setUserInfo(data)
    isSuccess.value = true

    // Автопереход после успешной регистрации
    if (isSignUp.value) {
      setTimeout(() => toggleAuthMode(), 2000)
    } else {
      setTimeout(() => (window.location.href = '/'), 2000)
    }
  } catch (err) {
    error.value =
      !isSignUp.value && err.response?.status === 401
        ? 'Неверный логин или пароль'
        : err.message || 'Ошибка при выполнении запроса'

    errors.value.login = true
    errors.value.password = true
  } finally {
    isLoading.value = false
    isSuccess.value = false
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
.error {
  border: 1px solid red;
  transition: border-color 0.3s ease;
  animation: shake 0.5s ease;
}
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.error-message {
  color: red;
  margin-top: 5px;
}
.button-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading {
  opacity: 0.8;
  cursor: progress;
}

.success {
  background-color: #4caf50 !important;
  animation: success-blink 0.5s 2;
}

.BaseInput {
  &::after {
    content: attr(error-message);
    display: block;
    margin-top: 5px;
    color: red;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &.error::after {
    opacity: 1;
  }
  &.error {
    border-color: red;
    &:focus {
      border-color: darkred;
    }
  }
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
