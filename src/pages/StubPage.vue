<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const title = computed(() => (route.meta?.title as string | undefined) ?? 'Page')
const cluster = computed(() => (route.meta?.cluster as string | undefined) ?? null)
</script>

<template>
  <section class="stub container">
    <h1 class="section-title">{{ title }} <em>- coming soon</em></h1>
    <p class="lede">
      This page is part of the full Jackson &amp; Frank site clone and will be ported next.
      The data already lives in <code>src/data/</code>; only the layout still needs to be built.
    </p>
    <div class="cta-row">
      <RouterLink class="btn-primary" to="/">Back to home <span class="arrow">→</span></RouterLink>
      <RouterLink class="btn-secondary" to="/contact">Talk to our team</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.stub {
  padding: 120px 0 160px;
  max-width: 800px;
}
.lede {
  margin-top: 24px;
  font-size: 17px;
  color: var(--ink-soft);
  line-height: 1.55;
}
code {
  background: var(--accent-soft);
  color: var(--accent);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 14px;
}
.cta-row {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  flex-wrap: wrap;
}
</style>
