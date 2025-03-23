<template>
  <header class="header">
    <div class="container">
      <div class="header__block">
        <div class="header__logo _show _light">
          <a href="" target="_self"><img src="/src/assets/logo.png" alt="logo" /></a>
        </div>
        <div class="header__logo _dark">
          <a href="" target="_self"><img src="/src/assets/logo_dark.png" alt="logo" /></a>
        </div>
        <nav class="header__nav">
          <button class="header__btn-main-new _hover01" id="btnMainNew">
            <a href="#popNewCard">Создать новую задачу</a>
          </button>
          <UserModal />
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import UserModal from './UserModal.vue'
</script>

<style lang="scss" scoped></style>
