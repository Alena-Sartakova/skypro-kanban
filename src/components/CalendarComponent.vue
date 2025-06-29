<template>
  <div class="pop-new-card__calendar calendar" :class="{ 'calendar--readonly': readonly }">
    <p class="calendar__ttl subttl">Даты</p>
    <div class="calendar__block">
      <div class="calendar__nav">
        <div class="calendar__month">{{ currentMonthFormatted }}</div>
        <div class="nav__actions">
          <div
            class="nav__action"
            data-action="prev"
            @click="!readonly && prevMonth()"
            :class="{ _disabled: readonly }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path
                d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"
              />
            </svg>
          </div>
          <div
            class="nav__action"
            data-action="next"
            @click="!readonly && nextMonth()"
            :class="{ _disabled: readonly }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="11" viewBox="0 0 6 11">
              <path
                d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="calendar__content">
        <div class="calendar__days-names">
          <div v-for="day in dayNames" :key="day" class="calendar__day-name">
            {{ day }}
          </div>
        </div>

        <div class="calendar__cells">
          <div
            v-for="(day, index) in calendarDays"
            :key="index"
            class="calendar__cell"
            :class="getCellClasses(day)"
            @click="!readonly && selectDate(day)"
          >
            {{ day.date ? day.date.date() : '' }}
          </div>
        </div>
      </div>

      <div class="calendar__period">
        <p class="calendar__p date-end">
          {{ selectedDate ? 'Срок исполнения:' : 'Выберите срок исполнения' }}
          <span v-if="selectedDate" class="date-control">
            {{ selectedDateFormatted }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  date: {
    type: [Date, String],
    default: null,
  },
})
dayjs.locale('ru')

const currentMonth = ref(dayjs())
const selectedDate = ref(null)

const dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

const calendarDays = computed(() => {
  const start = currentMonth.value.startOf('month').startOf('week')
  const end = currentMonth.value.endOf('month').endOf('week')
  const days = []
  let day = start

  while (day <= end) {
    days.push({
      date: day,
      isCurrentMonth: day.month() === currentMonth.value.month(),
      isToday: day.isSame(dayjs(), 'day'),
      isWeekend: day.day() === 6 || day.day() === 0,
    })
    day = day.add(1, 'day')
  }

  return days
})

const getCellClasses = (day) => ({
  '_other-month': !day.isCurrentMonth,
  '_cell-day': day.isCurrentMonth,
  _current: day.isToday,
  _selected: selectedDate.value && day.date.isSame(selectedDate.value, 'day'),
})

const currentMonthFormatted = computed(() => currentMonth.value.format('MMMM YYYY'))
// Блокировка взаимодействия
const selectDate = (day) => {
  if (props.readonly) return
  selectedDate.value = day.date
  emit('date-selected', day.date)
}

const prevMonth = () => {
  if (props.readonly) return
  currentMonth.value = currentMonth.value.subtract(1, 'month')
}

const nextMonth = () => {
  if (props.readonly) return
  currentMonth.value = currentMonth.value.add(1, 'month')
}

// Форматирование даты
const selectedDateFormatted = computed(() =>
  selectedDate.value ? selectedDate.value.format('DD.MM.YYYY') : '',
)

// Инициализация выбранной даты
watch(
  () => props.date,
  (newDate) => {
    if (newDate) {
      selectedDate.value = dayjs(newDate)
      currentMonth.value = dayjs(newDate).startOf('month')
    }
  },
  { immediate: true },
)

const emit = defineEmits(['date-selected'])
</script>

<style lang="scss" scoped>
// Календарь

.calendar__cells {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar__cell {
  text-align: center;
  cursor: pointer;

  transition: all 0.2s ease;
}

._other-month {
  opacity: 0.5;
}

._current {
  background: #fff3e0;
  font-weight: bold;
}

.date-control {
  font-weight: 600;
  margin-left: 5px;
}
.calendar--readonly {
  opacity: 0.7;
  pointer-events: none;
}

.nav__action._disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.calendar__cell {
  cursor: pointer;
}

.calendar--readonly .calendar__cell {
  cursor: default;
}

@media (max-width: 768px) {
  .calendar__cell {
    padding: 8px;
    font-size: 13px;
  }

  .calendar__days-names {
    display: none;
  }

  .calendar__month {
    font-size: 16px;
  }

  .nav__action svg {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .calendar__cell {
    padding: 4px;
    font-size: 12px;
    min-width: 24px;
  }

  .calendar__nav {
    flex-direction: column;
    gap: 8px;
  }

  .calendar__period {
    font-size: 14px;
  }
}
._selected {
  color: #000000;
  font-weight: bold;
}
</style>
