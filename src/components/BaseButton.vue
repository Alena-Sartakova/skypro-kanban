<template>
  <button :class="['button', type ?? 'primary']" class="modal__btn-enter _hover01" id="btnEnter">
    <RouterLink to="/" >
      <slot></slot>
    </RouterLink>
  </button>
</template>

<script setup>
defineProps({
   type: String,
})
</script>

<style lang="scss" scoped></style>
