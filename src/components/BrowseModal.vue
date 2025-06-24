<template>
  <div>
    <div class="pop-browse__container">
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
            <CalendarComponent />
          </div>
        </div>

        <!-- Панель управления -->
        <div class="pop-browse__btn-edit">
          <div class="btn-group">
            <button v-if="!isEditing" class="btn-edit _btn-bor _hover03" @click="startEditing">
              Редактировать задачу
            </button>

            <div v-else class="edit-controls">
              <button class="btn-save _btn-bg _hover01" @click="saveChanges">Сохранить</button>
              <button class="btn-cancel _btn-bg _hover01" @click="cancelEditing">Отменить</button>
            </div>
            <!-- Отображение сообщения об ошибке -->
            <div v-if="errorMessage" class="error-message">
              <p>{{ errorMessage }}</p>
            </div>
            <button class="btn-browse__delete _btn-bor _hover03">
              <a href="#">Удалить задачу</a>
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
import { computed, inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import { editTask } from '../servises/api'
import router from '../router'
import CalendarComponent from './CalendarComponent.vue'

const route = useRoute()
const { tasks } = inject('tasksData')
const { userInfo } = inject('auth')

const isEditing = ref(false)
const originalTask = ref({})
const editedTask = ref({
  title: '',
  description: '',
  status: '',
  topic: '',
})
const errorMessage = ref('')

// Находим текущую задачу по ID из URL
const task = computed(() => {
  const foundTask = tasks.value.find((task) => task._id === route.params.id) || {
    title: '',
    description: '',
    status: '',
    topic: '',
  }
  /*  console.log('Загруженная задача:', foundTask) */
  return foundTask
})

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

// Определяем класс для каждого статуса
function statusClass(status) {
  return task.value.status === status ? '_gray' : '_hide'
}

// Определяем класс текста для каждого статуса
function statusTextClass(status) {
  return task.value.status === status ? '_gray' : ''
}

// Начало редактирования
const startEditing = () => {
  console.log(task.value)
  originalTask.value = { ...task.value }
  editedTask.value = {
    _id: task.value._id,
    title: task.value.title,
    description: task.value.description,
    status: task.value.status,
    topic: task.value.topic,
  }
  isEditing.value = true
}

// Изменение статуса
const handleStatusChange = (newStatus) => {
  if (isEditing.value) {
    editedTask.value.status = newStatus
  }
}

const saveChanges = async () => {
  try {
    const updatedTask = await editTask({
      token: userInfo.value.token,
      id: route.params.id,
      task: editedTask.value,
    })

    // Обновление списка задач
    tasks.value = updatedTask
    closeModal()
  } catch (error) {
    if (error.response) {
      errorMessage.value = error.response.data.message || error.response.statusText
    } else {
      errorMessage.value = error.message || 'Произошла ошибка при сохранении'
    }
  }
}

const closeModal = () => {
  router.push('/')
}

// Отмена изменений
const cancelEditing = () => {
  Object.assign(editedTask.value, originalTask.value)
  isEditing.value = false
}
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
</style>
