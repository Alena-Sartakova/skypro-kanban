<template>
  <a href="#user-set-target" class="header__user _hover02" v-if="userModalOn">Ivan Ivanov</a>
  <div  class="header__pop-user-set pop-user-set" id="user-set-target" v-else>
    <!-- <a href="">x</a> -->
    <p class="pop-user-set__name">Ivan Ivanov</p>
    <p class="pop-user-set__mail">ivan.ivanov@gmail.com</p>
    <div class="pop-user-set__theme">
      <p>Темная тема</p>
      <input type="checkbox" class="checkbox" name="checkbox" />
    </div>
    <button type="button" class="_hover03"><a href="#popExit">Выйти</a></button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const userModalOn = ref(true);

</script>
<style lang="scss" scoped></style>
