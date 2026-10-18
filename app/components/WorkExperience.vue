<script setup lang="ts">
const employers = [
  { name: 'Kazdream IT Holding', image: '859-6701-imgLogo.svg' },
  { name: 'beyne.ai', image: '859-6701-imgLogo1.svg' },
  { name: 'OC', image: '859-6701-imgLogo2.svg' },
  { name: 'Eurasian Bank', image: '859-6701-imgLogo3.svg' },
  { name: 'Альфа-Банк', image: '859-6701-imgLogo4.svg' },
  { name: 'ASTON', image: '859-6701-imgLogo5.svg' },
]
</script>

<template>
  <section class="experience" aria-label="Места работы">
    <SectionHeading title="Места работы" icon="work" />
    <ul class="employers-grid">
      <li v-for="employer in employers" :key="employer.name">
        <img :src="`/images/${employer.image}`" :alt="employer.name" width="220" height="137" loading="lazy" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.experience { margin-block-start: 92px; }
.employers-grid { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 16px; margin: 60px 8px 0; padding: 0; list-style: none; }
.employers-grid li { transition: transform 400ms var(--ease-out); }
.employers-grid li:hover { transform: translateY(-7px) rotate(-2deg); }
.employers-grid img { display: block; inline-size: 100%; block-size: auto; }
@media (max-width: 1000px) { .employers-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; } }
@media (max-width: 700px) {
  .experience { margin-block-start: 72px; }
  .employers-grid { margin: 32px 0 0; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
}
</style>
