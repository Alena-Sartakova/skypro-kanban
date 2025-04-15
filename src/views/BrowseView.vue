<template>
  <div>
<BrowseModal />
  </div>
</template>

<script setup>
import BrowseModal from '@/components/BrowseModal.vue';
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const task = computed(() => {
   return tasks.value.find((t) => t.id === route.params.id) || {
    topic: "",
    title: "",
    date: "",
    status: "",
   }
})



</script>

<style lang="scss" scoped>

</style>
