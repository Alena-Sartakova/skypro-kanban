<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <TaskCard v-for="task in tasks" :key="task.id" v-bind="task" />
  </div>

</template>

<script setup>
import TaskCard from './TaskCard.vue'

defineProps({
  tasks: { type: Array, require: true},
  title: {type: String, require: true},
});

</script>

<style lang="scss" scoped></style>
