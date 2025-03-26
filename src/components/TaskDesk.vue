<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <TaskColumn :tasks="noStatusTask" v-bind="task"/>
          <TaskColumn :tasks="noStatusTask" v-bind="task"/>
          <TaskColumn :tasks="noStatusTask" v-bind="task"/>
          <TaskColumn :tasks="noStatusTask" v-bind="task"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import TaskColumn from './TaskColumn.vue'
import { getTasks } from '@/mokcs/tasks'
const tasks = ref([])
const noStatusTask = computed(() => {
  return tasks.value.filter((el) => {
    return el.status === 'Без статуса'
  })
})
onMounted(() => {
  tasks.value = getTasks()
})
</script>

<style lang="scss" scoped></style>
