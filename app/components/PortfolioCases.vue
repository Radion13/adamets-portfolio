<script setup lang="ts">
import { eurasianBank, upcomingCases } from '~/data/portfolio'

const emit = defineEmits<{ notify: [message: string] }>()
</script>

<template>
  <section id="cases" class="cases" aria-label="Кейсы">
    <SectionHeading title="Кейсы" icon="cases" />
    <CompanyCaseStudy :company="eurasianBank">
      <div class="case-grid">
        <FeaturedCase />
        <MiniCaseCard v-for="item in upcomingCases" :key="item.title" :title="item.title" :artwork="item.artwork" @notify="emit('notify', $event)" />
      </div>
    </CompanyCaseStudy>
  </section>
</template>

<style scoped>
.cases { margin-block-start: 168px; scroll-margin-block-start: 40px; }
.case-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px 16px; padding-block-start: 41px; min-inline-size: 0; }
@media (max-width: 850px) {
  .cases { margin-block-start: 104px; }
  .case-grid { padding: 0; gap: 24px 16px; }
}
@media (max-width: 550px) {
  .cases { margin-block-start: 80px; }
  .case-grid { grid-template-columns: 1fr; gap: 24px; }
}
</style>
