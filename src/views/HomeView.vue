<script setup>
import BaseHeader from '@/components/BaseHeader.vue'
import BrowseModal from '@/components/BrowseModal.vue'
import ExitModal from '@/components/ExitModal.vue'
import NewCardModal from '@/components/NewCardModal.vue'
import TaskDesk from '@/components/TaskDesk.vue'
import { onMounted, ref } from 'vue'

const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>

<template>
  <main>
    <div class="wrapper">
      <!-- pop-up start-->

      <div class="pop-exit" id="popExit">
        <ExitModal />
      </div>

      <div class="pop-new-card" id="popNewCard">
        <NewCardModal />
      </div>

      <div class="pop-browse" id="popBrowse">
        <BrowseModal />
      </div>

      <!-- pop-up end-->
      <BaseHeader />
      <Transition name="loading">
      <div v-if="loading">Идёт загрузка...</div>
      <TaskDesk v-else :loading="loading" />
    </Transition>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
