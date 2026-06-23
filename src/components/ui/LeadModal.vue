<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { submitContactForm } from '@/services/contact'

const props = defineProps<{
  open: boolean
  /** Heading shown in the modal */
  title?: string
  /** Supporting line under the heading */
  subtitle?: string
  /** Pre-filled reason for the contact API */
  reason?: string
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  message: '',
})
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMessage = ref('')

// Lock body scroll + reset state when opening
watch(
  () => props.open,
  (isOpen) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : ''
    }
    if (isOpen) {
      status.value = 'idle'
      errorMessage.value = ''
    }
  }
)

function close() {
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

async function submit(e: Event) {
  e.preventDefault()
  if (!form.firstName || !form.email) {
    status.value = 'error'
    errorMessage.value = 'Please enter your name and email.'
    return
  }
  status.value = 'sending'
  const result = await submitContactForm({
    first_name: form.firstName,
    last_name: form.lastName,
    work_email: form.email,
    phone_number: '',
    company_name: form.company,
    help_reason: props.reason ?? 'general_inquiry',
    message: form.message || 'Requested via blog CTA.',
  })
  if (result.success) {
    status.value = 'success'
    Object.assign(form, { firstName: '', lastName: '', email: '', company: '', message: '' })
  } else {
    status.value = 'error'
    errorMessage.value = result.error ?? 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="lead-fade">
      <div
        v-if="open"
        class="lead-overlay"
        @click.self="close"
        @keydown="onKeydown"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div class="lead-modal">
          <button class="lead-close" @click="close" aria-label="Close">×</button>

          <div v-if="status === 'success'" class="lead-success">
            <span class="lead-success-icon" aria-hidden>✓</span>
            <h3>Thank you!</h3>
            <p>We've received your details and will be in touch within 24 hours.</p>
            <button class="btn-primary" @click="close">Close</button>
          </div>

          <template v-else>
            <span class="tag">{{ reason === 'careers' ? 'Join us' : 'Get in touch' }}</span>
            <h3>{{ title ?? 'Talk to our team' }}</h3>
            <p class="lead-sub">
              {{ subtitle ?? 'Tell us a little about your needs and we’ll get back to you within 24 hours.' }}
            </p>

            <form @submit="submit" class="lead-form">
              <div class="lead-row">
                <label class="field">
                  <span>First name *</span>
                  <input v-model="form.firstName" type="text" placeholder="Jane" required />
                </label>
                <label class="field">
                  <span>Last name</span>
                  <input v-model="form.lastName" type="text" placeholder="Doe" />
                </label>
              </div>
              <label class="field">
                <span>Work email *</span>
                <input v-model="form.email" type="email" placeholder="jane@company.com" required />
              </label>
              <label class="field">
                <span>Company</span>
                <input v-model="form.company" type="text" placeholder="Company name" />
              </label>
              <label class="field">
                <span>Message</span>
                <textarea v-model="form.message" rows="3" placeholder="What can we help with?" />
              </label>

              <p v-if="status === 'error'" class="lead-error">{{ errorMessage }}</p>

              <button type="submit" class="btn-primary" :disabled="status === 'sending'">
                {{ status === 'sending' ? 'Sending…' : 'Send request' }}
                <span class="arrow">→</span>
              </button>
            </form>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lead-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(20, 18, 16, 0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.lead-modal {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 40px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  box-shadow: 0 40px 100px -30px rgba(0, 0, 0, 0.5);
}
.lead-close {
  position: absolute;
  top: 18px;
  right: 20px;
  font-size: 28px;
  line-height: 1;
  color: var(--ink-muted);
  transition: color 0.2s;
}
.lead-close:hover { color: var(--ink); }
.lead-modal .tag {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-muted);
  margin-bottom: 12px;
}
.lead-modal h3 {
  font-family: var(--serif);
  font-size: 30px;
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 8px;
}
.lead-sub {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.55;
  margin-bottom: 24px;
}
.lead-form { display: flex; flex-direction: column; gap: 16px; width: 100%; }
.lead-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0; /* allow grid children to shrink instead of overflowing */
}
.field span {
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-muted);
  font-weight: 500;
}
.field input,
.field textarea {
  font-family: var(--sans);
  font-size: 15px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg);
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}
.field input:focus,
.field textarea:focus { border-color: var(--accent); }
.field textarea { resize: vertical; }
.lead-form .btn-primary { justify-content: center; margin-top: 4px; }
.lead-error { color: #b54234; font-size: 14px; margin: 0; }

.lead-success { text-align: center; padding: 24px 8px; }
.lead-success-icon {
  display: inline-flex;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 18px;
}
.lead-success h3 {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 8px;
}
.lead-success p {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin-bottom: 24px;
}

/* Transition */
.lead-fade-enter-active,
.lead-fade-leave-active { transition: opacity 0.25s ease; }
.lead-fade-enter-from,
.lead-fade-leave-to { opacity: 0; }
.lead-fade-enter-active .lead-modal { transition: transform 0.25s ease; }
.lead-fade-enter-from .lead-modal { transform: translateY(16px); }

@media (max-width: 540px) {
  .lead-modal { padding: 32px 24px; }
  .lead-row { grid-template-columns: 1fr; gap: 16px; }
}
</style>
