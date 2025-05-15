<template>
  <div >
    <div class="pop-browse__container">
      <div class="pop-browse__block">
        <div class="pop-browse__content">
          <div class="pop-browse__top-block">
            <h3 class="pop-browse__ttl">{{ task.title }}</h3>
            <div class="categories__theme theme-top _orange _active-category">
              <p >{{ task.topic }}</p>
            </div>
          </div>
          <div class="pop-browse__status status">
            <p class="status__p subttl">{{ task.status }}</p>
            <div class="status__themes">
              <div class="status__theme _hide">
                <p>Без статуса</p>
              </div>
              <div class="status__theme _gray">
                <p class="_gray">Нужно сделать</p>
              </div>
              <div class="status__theme _hide">
                <p>В работе</p>
              </div>
              <div class="status__theme _hide">
                <p>Тестирование</p>
              </div>
              <div class="status__theme _hide">
                <p>Готово</p>
              </div>
            </div>
          </div>
          <div class="pop-browse__wrap">
            <form class="pop-browse__form form-browse" id="formBrowseCard" action="#">
              <div class="form-browse__block">
                <label for="textArea01" class="subttl">Описание задачи</label>
                <textarea
                  class="form-browse__area"
                  name="text"
                  id="textArea01"
                  readonly
                  placeholder="Введите описание задачи..."
                ></textarea>
              </div>
            </form>
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
          <div class="theme-down__categories theme-down">
            <p class="categories__p subttl">Категория</p>
            <div class="categories__theme _orange _active-category">
              <p class="_orange">Web Design</p>
            </div>
          </div>
          <div class="pop-browse__btn-browse">
            <div class="btn-group">
              <button class="btn-browse__edit _btn-bor _hover03">
                <a href="#">Редактировать задачу</a>
              </button>
              <button class="btn-browse__delete _btn-bor _hover03">
                <a href="#">Удалить задачу</a>
              </button>
            </div>

          </div>
          <div class="pop-browse__btn-edit _hide">
<!--             <div class="btn-group">
              <button class="btn-edit__edit _btn-bg _hover01"><a href="#">Сохранить</a></button>
              <button class="btn-edit__edit _btn-bor _hover03"><a href="#">Отменить</a></button>
              <button class="btn-edit__delete _btn-bor _hover03" id="btnDelete">
                <a href="#">Удалить задачу</a>
              </button>
            </div> -->
            <button class="btn-edit__close _btn-bg _hover01">
             <RouterLink to="/">Закрыть</RouterLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTasks } from '@/mokcs/tasks';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const tasks = ref(getTasks());

const route = useRoute();
/* console.log(route.params.id);
console.log(tasks.value) */
const task = computed(() => {
   return tasks.value.find((w) => w.id === Number(route.params.id)) || {
    topic: "",
    title: "",
    date: "",
    status: "",
   }
});
/* console.log(task.value) */

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
</style>
