<script setup lang="ts">
import { caseArtwork } from '~/data/caseArtwork'

const props = defineProps<{ title: string, artwork: Exclude<keyof typeof caseArtwork, 'featured'> }>()
const emit = defineEmits<{ notify: [message: string] }>()
const artwork = computed(() => caseArtwork[props.artwork])
</script>

<template>
  <button class="case-card mini-card" type="button" :aria-label="`${title} — кейс скоро появится`" @click="emit('notify', `«${title}» — кейс скоро появится.`)">
    <span class="mini-card-surface">
      <span class="mini-card-heading">{{ title }}</span>
      <img class="coming-soon" src="/images/859-7027-imgFrame2147237444.svg" width="92" height="36" alt="Скоро" loading="lazy" />
      <CaseDoodle v-for="doodle in artwork.doodles" :key="doodle.node" :doodle="doodle" :canvas="artwork.size" />
      <img class="mini-phone" src="/images/phone-documents.png" width="594" height="785" alt="Интерфейс раздела «Все документы» в приложении банка" loading="lazy" />
    </span>
  </button>
</template>

<style scoped>
.mini-card { --card-motion-duration: 800ms; --card-motion-easing: var(--spring); aspect-ratio: 462 / 522; text-align: center; }
.mini-card-surface { position: absolute; inset: 0; background: #f4f4f5; mask: url('/images/859-7027-imgShape.svg') center / 100% 100% no-repeat; }
.mini-card-surface::before { content: ''; position: absolute; inset: 0; background: url('/images/cases/mini-card-fill.svg') center / 100% 100% no-repeat; opacity: 0; transition: opacity var(--card-motion-duration) var(--card-motion-easing); }
.mini-card:is(:hover, :focus-visible) .mini-card-surface::before { opacity: 1; }
.mini-card:is(:hover, :focus-visible) .mini-card-heading { color: white; }
.mini-card:is(:hover, :focus-visible) .coming-soon { filter: brightness(0) invert(1); }
.mini-card-heading { position: absolute; z-index: 3; top: 7.66%; inset-inline: 12px; font-size: 6.926cqw; font-weight: 700; line-height: 1.19; transition: color var(--card-motion-duration) var(--card-motion-easing); }
.coming-soon { position: absolute; z-index: 3; top: 16.47%; left: 40.04%; width: 20.016%; height: auto; transition: filter var(--card-motion-duration) var(--card-motion-easing); }
.mini-phone { position: absolute; z-index: 2; top: 24.88%; left: 17.78%; width: 64.3%; height: auto; pointer-events: none; }
@media (max-width: 550px) {
  .mini-card-heading { font-size: 8cqw; }
}
</style>
