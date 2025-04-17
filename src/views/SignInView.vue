<template>
  <div>
<AuthForm :onClick="handleSignIn"/>
  </div>
</template>

<script setup>
import AuthForm from '@/components/AuthForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter() // Инициализация роутера

async function handleSignIn(e) {
   e.preventDefault() // Предотвращаем перезагрузку страницы
   localStorage.setItem('userInfo', 'true') // Сохраняем флаг авторизации
   router.push('/') // Перенаправляем на главную страницу
}

</script>

<style lang="scss" scoped>

</style>
