<script setup lang="ts">
defineProps<{ title: string; icon: 'work' | 'cases' }>()
</script>

<template>
  <div class="section-heading" :class="`section-heading--${icon}`">
    <img v-if="icon === 'work'" src="/images/859-6959-imgIcon.svg" width="60" height="60" alt="" />
    <img v-else src="/images/859-6974-imgIcon.svg" width="56" height="47" alt="" />
    <h2>{{ title }}</h2>
  </div>
</template>

<style scoped>
.section-heading { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 8px; }
.section-heading img { flex-shrink: 0; }
.section-heading--work img { transform: translateX(60px) rotate(90deg); }
h2 { font: 700 54px/1.26 var(--font-hand); }
@media (max-width: 700px) {
  h2 { font-size: 44px; }
  .section-heading--work img { inline-size: 50px; block-size: 50px; transform: translateX(48px) rotate(90deg); }
}
</style>
