<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <TaskColumn :tasks="noStatusTask" title='Без статуса'/>
          <TaskColumn :tasks="doStatusTask" title='Нужно сделать'/>
          <TaskColumn :tasks="workStatusTask" title='В работе'/>
          <TaskColumn :tasks="testStatusTask" title='Тестирование'/>
          <TaskColumn :tasks="readyStatusTask" title='Готово'/>
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
});
const doStatusTask = computed(() => {
  return tasks.value.filter((el) => {
    return el.status === 'Нужно сделать'
  })
});
const workStatusTask = computed(() => {
  return tasks.value.filter((el) => {
    return el.status === 'В работе'
  })
});
const testStatusTask = computed(() => {
  return tasks.value.filter((el) => {
    return el.status === 'Тестирование'
  })
});
const readyStatusTask = computed(() => {
  return tasks.value.filter((el) => {
    return el.status === 'Готово'
  })
});
onMounted(() => {
  tasks.value = getTasks()
});

</script>

<style lang="scss" scoped></style>
