<template>
  <div class="main__column column">
    <div class="column__title">
      <p>{{ title }}</p>
    </div>
    <RouterLink to="/browse-card/:id">
      <TaskCard v-for="task in tasks" :key="task.id" v-bind="task" />
    </RouterLink>
  </div>
</template>

<script setup>
import TaskCard from './TaskCard.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const task = computed(() => {
  return tasks.find(
    (t) => t.id === route.params.id || { topic: '', title: '', date: '', status: '' },
  )
});
defineProps({
  tasks: { type: Array, require: true },
  title: { type: String, require: true },
})
</script>

<style lang="scss" scoped>
.main__column {
  width: 20%;
  margin: 0 auto;
  display: block;
}
.column__title {
  padding: 0 10px;
  margin: 15px 0;
}

.column__title p {
  color: #94a6be;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}
</style>
