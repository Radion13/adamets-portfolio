<script setup lang="ts">
import type { PortfolioCompany } from '~/data/portfolio'

defineProps<{ company: PortfolioCompany }>()
</script>

<template>
  <article class="company-case-study" :aria-label="`Кейсы ${company.name}`">
    <aside class="case-description">
      <a class="bank-link" :href="company.href" target="_blank" rel="noopener noreferrer">
        <img :src="company.logo" width="65" height="62" alt="" loading="lazy" />
        <h3>{{ company.name }}</h3>
      </a>
      <div class="bank-description">
        <p v-for="paragraph in company.description" :key="paragraph">{{ paragraph }}</p>
      </div>
      <div class="role">
        <h4>Моя роль</h4>
        <p>{{ company.role }}</p>
      </div>
    </aside>
    <div class="company-cards"><slot /></div>
  </article>
</template>

<style scoped>
.company-case-study { display: grid; grid-template-columns: minmax(0, 461fr) minmax(0, 939fr); gap: 16px; margin-block-start: 7px; color: var(--text-body); font-family: var(--font-body); }
.company-case-study + .company-case-study { margin-block-start: 104px; }
/* The article is the sticky boundary, so each company's description exits with its own cards. */
.case-description { position: sticky; top: 112px; align-self: start; padding: 56px 32px 0 0; }
.company-cards { min-width: 0; }
.bank-link { display: flex; align-items: center; gap: 12px; width: fit-content; }
.bank-link img { flex-shrink: 0; }
.bank-link h3 { font-size: clamp(32px, 2.646vw, 40px); line-height: 1.2; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }
.bank-link:hover { color: var(--accent); }
.bank-description { display: grid; gap: 24px; margin-block-start: 18px; }
.case-description p { font-size: 24px; line-height: 1.21; font-weight: 500; }
.role { margin-block-start: 40px; }
.role h4 { margin-block-end: 24px; font-size: 32px; line-height: 1.2; }
@media (max-width: 1100px) {
  .case-description { padding-inline-end: 12px; }
  .bank-link { gap: 8px; }
  .bank-link img { width: 45px; height: auto; }
  .bank-link h3 { font-size: 30px; }
  .case-description p { font-size: 22px; }
}
@media (max-width: 850px), (max-height: 650px) {
  .case-description { position: static; }
}
@media (max-width: 850px) {
  .company-case-study { grid-template-columns: 1fr; margin-block-start: 30px; gap: 28px; }
  .case-description { display: grid; grid-template-columns: 1fr 1fr; gap: 18px 40px; padding: 0; }
  .bank-link { grid-column: 1 / -1; }
  .bank-link img { width: 52px; }
  .bank-description { margin: 0; gap: 18px; }
  .role { margin: 0; }
  .role h4 { margin-block-end: 16px; font-size: 28px; }
}
@media (max-width: 550px) {
  .case-description { grid-template-columns: 1fr; gap: 24px; }
  .bank-link h3 { font-size: 36px; }
  .case-description p { font-size: 23px; }
}
</style>
