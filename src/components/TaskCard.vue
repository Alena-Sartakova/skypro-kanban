<template>
  <div class="cards">
    <div class="cards__item">
      <div class="cards__card card">
        <div class="card__group">
          <div :class="['card__theme']">
            <p :class="TopicColor(topic)">{{ topic }}</p>
          </div>
          <a href="#popBrowse" target="_self">
            <div class="card__btn">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </a>
        </div>
        <div class="card__content">
          <a href="" target="_blank">
            <h3 class="card__title">{{ title }}</h3>
          </a>
          <div class="card__date">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <g clip-path="url(#clip0_1_415)">
                <path
                  d="M10.5625 2.03125H2.4375C1.7644 2.03125 1.21875 2.5769 1.21875 3.25V10.5625C1.21875 11.2356 1.7644 11.7812 2.4375 11.7812H10.5625C11.2356 11.7812 11.7812 11.2356 11.7812 10.5625V3.25C11.7812 2.5769 11.2356 2.03125 10.5625 2.03125Z"
                  stroke="#94A6BE"
                  stroke-width="0.8"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.7812 4.0625H1.21875M3.25 1.21875V2.03125V1.21875ZM9.75 1.21875V2.03125V1.21875Z"
                  stroke="#94A6BE"
                  stroke-width="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_415">
                  <rect width="13" height="13" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p>{{ date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  topic: { type: String, require: true },
  title: { type: String, require: true },
  date: { type: String, require: true },
  status: { type: String, require: true },
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
</script>

<style lang="scss" scoped>
.cards {
  width: 100%;
  display: block;
  position: relative;
}
.cards__item {
  padding: 5px;
  animation-name: card-animation;
  animation-duration: 500ms;
  animation-timing-function: linear;
}
.cards__card {
  width: 220px;
  height: 130px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;
  padding: 15px 13px 19px;
}

.card__group {
  width: 100%;
  height: 20px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card__theme {
  width: auto;
  height: 20px;
  padding: 5px 14px;
  border-radius: 18px;
}

.card__btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 2px;
}
.card__btn div {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #94a6be;
}
.card__title {
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000000;
  margin-bottom: 10px;
}
.card__content {
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.card__date {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.card__date svg {
  width: 13px;
}
.card__date p {
  margin-left: 6px;
  font-size: 10px;
  line-height: 13px;
  color: #94a6be;
  letter-spacing: 0.2px;
}
</style>
