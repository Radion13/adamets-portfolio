<script setup lang="ts">
const props = defineProps<{ notification: { text: string; id: number } | null }>()
const emit = defineEmits<{ dismiss: [] }>()

watch(() => props.notification, (notification, _, onCleanup) => {
  if (!notification) return
  const timeout = setTimeout(() => emit('dismiss'), 3600)
  onCleanup(() => clearTimeout(timeout))
})
</script>

<template>
  <div class="toast-region" role="status" aria-live="polite" aria-atomic="true">
    <Transition name="toast">
      <div v-if="notification" :key="notification.id" class="feedback-toast">
        <span>{{ notification.text }}</span>
        <button type="button" aria-label="Закрыть уведомление" @click="emit('dismiss')">×</button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.toast-region { position: fixed; bottom: max(24px, env(safe-area-inset-bottom)); left: 50%; transform: translateX(-50%); z-index: 20; width: max-content; max-width: calc(100% - 32px); pointer-events: none; }
.feedback-toast { display: flex; align-items: center; gap: 20px; padding: 8px 10px 8px 22px; border: 1px solid rgb(52 63 83 / 8%); border-radius: 24px; box-shadow: 0 8px 40px rgb(52 63 83 / 10%); background: rgb(255 255 255 / 95%); backdrop-filter: blur(12px); font: 15px/1.4 var(--font-ui); pointer-events: auto; }
.feedback-toast button { display: grid; place-items: center; flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; font-size: 24px; }
.feedback-toast button:hover { background: var(--surface); }
.toast-enter-active, .toast-leave-active { transition: opacity 220ms ease, transform 220ms var(--ease-out); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }
</style>
