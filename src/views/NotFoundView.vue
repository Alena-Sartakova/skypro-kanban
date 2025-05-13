<template>
  <div class="not-found">
    <div class="content">
      <h1 class="error-code">404</h1>

      <div class="error-message">
        <span class="en">Page Not Found</span>
        <span class="ru">Страница не найдена</span>
      </div>


      <router-link to="/" class="home-button"> Вернуться на главную </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  background: #0a192f;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.content {
  text-align: center;
  z-index: 1;
  padding: 2rem;
}
.error-code {
  font-size: 15rem;
  margin: 0;
  color: #64ffda;
  text-shadow: 0 0 20px rgba(100, 255, 218, 0.4);
  animation: float 3s ease-in-out infinite;
}

.error-message {
  margin: 2rem 0;
  color: #ccd6f6;
}
.en {
  display: block;
  font-size: 2.5rem;
  letter-spacing: 2px;
}

.ru {
  display: block;
  font-size: 1.8rem;
  opacity: 0.8;
}

.waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  animation: wave 8s linear infinite;
}
.home-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #64ffda, #00b4d8);
  color: #0a192f;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  margin-top: 2rem;
}

.home-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(100, 255, 218, 0.3);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes wave {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
