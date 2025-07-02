<template>
  <div v-if="isModalOpen" class="pop-new-card__container">
    <div class="pop-new-card__block">
      <div class="pop-new-card__content">
        <h3 class="pop-new-card__ttl">Создание задачи</h3>
        <button @click="closeModal" class="close-btn">×</button>
        <div class="pop-new-card__wrap">
          <form class="pop-new-card__form form-new" @submit.prevent="handleSubmit">
            <!-- Поле названия -->
            <div class="form-new__block">
              <label for="formTitle" class="subttl">Название задачи</label>
              <input
                id="formTitle"
                v-model.trim="formData.title"
                class="form-new__input"
                type="text"
                placeholder="Введите название задачи..."
                maxlength="50"
                @input="validateTitle"
              />
              <div class="form-new__counter">
                <span v-if="titleError" class="error-message">{{ titleError }}</span>
                <span>{{ formData.title.length }}/50</span>
              </div>
            </div>

            <!-- Поле описания -->
            <div class="form-new__block">
              <label for="textArea" class="subttl">Описание задачи</label>
              <textarea
                id="textArea"
                v-model.trim="formData.description"
                class="form-new__area"
                placeholder="Введите описание задачи..."
                maxlength="500"
                @input="validateDescription"
              ></textarea>
              <div class="form-new__counter">{{ formData.description.length }}/500</div>
            </div>
          </form>

          <!-- Календарь и категории -->
          <CalendarComponent @date-selected="handleDateSelect" />
        </div>

        <div class="pop-new-card__categories categories">
          <p class="categories__p subttl">Категория</p>
          <div class="categories__themes">
            <div
              v-for="category in categories"
              :key="category.id"
              class="categories__theme"
              :class="[
                `_${category.color}`,
                { '_active-category': selectedCategory === category.id },
              ]"
              @click="selectCategory(category.id)"
            >
              <p :class="`_${category.color}`">{{ category.name }}</p>
            </div>
          </div>
        </div>
        <!-- Кнопка отправки -->
        <button
          type="submit"
          class="form-new__create _hover01"
          :disabled="!isFormValid || isSubmitting"
          @click.prevent="handleSubmit"
        >
          {{ isSubmitting ? 'Создание...' : 'Создать задачу' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import CalendarComponent from './CalendarComponent.vue'
import dayjs from 'dayjs'
import utc from 'dayjs-plugin-utc'
import router from '../router'
import { postTask } from '../servises/api'

const isModalOpen = ref(true)
dayjs.extend(utc)

const { userInfo } = inject('auth')
const { tasks } = inject('tasksData')

// Обработчики событий
const handleDateSelect = (date) => {
  formData.value.dueDate = dayjs(date)
}

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

const token = computed(() => userInfo.value?.token)

// Состояния компонента
const formData = ref({
  title: '',
  description: '',
  dueDate: null,
})
const titleError = ref('')
const dateError = ref('')
const isSubmitting = ref(false)
const selectedCategory = ref(null)

const categories = ref([
  { id: 1, name: 'Web Design', color: 'orange' },
  { id: 2, name: 'Research', color: 'green' },
  { id: 3, name: 'Copywriting', color: 'purple' },
])

const validateTitle = () => {
  if (formData.value.title.length > 50) {
    formData.value.title = formData.value.title.slice(0, 50)
  }
  titleError.value =
    formData.value.title.trim().length < 3 ? 'Название должно быть не короче 3 символов' : ''
}

const validateDescription = () => {
  if (formData.value.description.length > 500) {
    formData.value.description = formData.value.description.slice(0, 500)
  }
}

const isFormValid = computed(() => {
  return formData.value.title.trim().length >= 3 &&
    selectedCategory.value !== null &&
    formData.value.dueDate !== null
})

const closeModal = () => {
  isModalOpen.value = false
  router.push('/')
}

async function handleSubmit() {
  let originalTasks = []
// Сбрасываем ошибки
  titleError.value = ''
  dateError.value = ''

  // Валидация полей
  if (formData.value.title.trim().length < 3) {
    titleError.value = 'Название должно быть не короче 3 символов'
    return
  }

  if (!formData.value.dueDate) {
    dateError.value = 'Укажите срок выполнения задачи'
    return
  }
  try {
    if (!isFormValid.value || isSubmitting.value) return
    isSubmitting.value = true

    const tempId = Date.now().toString()

    // Оптимистичное обновление с временным _id
    tasks.value.push({
      _id: tempId,
      id: tempId,
      title: formData.value.title.trim(),
      topic: categories.value.find(c => c.id === selectedCategory.value)?.name || 'Без категории',
      status: 'Без статуса',
      description: formData.value.description.trim(),
      date: formData.value.dueDate ? dayjs.utc(formData.value.dueDate).toISOString() : null,
      isOptimistic: true
    })

    // Глубокое копирование через JSON
    originalTasks = JSON.parse(JSON.stringify(tasks.value))

    const requestData = {
      title: formData.value.title.trim(),
      topic: categories.value.find(c => c.id === selectedCategory.value)?.name || 'Без категории',
      status: 'Без статуса',
      description: formData.value.description.trim(),
      date: formData.value.dueDate ? dayjs.utc(formData.value.dueDate).toISOString() : null,
    }

    const response = await postTask({
      token: token.value,
      task: requestData,
    })

    if (response?.data?._id) {
      const index = tasks.value.findIndex(t => t._id === tempId)
      if (index !== -1) {
        tasks.value.splice(index, 1, {
          ...response.data,
          isOptimistic: undefined
        })
      }
    }

    formData.value = { title: '', description: '', dueDate: null }
    selectedCategory.value = null
    closeModal()

  } catch (error) {
    if (originalTasks.length > 0) {
      tasks.value = originalTasks
    }

    const errorMessage = error.response?.data?.message ||
                        error.message ||
                        'Ошибка при создании задачи'
    console.error('Error:', errorMessage)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.pop-new-card__container {
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
  z-index: 6;
}
.pop-new-card__block {
  display: block;
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 630px;
  width: 100%;
  padding: 40px 30px 48px;
  border-radius: 10px;
  border: 0.7px solid #d4dbe5;
  position: relative;
}
.pop-new-card__content {
  display: block;
  text-align: left;
}
.pop-new-card__ttl {
  color: #000;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 20px;
}
.pop-new-card__close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: #94a6be;
  cursor: pointer;
}
.pop-new-card__close:hover {
  color: #000000;
}
.pop-new-card__wrap {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;
}

.pop-new-card__form {
  max-width: 370px;
  width: 100%;
  display: block;
  margin-bottom: 20px;
}

.form-new__block {
  display: flex;
  flex-direction: column;
}
.form-new__input,
.form-new__area {
  width: 100%;
  outline: none;
  padding: 14px;
  background: transparent;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  border-radius: 8px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.14px;
}
.form-new__input::-moz-placeholder,
.form-new__area::-moz-placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.form-new__input::placeholder,
.form-new__area::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 1px;
  color: #94a6be;
  letter-spacing: -0.14px;
}
.form-new__input {
  margin: 20px 0;
}
.form-new__area {
  max-width: 370px;
  margin-top: 14px;
  height: 200px;
}
.form-new__create {
  width: 132px;
  height: 30px;
  background-color: #565eef;
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #ffffff;
  float: right;
}

//Категории

.categories__theme {
  opacity: 0.5;
  transition: all 0.25s ease;
  cursor: pointer;
  position: relative;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &._active-category {
    opacity: 1;
    transform: scale(1.05);
  }

  &:hover:not(._active-category) {
    opacity: 0.75;
    transform: translateY(-2px);
  }

  & p {
    transition: inherit;
    pointer-events: none;
    text-align: center;
  }

  // Цветовые модификаторы
  &._orange {
    color: #ff6d00;
  }
  &._green {
    color: #0ac10a;
  }
  &._purple {
    color: #9a48f1;
  }
}

.form-new__counter {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
}

.error-message {
  color: #ff4444;
  font-size: 12px;
}

.form-new__input:invalid,
.form-new__area:invalid {
  border-color: #ff4444;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
}
</style>
