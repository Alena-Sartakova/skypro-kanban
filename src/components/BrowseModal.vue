<template>
  <div>
    <div v-if="isModalOpen" class="pop-browse__container">
      <div class="pop-browse__block">
        <div class="pop-browse__content">
          <!-- Заголовок и тема -->
          <div class="pop-browse__top-block">
            <h3 class="pop-browse__ttl">
              <input v-if="isEditing" type="text" v-model="editedTask.title" class="edit-title" />
              <span v-else>{{ task.title }}</span>
            </h3>
            <div :class="topicClass">
              <p>{{ task.topic }}</p>
            </div>
          </div>

          <!-- Статус задачи в просмотре -->
          <div v-if="!isEditing" class="pop-browse__status status">
            <p class="status__p subttl">Статус</p>
            <div class="status__themes">
              <div class="status__theme" :class="statusClass('Без статуса')">
                <p :class="statusTextClass('Без статуса')">Без статуса</p>
              </div>
              <div class="status__theme" :class="statusClass('Нужно сделать')">
                <p :class="statusTextClass('Нужно сделать')">Нужно сделать</p>
              </div>
              <div class="status__theme" :class="statusClass('В работе')">
                <p :class="statusTextClass('В работе')">В работе</p>
              </div>
              <div class="status__theme" :class="statusClass('Тестирование')">
                <p :class="statusTextClass('Тестирование')">Тестирование</p>
              </div>
              <div class="status__theme" :class="statusClass('Готово')">
                <p :class="statusTextClass('Готово')">Готово</p>
              </div>
            </div>
          </div>

          <!-- Статус задачи в редактировании -->
          <div v-if="isEditing" class="pop-browse__status status">
            <p class="status__p subttl">Статус</p>
            <div class="status__themes">
              <div
                v-for="status in statusOptions"
                :key="status"
                class="status__theme"
                :class="{
                  _blue: editedTask.status === status,
                  _editable: isEditing,
                  _selected: editedTask.status === status,
                  'bg-94a6be': editedTask.status === status,
                }"
                @click="handleStatusChange(status)"
              >
                <p>{{ status }}</p>
              </div>
            </div>
          </div>

          <!-- Описание задачи -->
          <div class="pop-browse__wrap">
            <form class="pop-browse__form form-browse">
              <div class="form-browse__block">
                <label class="subttl">Описание задачи</label>
                <textarea
                  class="form-browse__area"
                  :readonly="!isEditing"
                  :value="isEditing ? editedTask.description : task.description"
                  @input="isEditing && (editedTask.description = $event.target.value)"
                  placeholder="Описание задачи..."
                ></textarea>
              </div>
            </form>

            <!-- Даты -->
            <div v-if="task">
              <CalendarComponent
                :raw-date="task.date"
                :initial-date="isEditing ? null : task.date"
                :readonly="!isEditing"
                @date-selected="handleDateSelect"
              />
            </div>
          </div>
        </div>

        <!-- Панель управления -->
        <div class="pop-browse__btn-edit">
          <div class="btn-group">
            <button v-if="!isEditing" class="btn-edit _btn-bor _hover03" @click="startEditing">
              Редактировать задачу
            </button>

            <div v-else class="edit-controls">
              <button
                class="btn-save _btn-bg _hover01"
                @click="saveChanges"
                :disabled="!isFormValid || isSubmitting"
              >
                {{ isSubmitting ? 'Сохранение...' : 'Сохранить' }}
              </button>
              <button class="btn-cancel _btn-bg _hover01" @click="cancelEditing">Отменить</button>
            </div>
            <!-- Отображение сообщения об ошибке -->
            <div v-if="errorMessage" class="error-message">
              <p>{{ errorMessage }}</p>
            </div>
            <button
              class="btn-browse__delete _btn-bor _hover03"
              @click="handleDelete"
              :disabled="isDeleting"
            >
              {{ isDeleting ? 'Удаление...' : 'Удалить задачу' }}
            </button>
          </div>

          <button class="btn-edit__close _btn-bg _hover01">
            <RouterLink to="/">Закрыть</RouterLink>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { deleteTask, editTask } from '../servises/api'
