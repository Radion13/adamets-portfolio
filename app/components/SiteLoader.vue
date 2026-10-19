<script setup lang="ts">
const emit = defineEmits<{ start: [], finish: [] }>()
const visible = shallowRef(true)
const revealing = shallowRef(false)
const loader = useTemplateRef<HTMLElement>('loader')
const timers = new Set<number>()
let restoreScroll = () => {}

useHead({
  noscript: [{ innerHTML: '<style>.site-loader{display:none!important}</style>' }],
})

function wait(duration: number) {
  return new Promise<void>((resolve) => {
    const timer = window.setTimeout(() => {
      timers.delete(timer)
      resolve()
    }, duration)
    timers.add(timer)
  })
}

function finish() {
  if (!visible.value) return
  visible.value = false
  for (const timer of timers) window.clearTimeout(timer)
  timers.clear()
  restoreScroll()
  emit('finish')
}

onMounted(async () => {
  // Skip motion preferences and a late hydration after the CSS safety timeout.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || (loader.value && getComputedStyle(loader.value).visibility === 'hidden')) {
    finish()
    return
  }

  const safetyTimer = window.setTimeout(finish, 4500)
  timers.add(safetyTimer)
  const previousOverflow = document.documentElement.style.overflow
  restoreScroll = () => { document.documentElement.style.overflow = previousOverflow }
  document.documentElement.style.overflow = 'hidden'
  emit('start')

  const illustration = document.querySelector<HTMLImageElement>('.hero-art img')
  const resources = Promise.allSettled([
    document.fonts.ready,
    illustration?.decode() ?? Promise.resolve(),
  ])
  // Wait only for the opening screen, with a bounded fallback on slow connections.
  await Promise.all([Promise.race([resources, wait(1800)]), wait(180)])
  if (!visible.value) return
  // The initial fragment scroll can be interrupted by the loading scroll lock.
  // Position it after fonts settle, while the red screen still covers the page.
  if (window.location.hash) {
    try {
      document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant', block: 'start' })
    } catch {
      // Ignore malformed fragments and leave the browser's current position intact.
    }
  }
  revealing.value = true
})

onBeforeUnmount(finish)
</script>

<template>
  <div v-if="visible" ref="loader" class="site-loader" :class="{ 'site-loader--revealing': revealing }" role="status" aria-live="polite">
    <span class="loader-announcement">Загрузка портфолио</span>
    <svg class="loader-spiral" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path class="loader-stroke" pathLength="1" d="M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001" @animationend="finish" />
    </svg>
  </div>
</template>

<style scoped>
.site-loader { position: fixed; z-index: 1000; top: 0; left: 0; width: 100vw; height: 100dvh; overflow: hidden; background: var(--accent); cursor: progress; animation: loader-safety 0s 6s forwards; }
.site-loader--revealing { background: transparent; }
.loader-spiral { position: absolute; top: -15%; left: -15%; width: 130%; height: 130%; overflow: visible; }
.loader-stroke { fill: none; stroke: var(--accent); stroke-linecap: round; stroke-linejoin: round; stroke-width: 350; stroke-dasharray: 1 1; stroke-dashoffset: 0; }
.site-loader--revealing .loader-stroke { animation: loader-unwind 1100ms cubic-bezier(0.65, 0, 0.35, 1) forwards; }
.loader-announcement { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@keyframes loader-unwind {
  from { stroke-width: 350; stroke-dashoffset: 0; }
  to { stroke-width: 50; stroke-dashoffset: -1; }
}
@keyframes loader-safety {
  to { visibility: hidden; pointer-events: none; }
}
@media (prefers-reduced-motion: reduce) {
  .site-loader { display: none; }
}
</style>
