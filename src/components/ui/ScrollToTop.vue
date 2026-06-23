<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition>
    <button
      v-show="isVisible"
      class="scroll-to-top"
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      <ArrowUp class="icon" />
    </button>
  </Transition>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  background-color: #f39c12; /* Orange background */
  border: 4px solid #e0e0e0; /* Thick light border */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.scroll-to-top:hover {
  background-color: #e67e22;
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.icon {
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  stroke-width: 3;
}

/* Simple fade transition if v-show triggers it */
button.v-enter-active,
button.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

button.v-enter-from,
button.v-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
