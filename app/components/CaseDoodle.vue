<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { ArtworkPose, CaseDoodle } from '~/data/caseArtwork'

const props = defineProps<{
  doodle: CaseDoodle
  canvas: readonly [width: number, height: number]
}>()

function center([x, y, width, height, rotation]: ArtworkPose) {
  const angle = rotation * Math.PI / 180
  return [
    x + (Math.abs(width * Math.cos(angle)) + Math.abs(height * Math.sin(angle))) / 2,
    y + (Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle))) / 2,
  ] as const
}

const style = computed<CSSProperties>(() => {
  const rest = center(props.doodle.rest)
  const hover = center(props.doodle.hover)
  return {
    '--doodle-x': `${rest[0] / props.canvas[0] * 100}%`,
    '--doodle-y': `${rest[1] / props.canvas[1] * 100}%`,
    '--doodle-width': `${props.doodle.size[0] / props.canvas[0] * 100}%`,
    '--doodle-travel-x': `${(hover[0] - rest[0]) / props.canvas[0] * 100}%`,
    '--doodle-travel-y': `${(hover[1] - rest[1]) / props.canvas[1] * 100}%`,
    // The original hover SVG already includes its Figma rotation.
    '--doodle-rest-rotation': `${props.doodle.hover[4] - props.doodle.rest[4]}deg`,
    '--doodle-rest-scale': props.doodle.rest[2] / props.doodle.hover[2],
  }
})
</script>

<template>
  <span class="case-doodle" :style="style" :data-doodle="doodle.node" aria-hidden="true">
    <img :src="`/images/cases/${doodle.node}.svg`" :width="doodle.size[0]" :height="doodle.size[1]" alt="" loading="lazy" />
  </span>
</template>

<style scoped>
.case-doodle { position: absolute; inset: 0; z-index: 1; pointer-events: none; transition: transform var(--card-motion-duration) var(--card-motion-easing); }
.case-doodle img { position: absolute; left: var(--doodle-x); top: var(--doodle-y); width: var(--doodle-width); height: auto; transform: translate(-50%, -50%) rotate(var(--doodle-rest-rotation)) scale(var(--doodle-rest-scale)); transition: transform var(--card-motion-duration) var(--card-motion-easing); }
:global(.case-card:is(:hover, :focus-visible) .case-doodle) { transform: translate(var(--doodle-travel-x), var(--doodle-travel-y)); }
:global(.case-card:is(:hover, :focus-visible) .case-doodle img) { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
</style>
