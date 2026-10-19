<script setup lang="ts">
defineProps<{
  href: string
  item: string
  active?: boolean
  onColor?: boolean
}>()

const strokes = [
  { name: 'sweep', path: 'M3 18C33 12 73 8 117 11' },
  { name: 'wave', path: 'M3 19C10 7 17 9 23 17S36 24 43 14S56 8 63 17S76 23 83 13S96 9 103 17S112 21 117 16' },
  { name: 'loop', path: 'M3 18C25 6 48 4 65 12C83 20 76 27 61 23C46 19 62 8 82 9C96 8 106 10 117 13' },
  { name: 'scribble', path: 'M4 23C18 24 31 24 41 21C48 19 22 10 18 6C14 2 76 5 117 13' },
  { name: 'double', path: 'M3 11C34 6 79 9 117 6C92 13 44 17 12 22C44 19 84 18 115 22' },
] as const

const variant = shallowRef(0)
const pointerInside = shallowRef(false)
const keyboardFocus = shallowRef(false)
const visible = computed(() => pointerInside.value || keyboardFocus.value)
const stroke = computed(() => strokes[variant.value]!)
let hasEntered = false

function chooseStroke() {
  if (visible.value) return
  variant.value = hasEntered ? (variant.value + 1) % strokes.length : Math.floor(Math.random() * strokes.length)
  hasEntered = true
}

function onPointerEnter(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  chooseStroke()
  pointerInside.value = true
}

function onFocus(event: FocusEvent) {
  if (!(event.currentTarget as HTMLElement).matches(':focus-visible')) return
  chooseStroke()
  keyboardFocus.value = true
}
</script>

<template>
  <a
    :href="href"
    class="nav-menu-link"
    :class="{ 'is-active': active, 'is-on-color': onColor }"
    :data-nav-item="item"
    :aria-current="active ? 'location' : undefined"
    @pointerenter="onPointerEnter"
    @pointerleave="pointerInside = false"
    @pointercancel="pointerInside = false"
    @focus="onFocus"
    @blur="keyboardFocus = false"
  >
    <slot />
    <NavActiveOutline :active="Boolean(active)" />
    <svg
      :key="variant"
      class="nav-hover-line"
      :class="{ 'is-visible': visible }"
      :data-variant="stroke.name"
      viewBox="0 0 120 30"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path :d="stroke.path" pathLength="1" />
    </svg>
  </a>
</template>

<style scoped>
.nav-menu-link { position: relative; display: grid; place-items: center; min-block-size: 40px; padding: 10px 16px; border-radius: 40px; white-space: nowrap; color: var(--text-secondary); transition: color var(--transition); }
.nav-menu-link:hover, .nav-menu-link:focus-visible { color: var(--text-primary); }
.nav-menu-link.is-active { color: var(--accent); }
.nav-menu-link.is-on-color { --nav-outline-color: #fff; color: #fff; outline-color: currentColor; }
.nav-hover-line { position: absolute; inset-inline: 14px; bottom: 1px; width: calc(100% - 28px); height: 8px; overflow: visible; pointer-events: none; opacity: 0; transition: opacity 120ms ease-out; }
.nav-hover-line path { fill: none; stroke: var(--nav-outline-color, var(--accent)); stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke 180ms ease-out; }
.nav-hover-line.is-visible { opacity: 1; }
.nav-hover-line.is-visible path { animation: draw-underline 380ms cubic-bezier(0.45, 0, 0.2, 1) both; }
@keyframes draw-underline { to { stroke-dashoffset: 0; } }
@media (prefers-reduced-motion: reduce) {
  .nav-hover-line.is-visible path { animation: none; stroke-dashoffset: 0; }
}
@media (max-width: 600px) {
  .nav-menu-link { padding: 12px 10px; min-block-size: 44px; }
  .nav-hover-line { inset-inline: 9px; width: calc(100% - 18px); }
}
@media (max-width: 360px) {
  .nav-menu-link { padding-inline: 8px; }
}
</style>
