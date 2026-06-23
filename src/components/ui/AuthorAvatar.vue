<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  name?: string | null
  size?: 'sm' | 'md' | 'lg'
  /** Explicit image override; if omitted we resolve a known author photo by name. */
  image?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  name: 'JF',
  size: 'md',
  image: null,
})

// Known author/team photos → matched by (case-insensitive) name.
const AUTHOR_PHOTOS: Record<string, string> = {
  'vibhu agarwal': '/speakers/Vibhu.webp',
  gaurav: '/speakers/Gaurav.jpg',
  'maarten koekebakker': '/leadership/Maarten.webp',
  'pawel michalkiewicz': '/leadership/pawel2.webp',
}

// If loading the photo fails at runtime, fall back to initials.
const imgFailed = ref(false)

const photo = computed(() => {
  if (props.image) return props.image
  const key = (props.name ?? '').trim().toLowerCase()
  return AUTHOR_PHOTOS[key] ?? null
})

const showPhoto = computed(() => !!photo.value && !imgFailed.value)

const initials = computed(() => {
  const n = (props.name ?? 'JF').trim()
  if (!n) return 'JF'
  return n
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('')
})

// Deterministic warm-tone background per author so avatars look distinct.
const bgIndex = computed(() => {
  const n = (props.name ?? '').toLowerCase()
  let h = 0
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) >>> 0
  return h % 4
})
</script>

<template>
  <img
    v-if="showPhoto"
    :src="photo as string"
    :alt="name ?? 'Author'"
    class="avatar-photo"
    :class="`size-${size}`"
    loading="lazy"
    @error="imgFailed = true"
  />
  <span v-else class="avatar-circle" :class="[`size-${size}`, `tone-${bgIndex}`]">
    {{ initials }}
  </span>
</template>

<style scoped>
.avatar-circle,
.avatar-photo {
  flex-shrink: 0;
  border-radius: 50%;
}
.avatar-photo {
  object-fit: cover;
  display: block;
  background: var(--accent-soft);
}
.avatar-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: var(--serif);
  font-style: italic;
  font-weight: 500;
  letter-spacing: 0.01em;
  user-select: none;
}
.size-sm { width: 32px; height: 32px; font-size: 13px; }
.size-md { width: 48px; height: 48px; font-size: 17px; }
.size-lg { width: 64px; height: 64px; font-size: 22px; }

.tone-0 { background: linear-gradient(135deg, #143369 0%, #c8ab72 100%); }
.tone-1 { background: linear-gradient(135deg, #b07c5a 0%, #d4a373 100%); }
.tone-2 { background: linear-gradient(135deg, #5a6a7c 0%, #7c8c9c 100%); }
.tone-3 { background: linear-gradient(135deg, #4a574a 0%, #6c7d6c 100%); }
</style>