import router from '../router'
import CalendarComponent from './CalendarComponent.vue'
import dayjs from 'dayjs'

const route = useRoute()
const { tasks } = inject('tasksData')
const { userInfo } = inject('auth')

// Состояния компонента
const isSubmitting = ref(false)
const isModalOpen = ref(true)
const isEditing = ref(false)
const isDeleting = ref(false)
const isFormValid = ref(false)
const formError = ref('')
const originalTask = ref({})
const editedTask = ref({
  title: '',
  description: '',
  status: '',
  topic: '',
  date: null,
})
const errorMessage = ref('')

// Загрузка задачи при монтировании
const task = computed(() => {
  const foundTask = tasks.value.find((t) => t._id === route.params.id) || {
    title: '',
    description: '',
    status: '',
    topic: '',
    date: new Date().toISOString(),
  }
  return foundTask
})

// Начало редактирования с проверкой данных
const startEditing = () => {
  if (!task.value?._id) {
    errorMessage.value = 'Задача не найдена'
    return
  }

  originalTask.value = { ...task.value }
  editedTask.value = {
    ...task.value,
    date: task.value.date ? dayjs(task.value.date).toDate() : null,
  }
  isEditing.value = true
}

// Валидация формы
const validateForm = () => {
  formError.value = ''
  const errors = []

  if (!editedTask.value.title?.trim() || editedTask.value.title.trim().length < 3) {
    errors.push('Название задачи (минимум 3 символа)')
  }

  if (!editedTask.value.status) {
    errors.push('Статус задачи')
  }

  if (!editedTask.value.date) {
    errors.push('Срок исполнения')
  } else if (dayjs(editedTask.value.date).isBefore(dayjs(), 'day')) {
    errors.push('Дата не может быть в прошлом')
  }

  isFormValid.value = errors.length === 0 // Обновляем состояние валидности

  if (errors.length) {
    formError.value = `Заполните: ${errors.join(', ')}`
    return false
  }
  return true
}

// Сохранение изменений с обработкой ошибок
const saveChanges = async () => {
  console.log('Отправляемые данные:', {
  title: editedTask.value.title,
  status: editedTask.value.status,
  date: dayjs(editedTask.value.date).toISOString(),
  description: editedTask.value.description,
  topic: editedTask.value.topic
});
  console.group('%cSave Changes Workflow', 'color: #FF9800')
  try {
    console.log('%c1. Валидация формы', 'color: #9C27B0')
    if (!validateForm()) {
      console.warn('%cВалидация провалена', 'color: #F44336', formError.value)
      return
    }
    console.log('%c✓ Валидация успешна', 'color: #4CAF50')

    console.log('%c2. Подготовка данных', 'color: #3F51B5', {
      originalData: originalTask.value,
      editedData: editedTask.value
    })

    isSubmitting.value = true
    errorMessage.value = ''

    console.log('%c3. Отправка запроса', 'color: #009688')
    const response = await editTask({
      token: userInfo.value.token,
      id: editedTask.value._id || route.params.id,
      task: {
        ...editedTask.value,
        date: dayjs(editedTask.value.date).toISOString()
      }
    }).catch(error => {
      console.error('%c3a. Ошибка запроса', 'color: #F44336', error)
      throw error
    })

    console.log('%c4. Обработка ответа', 'color: #FF5722', response)

    if (!response?._id) {
      console.error('%c4a. Некорректный ответ', 'color: #F44336', response)
      throw new Error('Invalid server response format')
    }

    console.log('%c5. Обновление локальных данных', 'color: #795548')
    const taskIndex = tasks.value.findIndex(t => t._id === response._id)

    if (taskIndex === -1) {
      console.warn('%c5a. Новая задача', 'color: #FF9800')
      tasks.value.push(response)
    } else {
      console.log('%c5b. Обновление существующей', 'color: #4CAF50')
      tasks.value.splice(taskIndex, 1, response)
    }

    console.log('%c6. Валидация реактивности', 'color: #E91E63', {
      tasks: tasks.value.length,
      updatedTask: tasks.value[taskIndex]
    })

    closeModal()
  } catch (error) {
    console.error('%c7. Обработка ошибки', 'color: #F44336', error)
    errorMessage.value = error.message
  } finally {
    console.log('%c8. Финализация процесса', 'color: #9E9E9E')
    isSubmitting.value = false
    console.groupEnd()
  }
}

