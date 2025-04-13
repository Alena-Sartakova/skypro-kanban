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
      <Transition name="show">
        <div v-if="loading">Идёт загрузка...</div>
        <TaskDesk v-else :loading="loading" />
      </Transition>
    </div>
  </main>
</template>
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

<style lang="scss" scoped>
.show-enter-active,
.show-leave-active {
  transition: opacity 1s ease;
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
}
</style>
