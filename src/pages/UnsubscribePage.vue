<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { unsubscribeNewsletter } from '@/services/contact'

const route = useRoute()
const email = ref('')
const status = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')
const errorMessage = ref('')

onMounted(() => {
  const e = route.query.email
  if (typeof e === 'string') email.value = e
})

async function submit(e: Event) {
  e.preventDefault()
  if (!email.value.trim()) return
  status.value = 'sending'
  const result = await unsubscribeNewsletter(email.value.trim())
  if (result.success) {
    status.value = 'ok'
  } else {
    status.value = 'error'
    errorMessage.value = result.error ?? 'Something went wrong.'
  }
}
</script>

<template>
  <section class="container unsub">
    <div class="unsub-card">
      <h1 class="section-title">Unsubscribe</h1>

      <template v-if="status === 'ok'">
        <p class="unsub-msg ok">
          You've been unsubscribed. We're sorry to see you go - you can resubscribe
          anytime from our blog.
        </p>
        <RouterLink to="/blog" class="btn-primary">Back to the blog <span class="arrow">→</span></RouterLink>
      </template>

      <template v-else>
        <p class="unsub-lede">
          Enter your email to stop receiving our newsletter. You can resubscribe whenever
          you like.
        </p>
        <form @submit="submit" class="unsub-form">
          <label class="field">
            <span>Email address</span>
            <input v-model="email" type="email" placeholder="you@company.com" required :disabled="status === 'sending'" />
          </label>
          <p v-if="status === 'error'" class="unsub-msg error">{{ errorMessage }}</p>
          <button type="submit" class="btn-primary" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Processing…' : 'Unsubscribe' }}
            <span class="arrow">→</span>
          </button>
        </form>
      </template>
    </div>
  </section>
</template>

<style scoped>
@import '@/styles/service-page.css';

.unsub {
  padding: 160px 32px 120px;
  display: flex;
  justify-content: center;
}
.unsub-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 56px 48px;
  max-width: 520px;
  width: 100%;
  text-align: center;
}
.unsub-card .tag { margin-bottom: 16px; }
.unsub-card .section-title { margin-bottom: 16px; }
.unsub-lede {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 28px;
}
.unsub-form { display: flex; flex-direction: column; gap: 16px; text-align: left; }
.field { display: flex; flex-direction: column; gap: 8px; }
.field span {
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-muted);
  font-weight: 500;
}
.field input {
  font-family: var(--sans);
  font-size: 15px;
  padding: 13px 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg);
  outline: none;
}
.field input:focus { border-color: var(--accent); }
.unsub-form .btn-primary { justify-content: center; }
.unsub-msg { font-size: 14px; line-height: 1.6; }
.unsub-msg.ok { color: var(--ink-soft); margin-bottom: 24px; }
.unsub-msg.error { color: #b54234; }

@media (max-width: 640px) {
  .unsub { padding-top: 120px; }
  .unsub-card { padding: 40px 28px; }
}
</style>
