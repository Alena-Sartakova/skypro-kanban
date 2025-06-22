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
                  v-model="editedTask.description"
                  placeholder="Введите описание..."
                ></textarea>
              </div>
            </form>

            <!-- Даты  -->
            <div class="pop-new-card__calendar calendar">
              <p class="calendar__ttl subttl">Даты</p>
              <div class="calendar__block">
                <div class="calendar__nav">
                  <div class="calendar__month">Сентябрь 2023</div>
                  <div class="nav__actions">
                    <div class="nav__action" data-action="prev">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                      >
                        <path
                          d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
                        />
                      </svg>
                    </div>
                    <div class="nav__action" data-action="next">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="11"
                        viewBox="0 0 6 11"
                      >
                        <path
                          d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="calendar__content">
                  <div class="calendar__days-names">
                    <div class="calendar__day-name">пн</div>
                    <div class="calendar__day-name">вт</div>
                    <div class="calendar__day-name">ср</div>
                    <div class="calendar__day-name">чт</div>
                    <div class="calendar__day-name">пт</div>
                    <div class="calendar__day-name -weekend-">сб</div>
                    <div class="calendar__day-name -weekend-">вс</div>
                  </div>
                  <div class="calendar__cells">
                    <div class="calendar__cell _other-month">28</div>
                    <div class="calendar__cell _other-month">29</div>
                    <div class="calendar__cell _other-month">30</div>
                    <div class="calendar__cell _cell-day">31</div>
                    <div class="calendar__cell _cell-day">1</div>
                    <div class="calendar__cell _cell-day _weekend">2</div>
                    <div class="calendar__cell _cell-day _weekend">3</div>
                    <div class="calendar__cell _cell-day">4</div>
                    <div class="calendar__cell _cell-day">5</div>
                    <div class="calendar__cell _cell-day">6</div>
                    <div class="calendar__cell _cell-day">7</div>
                    <div class="calendar__cell _cell-day _current">8</div>
                    <div class="calendar__cell _cell-day _weekend _active-day">9</div>
                    <div class="calendar__cell _cell-day _weekend">10</div>
                    <div class="calendar__cell _cell-day">11</div>
                    <div class="calendar__cell _cell-day">12</div>
                    <div class="calendar__cell _cell-day">13</div>
                    <div class="calendar__cell _cell-day">14</div>
                    <div class="calendar__cell _cell-day">15</div>
                    <div class="calendar__cell _cell-day _weekend">16</div>
                    <div class="calendar__cell _cell-day _weekend">17</div>
                    <div class="calendar__cell _cell-day">18</div>
                    <div class="calendar__cell _cell-day">19</div>
                    <div class="calendar__cell _cell-day">20</div>
                    <div class="calendar__cell _cell-day">21</div>
                    <div class="calendar__cell _cell-day">22</div>
                    <div class="calendar__cell _cell-day _weekend">23</div>
                    <div class="calendar__cell _cell-day _weekend">24</div>
                    <div class="calendar__cell _cell-day">25</div>
                    <div class="calendar__cell _cell-day">26</div>
                    <div class="calendar__cell _cell-day">27</div>
                    <div class="calendar__cell _cell-day">28</div>
                    <div class="calendar__cell _cell-day">29</div>
                    <div class="calendar__cell _cell-day _weekend">30</div>
                    <div class="calendar__cell _other-month _weekend">1</div>
                  </div>
                </div>

                <input type="hidden" id="datepick_value" value="08.09.2023" />
                <div class="calendar__period">
                  <p class="calendar__p date-end">
                    Срок исполнения: <span class="date-control">09.09.23</span>
                  </p>
                </div>
              </div>
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
              <button class="btn-save _btn-bg _hover01" @click="saveChanges">Сохранить</button>
              <button class="btn-cancel _btn-bg _hover01" @click="cancelEditing">Отменить</button>
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

const route = useRoute()
const { tasks, updateTask } = inject('tasksData')
const { userInfo } = inject('auth')

const taskId = route.params.id
const isEditing = ref(false)
const originalTask = ref({})
const editedTask = ref({
  title: '',
  description: '',
  status: '',
  topic: '',
  deadline: '',
})

// Находим текущую задачу по ID из URL
const task = computed(() => {
  const foundTask = tasks.value.find((task) => task._id === route.params.id)
  console.log('Загруженная задача:', foundTask)
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

// Определяем класс для каждого статуса
function statusClass(status) {
  return task.value.status === status ? '_gray' : '_hide'
}

// Определяем класс текста для каждого статуса
function statusTextClass(status) {
  return task.value.status === status ? '_gray' : ''
}

// Статусы
const statusOptions = ['Без статуса', 'Нужно сделать', 'В работе', 'Тестирование', 'Готово']

// Начало редактирования
const startEditing = () => {
  originalTask.value = { ...task.value }
  editedTask.value = { ...task.value }
  isEditing.value = true
}

// Изменение статуса
const handleStatusChange = (newStatus) => {
  if (isEditing.value) {
    editedTask.value.status = newStatus
  }
}

// Сохранение изменений
const saveChanges = async () => {
  try {
    await updateTask(taskId, editedTask.value)
    isEditing.value = false
  } catch (error) {
    console.error('Ошибка сохранения:', error)
  }
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
