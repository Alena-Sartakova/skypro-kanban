<template>
  <div class="main__column column">
    <div class="column__title">
      <p>Без статуса</p>
    </div>
    <TaskCard v-for="task in tasks" :key="task.id" />
  </div>
  <!-- <div class="main__column" >
    <div class="column__title">
      <p>Нужно сделать</p>
    </div>
    <TaskCard />
  </div>
  <div class="main__column">
    <div class="column__title">
      <p>В работе</p>
    </div>
    <TaskCard />
  </div>
  <div class="main__column">
    <div class="column__title">
      <p>Тестирование</p>
    </div>
    <TaskCard />
  </div>
  <div class="main__column">
    <div class="column__title">
      <p>Готово</p>
    </div>
    <TaskCard />
  </div> -->
</template>

<script setup>
import TaskCard from './TaskCard.vue'
import { getTasks } from '@/mokcs/tasks'
import { onMounted, ref } from 'vue'
const tasks = ref([])
onMounted(() => {
  tasks.value = getTasks()
})

</script>

<style lang="scss" scoped></style>
