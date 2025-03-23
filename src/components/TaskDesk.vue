<template>
  <main class="main">
    <div class="container">
      <div class="main__block">
        <div class="main__content">
          <TaskColumn />

        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import TaskColumn from './TaskColumn.vue'
import { getTasks } from '@/mokcs/tasks'
import { onMounted, ref } from 'vue'
const tasks = ref([])
onMounted(() => {
  tasks.value = getTasks()
});

</script>

<style lang="scss" scoped></style>
