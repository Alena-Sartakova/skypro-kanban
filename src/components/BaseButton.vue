<template>
  <button :class="['button', type ?? 'primary']" class="modal__btn-enter _hover01" id="btnEnter">
    <RouterLink to="/" >
      <slot></slot>
    </RouterLink>
  </button>
</template>

<script setup>
/* import router from '@/router';
:onClick="handleSignIn"
async function handleSignIn(e) {
  e.preventDefault() // Предотвращаем перезагрузку страницы
  localStorage.setItem('userInfo', 'true') // Сохраняем флаг авторизации
  router.push('/') // Перенаправляем на главную страницу
} */
defineProps({
   type: String,
})
</script>

<style lang="scss" scoped></style>
