<template>

  <main class="main">
    <div class="container">
      <div class="main__block">
        <p v-if="!tasks.length">Задач нет</p>
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
import { computed } from 'vue'
import TaskColumn from './TaskColumn.vue'

const props = defineProps({
  tasks: { type: Array, require: true },
  loading: Boolean,
  erorr: String
})
console.log(props);

const noStatusTask = computed(() => {
  return props.tasks.value.filter((el) => {
    return el.status === 'Без статуса'
  })
});
const doStatusTask = computed(() => {
  return props.tasks.value.filter((el) => {
    return el.status === 'Нужно сделать'
  })
});
const workStatusTask = computed(() => {
  return props.tasks.value.filter((el) => {
    return el.status === 'В работе'
  })
});
const testStatusTask = computed(() => {
  return props.tasks.value.filter((el) => {
    return el.status === 'Тестирование'
  })
});
const readyStatusTask = computed(() => {
  return props.tasks.value.filter((el) => {
    return el.status === 'Готово'
  })
});




</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-color: #eaeef6;
  z-index: 1;
}
.main__block {
  width: 100%;
  margin: 0 auto;
  padding: 25px 0 49px;
}
.main__content {
  width: 100%;
  display: flex;
}
</style>
