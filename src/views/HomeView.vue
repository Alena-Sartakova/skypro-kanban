<template>
  <main>
    <div class="wrapper">
      <RouterView />
      <BaseHeader />
      <Transition name="slide-fade">
        <div v-if="isOffline" class="network-error">
          🔴 Нет подключения к интернету. Проверьте сеть и попробуйте снова.
          <button @click="retryFetch">Повторить попытку</button>
        </div>
      </Transition>

      <Transition name="show">
        <div class="loading" v-if="loading">Loading&#8230;</div>
        <TaskDesk v-else :loading="loading" :tasks="tasks" :error="error" @retry="getTasks" />
      </Transition>
    </div>
  </main>
</template>

<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import { fetchTasks } from '@/servises/api'
import { inject, onMounted, onUnmounted, provide, ref, watch } from 'vue'

const tasks = ref([])
const loading = ref(false)
const error = ref('')
const isOffline = ref(false)
const { userInfo } = inject('auth')

// Добавляем обработчики сетевого статуса
const updateNetworkStatus = () => {
  isOffline.value = !navigator.onLine
  if (!isOffline.value && error.value.includes('интернет')) {
    error.value = ''
  }
}

onMounted(() => {
  window.addEventListener('online', updateNetworkStatus)
  window.addEventListener('offline', updateNetworkStatus)
  updateNetworkStatus()
})

onUnmounted(() => {
  window.removeEventListener('online', updateNetworkStatus)
  window.removeEventListener('offline', updateNetworkStatus)
})

provide('tasksData', { tasks, loading, error, isOffline })

const getTasks = async () => {
  if (!userInfo.value?.token) {
    error.value = 'Отсутствует токен авторизации'
    return
  }

  if (isOffline.value) {
    error.value = 'Ошибка: устройство не подключено к интернету'
    return
  }

  try {
    loading.value = true
    error.value = ''

    const data = await fetchTasks({
      token: userInfo.value.token,
    })

    if (data) tasks.value = data
  } catch (err) {
    handleFetchError(err)
  } finally {
    loading.value = false
  }
}

const handleFetchError = (err) => {
  if (err.name === 'OfflineError' || !navigator.onLine) {
    error.value = 'Нет подключения к интернету. Проверьте сеть.'
    isOffline.value = true
  } else if (err.response?.status === 401) {
    error.value = 'Сессия истекла. Требуется повторная авторизация.'
  } else {
    error.value = err.message || 'Ошибка при загрузке задач'
  }

  console.error('Ошибка при получении задач:', err)
}

const retryFetch = () => {
  isOffline.value = false
  error.value = ''
  getTasks()
}

watch(userInfo, getTasks, { immediate: true })
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

/* Transparent Overlay */
.loading:before {
  content: '';
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

/* :not(:required) hides these rules from IE9 and below */
.loading:not(:required) {
  /* hide "loading..." text */
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.loading:not(:required):after {
  content: '';
  display: block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin-top: -0.5em;
  -webkit-animation: spinner 1500ms infinite linear;
  -moz-animation: spinner 1500ms infinite linear;
  -ms-animation: spinner 1500ms infinite linear;
  -o-animation: spinner 1500ms infinite linear;
  animation: spinner 1500ms infinite linear;
  border-radius: 0.5em;
  -webkit-box-shadow:
    rgba(0, 0, 0, 0.75) 1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0,
    rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
    rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0,
    rgba(0, 0, 0, 0.5) -1.5em 0 0 0,
    rgba(0, 0, 0, 0.5) -1.1em -1.1em 0 0,
    rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
    rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
  box-shadow:
    rgba(0, 0, 0, 0.75) 1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0,
    rgba(0, 0, 0, 0.75) 0 1.5em 0 0,
    rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0,
    rgba(0, 0, 0, 0.75) -1.5em 0 0 0,
    rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0,
    rgba(0, 0, 0, 0.75) 0 -1.5em 0 0,
    rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;
}

/* Animation */

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-moz-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-o-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.show-enter-active,
.show-leave-active {
  transition: opacity 1s ease;
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
}
</style>