// Закрытие модального окна
const closeModal = () => {
  isModalOpen.value = false
  router.push('/')
}

// Отмена изменений
const cancelEditing = () => {
  Object.assign(editedTask.value, originalTask.value)
  isEditing.value = false
}

// Удаление задачи
const handleDelete = async () => {
  try {
    if (!confirm('Вы точно хотите удалить задачу?')) return

    isDeleting.value = true // Блокируем кнопку
    errorMessage.value = ''

    await deleteTask({
      token: userInfo.value.token,
      id: route.params.id,
    })

    const taskIndex = tasks.value.findIndex((t) => t._id === route.params.id)
    if (taskIndex !== -1) {
      tasks.value.splice(taskIndex, 1)
    }

    closeModal()
  } catch (error) {
    errorMessage.value = error.response?.data?.error || error.message || 'Ошибка удаления'
    if (error.response?.status === 401) {
      router.push('/login')
    }
  } finally {
    isDeleting.value = false // Разблокируем кнопку
  }
}

// Вычисляемые свойства для стилей
const topicClass = computed(() => {
  return TopicColor(task.value.topic)
})

function TopicColor(topic) {
  if (topic === 'Web Design') {
    return '_orange'
  } else if (topic === 'Research') {
    return '_green'
  } else if (topic === 'Copywriting') {
    return '_purple'
  } else {
    return '_gray'
  }
}

// Статусы
const statusOptions = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

// Классы для статусов
function statusClass(status) {
  return task.value.status === status ? '_gray' : '_hide'
}

function statusTextClass(status) {
  return task.value.status === status ? '_gray' : ''
}

// Обработчики изменений полей
const handleStatusChange = (newStatus) => {
  editedTask.value.status = newStatus
  formError.value = '' // Сбрасываем ошибку при выборе статуса
}

const handleDateSelect = (date) => {
  editedTask.value.date = date
  formError.value = '' // Сбрасываем ошибку при выборе
}
watch(editedTask, () => {
  validateForm()
}, { deep: true })
</script>

<style lang="scss" scoped>
.pop-browse__container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  z-index: 7;
}
.pop-browse__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 38px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-browse__content {
  display: block;
  text-align: left;
}
.pop-browse__content .categories__theme {
  opacity: 1;
}
.pop-browse__content .theme-down {
  display: none;
  margin-bottom: 20px;
}
.pop-browse__content .theme-top {
  display: block;
}
.pop-browse__top-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}
.pop-browse__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}
.pop-browse__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}
.pop-browse__btn-browse,
.pop-browse__btn-edit {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
}
.pop-browse__btn-browse button,
.pop-browse__btn-edit button {
  height: 30px;
  margin-bottom: 10px;
  padding: 0 14px;
}
.pop-browse__btn-browse .btn-group button,
.pop-browse__btn-edit .btn-group button {
  margin-right: 8px;
}
.status__theme {
  &._selected {
    background-color: #94a6be;
    color: #fff;
    p {
      color: #fff;
    }
  }

  &:hover {
    background-color: rgba(94, 166, 190, 0.8);
  }
}
.loader-small {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;
}
</style>
