<template>
  <main>
    <div class="wrapper">
      <!-- pop-up start-->

      <div class="pop-exit" id="popExit">
        <ExitModal />
      </div>
      <RouterView />
      <div class="pop-new-card" id="popNewCard">
        <NewCardModal />
      </div>

      <div class="pop-browse" id="popBrowse">
        <BrowseModal />
      </div>

      <!-- pop-up end-->
      <BaseHeader />
      <Transition name="show">
        <div v-if="loading">Идёт загрузка...</div>
        <TaskDesk v-else :loading="loading" :tasks="tasks" :error="error" />
      </Transition>
    </div>
  </main>
</template>
<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BrowseModal from '@/components/BrowseModal.vue'
import ExitModal from '@/components/ExitModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import { fetchTasks } from '@/servises/api'
import { onMounted, ref } from 'vue'

/* const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
}); */

const tasks = ref([])
const loading = ref(true)
const error = ref('')

const getTasks = async () => {
  try {
    loading.value = false
    const data = await fetchTasks({
      token: 'bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck',
      // Поскольку авторизация не реализована, передаем токен вручную
    })

    if (data) tasks.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
onMounted(getTasks)

const socket = new WebSocket('ws://localhost:5173')
socket.onopen = function (event) {
  console.log('Соединение установлено')
}
socket.onerror = function (error) {
  console.log('Ошибка подключения:', error)
}
</script>

<style lang="scss" scoped>
.show-enter-active,
.show-leave-active {
  transition: opacity 1s ease;
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
}
</style>
