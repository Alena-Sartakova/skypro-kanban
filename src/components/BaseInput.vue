<template>
  <div>
    <input
      class="modal__input"
      :type="type"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      v-model="model"
    />
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
})

const model = defineModel()
</script>

<style lang="scss" scoped>
.modal__input {
  width: 100%;
  min-width: 100%;
  border-radius: 8px;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  outline: none;
  padding: 10px 8px;
}
</style>
