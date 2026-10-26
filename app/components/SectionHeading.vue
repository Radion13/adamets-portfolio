<script setup lang="ts">
defineProps<{ title: string; icon: 'work' | 'cases' | 'about'; titleId?: string }>()
</script>

<template>
  <div class="section-heading" :class="`section-heading--${icon}`">
    <img v-if="icon === 'work'" src="/images/859-6959-imgIcon.svg" width="60" height="60" alt="" />
    <img v-else-if="icon === 'about'" src="/images/about-question.svg" width="72" height="72" alt="" loading="lazy" />
    <img v-else src="/images/859-6974-imgIcon.svg" width="56" height="47" alt="" />
    <h2 :id="titleId">{{ title }}</h2>
  </div>
</template>

<style scoped>
.section-heading { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px; }
.section-heading img { flex-shrink: 0; }
.section-heading--work img { transform: rotate(90deg); }
.section-heading--about { gap: 20px; padding: 0; }
.section-heading--about h2 { padding: 8px; }
h2 { font: 700 54px/1.26 var(--font-hand); text-align: center; }
@media (max-width: 700px) {
  h2 { font-size: 44px; }
  .section-heading--work img { inline-size: 50px; block-size: 50px; }
}
</style>
